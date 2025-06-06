---
title: "Configuración de Sensores"
slug: modules/IoT/configuracion
description: "Guía para configurar sensores IoT y conectar dispositivos a Agrosoft."
---

# **Configuración de Sensores IoT**

Configura dispositivos IoT (como ESP32 con sensores DHT22) para enviar datos meteorológicos a **Agrosoft** mediante WebSocket y HTTP. Los sensores se registran a través de la API y se programan en Arduino IDE para integrarse con el sistema.

---

## **Estructura de Datos (JSON esperado por el servidor)**

| Campo               | Tipo   | Descripción                              | Obligatorio |
|---------------------|--------|------------------------------------------|-------------|
| **device_code**     | String | Código único del sensor (ej. "DHT22_001")| Sí          |
| **temperatura**     | Float  | Valor en °C                              | No          |
| **humedad_ambiente**| Float  | Valor en %                               | No          |
| **luminosidad**     | Float  | Valor en lux                             | No          |
| **lluvia**          | Float  | Valor en mm                              | No          |
| **velocidad_viento**| Float  | Valor en m/s                             | No          |
| **direccion_viento**| Float  | Valor en grados (0-360)                  | No          |
| **humedad_suelo**   | Float  | Valor en %                               | No          |
| **ph_suelo**        | Float  | Valor en escala pH                       | No          |
| **fecha_medicion**  | String | Fecha y hora (formato ISO 8601)          | No          |

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/sensores/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/sensores/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type**  | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Registra un nuevo sensor en el sistema.

**Request:**
```json
{
  "nombre": "Sensor DHT22 Patio",
  "tipo_sensor_id": 1,
  "descripcion": "Sensor de temperatura y humedad",
  "bancal_id": 1,
  "medida_minima": 0.0,
  "medida_maxima": 50.0,
  "estado": "activo",
  "device_code": "DHT22_001"
}
```

**Response (201 Created)**:Success

```json
{
  "id": 1,
  "nombre": "Sensor DHT22 Patio",
  "tipo_sensor_id": 1,
  "descripcion": "Sensor de temperatura y humedad",
  "bancal_id": 1,
  "medida_minima": 0.0,
  "medida_maxima": 50.0,
  "estado": "activo",
  "device_code": "DHT22_001"
}
```

---

**Método:** CODE

URL:

```
ws://127.0.0.1:8000/ws/realtime/
```

`http://127.0.0.1:8000/iot/datosmeteorologicos/`

Resultado: Configura un dispositivo IoT para enviar datos vía WebSocket y HTTP.

**Código Arduino:**

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <WebSocketsClient.h>
#include <DHT.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// Configuración del sensor DHT22
#define DHTPIN 9       // GPIO 9 para DHT22
#define DHTTYPE DHT22  // Tipo de sensor
DHT dht(DHTPIN, DHTTYPE);

// Configuración de red y servidor
const char* ssid = "TU_RED_WIFI";
const char* password = "TU_CONTRASEÑA";
const char* websocket_server = "192.168.1.12";
const int websocket_port = 8000;
const char* websocket_path = "/ws/realtime/";
const char* http_endpoint = "http://192.168.1.12:8000/iot/datosmeteorologicos/";

// Código de dispositivo
const char* deviceCode = "DHT22_001";
const long wsInterval = 2000;      // WebSocket cada 2 segundos
const long httpInterval = 120000;  // HTTP cada 2 minutos

// Temporización
unsigned long previousWsMillis = 0;
unsigned long previousHttpMillis = 0;
unsigned long lastConnectionAttempt = 0;
const long reconnectInterval = 5000;

// NTP para hora
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", -18000, 60000); // UTC-5 (Colombia)

WebSocketsClient webSocket;

void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.printf("[WebSocket] Desconectado, código: %d\n", length > 0 ? payload[0] : -1);
      break;
    case WStype_CONNECTED:
      Serial.println("[WebSocket] Conectado a ws/realtime/");
      break;
    case WStype_TEXT:
      Serial.printf("[WebSocket] Respuesta: %s\n", payload);
      break;
    case WStype_ERROR:
      Serial.printf("[WebSocket] Error: %s\n", payload);
      break;
    case WStype_PING:
      Serial.println("[WebSocket] Ping recibido");
      break;
    case WStype_PONG:
      Serial.println("[WebSocket] Pong enviado");
      break;
  }
}

String getCurrentTime() {
  timeClient.update();
  time_t epochTime = timeClient.getEpochTime();
  struct tm *ptm = gmtime((time_t *)&epochTime);
  char buffer[30];
  sprintf(buffer, "%04d-%02d-%02dT%02d:%02d:%02d-05:00",
          ptm->tm_year + 1900, ptm->tm_mon + 1, ptm->tm_mday,
          ptm->tm_hour, ptm->tm_min, ptm->tm_sec);
  return String(buffer);
}

void sendToWebSocket(float temperature, float humidity) {
  if (!webSocket.isConnected()) {
    unsigned long currentMillis = millis();
    if (currentMillis - lastConnectionAttempt >= reconnectInterval) {
      Serial.println("[WebSocket] No conectado, intentando reconectar...");
      webSocket.begin(websocket_server, websocket_port, websocket_path);
      lastConnectionAttempt = currentMillis;
    }
    return;
  }
  String json = "{\"device_code\": \"" + String(deviceCode) +
                "\", \"temperatura\": " + String(temperature, 2) +
                ", \"humedad_ambiente\": " + String(humidity, 2) +
                ", \"fecha_medicion\": \"" + getCurrentTime() + "\"}";
  webSocket.sendTXT(json);
  Serial.println("Enviado por WebSocket: " + json);
}

