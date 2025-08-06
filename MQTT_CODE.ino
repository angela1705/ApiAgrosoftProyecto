//Codigo arduino para protocolo MQTT


#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <WiFiManager.h>
#include <DHT.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Wire.h>

// Configuración de sensores
#define USE_DHT22 true
#define USE_SOIL_MOISTURE true
#define USE_MQ135 true
#define USE_LDR true

// Configuración de la pantalla OLED
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define OLED_ADDRESS 0x3C // Prueba 0x3D si no funciona
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
bool oledActive = false;

// Sensor DHT22
#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// Sensor de humedad de suelo
#define SOIL_MOISTURE_ANALOG A2

// Sensor MQ-135
#define MQ135_ANALOG A1

// Sensor LDR
#define LDR_ANALOG A0

// Botón WiFi
#define WIFI_BUTTON_PIN 4 // GPIO 4 (D4)

// Pin para el relé
#define RELAY_PIN 5 // GPIO 5 (D5)

// Configuración MQTT
const char* mqtt_server = "92ae5e18dc884fefa81c4f3580a7485b.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;
const char* mqtt_user = "agrosoft";
const char* mqtt_password = "Agrosoft2025!";
const char* mqtt_topic_temp = "sensor/dht22/temperature";
const char* mqtt_topic_hum = "sensor/dht22/humidity";
const char* mqtt_topic_soil = "sensor/soil/moisture";
const char* mqtt_topic_air = "sensor/mq135/air_quality";
const char* mqtt_topic_light = "sensor/ldr/light";
const char* mqtt_topic_control = "sensor/control/command";
const char* deviceCode = "ESP32_001";

WiFiClientSecure espClient;
PubSubClient client(espClient);
WiFiManager wifiManager;
bool sensorActive = true;
bool wifiActive = true;
unsigned long previousMillis = 0;
const long interval = 10000; // Intervalo de 10 segundos
unsigned long lastButtonCheck = 0;
const long debounceDelay = 200; // Retardo anti-rebote en ms

void callback(char* topic, byte* payload, unsigned int length) {
  String message;
  for (unsigned int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.printf("Mensaje recibido en [%s]: %s\n", topic, message.c_str());

  if (String(topic) == mqtt_topic_control) {
    if (message == "STOP_SENSOR") {
      sensorActive = false;
      Serial.println("Sensor detenido");
      if (oledActive) {
        display.clearDisplay();
        display.setCursor(0, 0);
        display.println("Sensor detenido");
        display.display();
      }
    } else if (message == "START_SENSOR") {
      sensorActive = true;
      Serial.println("Sensor iniciado");
    } else if (message == "RESTART_WIFI") {
      Serial.println("Reiniciando WiFi...");
      wifiManager.resetSettings();
      ESP.restart();
    }
  }
}

void connectToMQTT() {
  if (wifiActive) {
    int retryCount = 0;
    const int maxRetries = 5;
    while (!client.connected() && retryCount < maxRetries) {
      Serial.println("Conectando a MQTT...");
      String clientId = "ESP32Client-" + String(random(0xffff), HEX);
      if (client.connect(clientId.c_str(), mqtt_user, mqtt_password)) {
        Serial.println("Conectado a MQTT");
        client.subscribe(mqtt_topic_control);
      } else {
        Serial.print("Error al conectar MQTT: ");
        Serial.println(client.state());
        delay(3000);
        retryCount++;
      }
    }
    if (!client.connected()) {
      Serial.println("No se pudo conectar a MQTT. Continuando...");
    }
  }
}

bool initializeOLED() {
  Wire.begin();
  if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDRESS)) {
    Serial.println("Error al iniciar OLED");
    return false;
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Iniciando...");
  display.display();
  delay(2000);
  return true;
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  // Configurar botón WiFi
  pinMode(WIFI_BUTTON_PIN, INPUT_PULLUP);

  // Configurar pin del relé
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Relé apagado por defecto

  // Inicializar sensores
  if (USE_DHT22) {
    dht.begin();
    pinMode(DHTPIN, INPUT);
  }
  if (USE_SOIL_MOISTURE) {
    pinMode(SOIL_MOISTURE_ANALOG, INPUT);
  }
  if (USE_MQ135) {
    pinMode(MQ135_ANALOG, INPUT);
  }
  if (USE_LDR) {
    pinMode(LDR_ANALOG, INPUT);
  }

  // Inicializar pantalla OLED
  oledActive = initializeOLED();
  if (!oledActive) {
    Serial.println("OLED no disponible. Continuando sin pantalla...");
  }

  // Configuración WiFi con WiFiManager
  espClient.setInsecure();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  wifiManager.setTimeout(180);
  if (!wifiManager.autoConnect("ESP32-ConfigAP", "Sena_2025")) {
    Serial.println("No se pudo conectar a WiFi. Reiniciando...");
    delay(3000);
    ESP.restart();
  }

  Serial.println("WiFi conectado. IP: " + WiFi.localIP().toString());
  if (oledActive) {
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("WiFi Conectado");
    display.println(WiFi.localIP().toString());
    display.display();
    delay(2000);
  }

  connectToMQTT();
}

void loop() {
  // Control del botón WiFi
  unsigned long currentMillis = millis();
  if (currentMillis - lastButtonCheck >= debounceDelay) {
    if (digitalRead(WIFI_BUTTON_PIN) == LOW) {
      Serial.println("Reiniciando configuración WiFi...");
      wifiManager.resetSettings();
      ESP.restart();
      lastButtonCheck = currentMillis;
    }
  }

  if (wifiActive && !client.connected()) {
    connectToMQTT();
  }
  client.loop();

  if (sensorActive && wifiActive) {
    if (currentMillis - previousMillis >= interval) {
      previousMillis = currentMillis;
      bool validData = false;
      float temperature = 0.0, humidity = 0.0, soilMoisturePercent = 0.0, airQualityPPM = 0.0, lightLux = 0.0;

      // Leer DHT22
      if (USE_DHT22) {
        temperature = dht.readTemperature();
        humidity = dht.readHumidity();
        if (!isnan(temperature) && !isnan(humidity)) {
          char tempStr[16], humStr[16], tempPayload[32], humPayload[32];
          dtostrf(temperature, 6, 2, tempStr);
          dtostrf(humidity, 6, 2, humStr);
          snprintf(tempPayload, sizeof(tempPayload), "%s:%s", deviceCode, tempStr);
          snprintf(humPayload, sizeof(humPayload), "%s:%s", deviceCode, humStr);
          client.publish(mqtt_topic_temp, tempPayload);
          client.publish(mqtt_topic_hum, humPayload);
          Serial.printf("Temp: %s °C  Hum: %s %%\n", tempStr, humStr);
          validData = true;
        } else {
          Serial.println("Error al leer DHT22");
        }
      }

      // Leer sensor de humedad de suelo
      if (USE_SOIL_MOISTURE) {
        int soilMoistureValue = analogRead(SOIL_MOISTURE_ANALOG);
        soilMoisturePercent = map(soilMoistureValue, 4095, 0, 0, 100); // Inverso: seco=0%, húmedo=100%
        if (soilMoisturePercent >= 0 && soilMoisturePercent <= 100) {
          char soilStr[16], soilPayload[32];
          dtostrf(soilMoisturePercent, 6, 2, soilStr);
          snprintf(soilPayload, sizeof(soilPayload), "%s:%s", deviceCode, soilStr);
          client.publish(mqtt_topic_soil, soilPayload);
          Serial.printf("Humedad del suelo: %s%%\n", soilStr);
          validData = true;

          // Lógica del relé (adaptada del código de tu amigo)
          static bool pumpState = false;
          if (soilMoisturePercent < 30 && !pumpState) {
            digitalWrite(RELAY_PIN, LOW); // Activar relé (lógica inversa)
            pumpState = true;
            Serial.println("💧 Humedad del suelo < 30% (" + String(soilMoisturePercent) + "%), bomba ACTIVADA");
          } else if (soilMoisturePercent > 60 && pumpState) {
            digitalWrite(RELAY_PIN, HIGH); // Desactivar relé (lógicaW% (" + String(soilMoisturePercent) + "%), bomba DESACTIVADA");
          }
        } else {
          Serial.println("Error al leer el sensor de humedad de suelo");
        }
      }

      // Leer sensor MQ-135
      if (USE_MQ135) {
        int airQuality = analogRead(MQ135_ANALOG);
        airQualityPPM = map(airQuality, 0, 4095, 10, 1000);
        if (airQualityPPM >= 10 && airQualityPPM <= 1000) {
          char airStr[16], airPayload[32];
          dtostrf(airQualityPPM, 6, 2, airStr);
          snprintf(airPayload, sizeof(airPayload), "%s:%s", deviceCode, airStr);
          client.publish(mqtt_topic_air, airPayload);
          Serial.printf("Calidad del aire: %s PPM\n", airStr);
          validData = true;
        }
      }

      // Leer sensor LDR
      if (USE_LDR) {
        int ldrValue = analogRead(LDR_ANALOG);
        lightLux = map(ldrValue, 0, 4095, 0, 1000);
        if (lightLux >= 0 && lightLux <= 1000) {
          char lightStr[16], lightPayload[32];
          dtostrf(lightLux, 6, 2, lightStr);
          snprintf(lightPayload, sizeof(lightPayload), "%s:%s", deviceCode, lightStr);
          client.publish(mqtt_topic_light, lightPayload);
          Serial.printf("Luminosidad: %s lux\n", lightStr);
          validData = true;
        }
      }

      // Mostrar en pantalla OLED
      if (validData && oledActive) {
        display.clearDisplay();
        display.setCursor(0, 0);
        int line = 0;
        if (USE_DHT22 && !isnan(temperature)) {
          display.printf("Temp: %.1fC", temperature);
          line += 10;
          display.setCursor(0, line);
          display.printf("Hum: %.1f%%", humidity);
          line += 10;
        }
        if (USE_SOIL_MOISTURE && soilMoisturePercent >= 0) {
          display.setCursor(0, line);
          display.printf("Suelo: %.1f%%", soilMoisturePercent);
          line += 10;
        }
        if (USE_MQ135 && airQualityPPM >= 10) {
          display.setCursor(0, line);
          display.printf("Aire: %.0fPPM", airQualityPPM);
          line += 10;
        }
        if (USE_LDR && lightLux >= 0) {
          display.setCursor(0, line);
          display.printf("Luz: %.0flux", lightLux);
          line += 10;
        }
        display.display();
      }
    }
  }
}