void sendToServer(float temperature, float humidity) {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, http_endpoint);
    http.addHeader("Content-Type", "application/json");

    String json = "{\"device_code\": \"" + String(deviceCode) +
                  "\", \"temperatura\": " + String(temperature, 2) +
                  ", \"humedad_ambiente\": " + String(humidity, 2) +
                  ", \"fecha_medicion\": \"" + getCurrentTime() + "\"}";
    Serial.print("Enviando HTTP: ");
    Serial.println(json);
    int httpCode = http.POST(json);
    if (httpCode > 0) {
      Serial.printf("Código HTTP: %d\n", httpCode);
      String response = http.getString();
      Serial.printf("Respuesta del servidor: %s\n", response.c_str());
    } else {
      Serial.printf("Error en HTTP: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  } else {
    Serial.println("WiFi no conectado, intentando reconectar...");
    WiFi.reconnect();
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();

  WiFi.begin(ssid, password);
  Serial.print("Conectando a WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConectado a WiFi, IP: " + WiFi.localIP().toString());

  timeClient.begin();
  while (!timeClient.update()) {
    timeClient.forceUpdate();
    Serial.println("Sincronizando NTP...");
    delay(1000);
  }
  Serial.println("Hora sincronizada: " + getCurrentTime());

  webSocket.begin(websocket_server, websocket_port, websocket_path);
  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);
}

void loop() {
  webSocket.loop();
  unsigned long currentMillis = millis();

  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Error al leer el DHT22");
    delay(2000);
    return;
  }

  // Enviar por WebSocket cada 2 segundos
  if (currentMillis - previousWsMillis >= wsInterval) {
    previousWsMillis = currentMillis;
    sendToWebSocket(temperature, humidity);
  }

  // Enviar por HTTP cada 2 minutos
  if (currentMillis - previousHttpMillis >= httpInterval) {
    previousHttpMillis = currentMillis;
    sendToServer(temperature, humidity);
  }
}
```

---

## **Ejemplos de Uso**

### **Registrar un sensor y enviar datos:**

```bash
Método: POST 
URL: http://127.0.0.1:8000/iot/sensores/
{
  "nombre": "Sensor DHT22 Patio",
  "tipo_sensor_id": 1,
  "descripcion": "Sensor de temperatura y humedad",
  "bancal_id": 1,
  "medida_minima": 0.0,
  "medida_maxima": 50.0,
  "estado": "activo",
  "device_code": "DHT22_001"
}

Método: WS 
URL: ws://127.0.0.1:8000/ws/realtime/
{
  "device_code": "DHT22_001",
  "temperatura": 25.5,
  "humedad_ambiente": 60.0,
  "fecha_medicion": "2025-06-06T00:00:00-05:00"
}

Método: POST 
URL: http://127.0.0.1:8000/iot/datosmeteorologicos/
{
  "device_code": "DHT22_001",
  "temperatura": 25.5,
  "humedad_ambiente": 60.0,
  "fecha_medicion": "2025-06-06T00:00:00-05:00"
}
```

---

## **Validaciones**

1. **Campos requeridos (API Sensores):**

   ```python
   ["nombre", "tipo_sensor_id", "device_code"]
   ```

2. **Campos requeridos (WebSocket/HTTP):**

   ```python
   ["device_code"]
   ```

3. **Restricciones:**

   - `device_code`: Debe ser único y corresponder a un sensor con `estado='activo'`.
   - `tipo_sensor_id`: Debe existir en la tabla de tipos de sensores.
   - `bancal_id`: Opcional, pero debe existir si se proporciona.
   - `medida_minima` y `medida_maxima`: Decimales válidos (opcionales).
   - `estado`: Valores permitidos: \["activo", "inactivo"\].
   - `fecha_medicion`: Formato ISO 8601 (ej. "2025-06-06T00:00:00-05:00").
   - Campos numéricos (ej. `temperatura`, `humedad_ambiente`): Decimales válidos según el modelo `Datos_metereologicos`.

---

## **Manejo de Errores**

**Error (400 Bad Request - API Sensores):**

```json
{
  "error": "Bad Request",
  "detail": "El device_code 'DHT22_001' ya está registrado."
}
```

**Error (404 Not Found - API Sensores):**

```json
{
  "detail": "Tipo de sensor no encontrado."
}
```

**Error (WebSocket):**

```json
{
  "error": "device_code requerido"
}
```

**Error (HTTP POST):**

```json
{
  "error": "Bad Request",
  "detail": "No existe un sensor con device_code = 'DHT22_001'."
}
```

---

## **Buenas Prácticas**

✔️ **Sincronización NTP:** Asegúrate de que el dispositivo use NTP para enviar `fecha_medicion` precisa.\
✔️ **Frecuencia de envío:** Usa intervalos de 2 segundos para WebSocket y X minutos para HTTP para equilibrar carga y fiabilidad.\
✔️ **Reconexión automática:** Implementa reintentos de conexión WiFi y WebSocket cada 5 segundos.\
✔️ **Validación previa:** Verifica que el `device_code` esté registrado antes de programar el dispositivo.\
✔️ **Depuración:** Habilita logs en el monitor serial para diagnosticar errores de conexión o lectura del sensor.

---

## **Integraciones Comunes**

▸ **Datos Meteorológicos:** Los datos enviados se procesan en `/iot/datosmeteorologicos/` y `/ws/realtime/` para almacenamiento y alertas en tiempo real.\
▸ **Alertas:** El WebSocket genera notificaciones si los valores exceden umbrales (ej. temperatura &gt; 50°C).\
▸ **Trazabilidad:** Los sensores se asocian a bancales para monitoreo agrícola.\
▸ **Visualización:** Los datos se muestran en gráficos en la interfaz de Agrosoft.

--- 