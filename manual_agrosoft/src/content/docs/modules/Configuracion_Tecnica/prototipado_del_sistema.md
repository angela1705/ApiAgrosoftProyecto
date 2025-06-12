---
title: Prototipado del Sistema Agrosoft
slug: modules/Configuracion_Tecnica/prototipado_del_sistema
---

# DOCUMENTO DE PROTOTIPADO DEL SISTEMA

**Agrosoft**  

---

## **Tabla de contenido**

1. [Introducción](#introducción)  
2. [Alcance](#alcance)  
3. [Responsables e involucrados](#responsables-e-involucrados)  
4. [Prototipos](#prototipos)  

---

## **1. Introducción**

En el contexto de la producción agrícola moderna, resulta fundamental contar con sistemas de gestión eficientes que permitan optimizar los procesos y asegurar un control riguroso de las actividades relacionadas con el cultivo. En este sentido, la Corporación de Gestión y Desarrollo Sostenible (C.G.D.S.S.) y sus áreas de influencia requieren de una herramienta tecnológica que facilite el seguimiento integral de las prácticas agrícolas, promoviendo un uso responsable y sostenible de los recursos.

El presente documento tiene como objetivo proponer el desarrollo de un sistema de gestión orientado al monitoreo y control de actividades clave en la producción agrícola, tales como el cuidado de las plantas, la gestión del riego, la aplicación de fertilizantes, el uso de insumos y el seguimiento de cultivos. Este sistema busca no solo simplificar el registro y la administración de estas actividades, sino también proporcionar información actualizada y precisa que respalde la toma de decisiones estratégicas.

Además, se prioriza la facilidad de uso del sistema para garantizar que los usuarios puedan interactuar con la plataforma de forma intuitiva, generando informes detallados que contribuyan a la mejora continua de los procesos agrícolas en la región. A través de esta herramienta, se espera fomentar prácticas agrícolas más eficientes y sostenibles, impulsando así un desarrollo agrícola más productivo y respetuoso con el medio ambiente.

### **1.1 Propósito**

El presente documento tiene como objetivo detallar los requerimientos funcionales necesarios para el desarrollo de un sistema de información destinado a la gestión integral de cultivos en la unidad productiva PAE. Dichos requerimientos buscan asegurar que el sistema propuesto cumpla con las necesidades específicas de la unidad, abordando de manera eficiente aspectos esenciales como el monitoreo de cultivos, la gestión de inventario, la planificación de siembras, el control de plagas y enfermedades, así como la optimización del uso de recursos hídricos y nutrientes.

Asimismo, el sistema deberá proporcionar herramientas intuitivas y accesibles que faciliten una interacción ágil y efectiva por parte de los usuarios, permitiendo un manejo óptimo de la información relevante para la gestión agrícola. La implementación de este sistema no solo está orientada a mejorar la eficiencia operativa, sino también a ofrecer análisis e informes detallados que apoyen la toma de decisiones estratégicas en la unidad productiva PAE.

### **1.2 Alcance**

El nuevo sistema de gestión agrícola para la Corporación de Gestión y Desarrollo Sostenible (C.G.D.S.S.) y sus áreas de influencia está diseñado para optimizar el monitoreo y la administración de las actividades agrícolas. El sistema se estructurará en cuatro módulos principales: Internet de las Cosas (IoT), Actividades, Finanzas e Inventario.

Estos módulos permitirán un control integral de procesos críticos, tales como el riego automatizado, la fertilización precisa, el cuidado de las plantas y la gestión eficiente de insumos. Gracias a esta estructura modular, el sistema no solo mejorará la eficiencia en la gestión de recursos, sino que también proporcionará datos clave para respaldar decisiones estratégicas y fomentar prácticas agrícolas más sostenibles.

### **1.3 Responsables e involucrados**

| **Nombre**               | **Tipo (Responsable/Involucrado)** | **Rol**         |
|--------------------------|-----------------------------------|-----------------|
| Haison Leandro Toro      | Aprendiz                         | Desarrollador   |
| Oscar Mauricio Audor Bernal | Aprendiz                       | Desarrollador   |
| Giovanni Steven Velasco Tunubala | Aprendiz       | Desarrollador   |
| Juan José Manrique Sosa  | Aprendiz                         | Desarrollador   |

---

## **2. Prototipos**

### **2.1 Pantalla de Inicio de Sesión**

#### **Descripción:**  
La pantalla de inicio de sesión permite a los usuarios autenticarse en el sistema **AgroSis** mediante su correo electrónico y contraseña. Su objetivo es garantizar que solo usuarios autorizados puedan acceder a las funcionalidades de la aplicación.

#### **Diseño:**  
![Pantalla de Inicio de Sesión](/public/prototipado_del_sistema/Login.png)  

---

### **2.2 Ventana de Registro de Usuarios**

#### **Descripción:**  
En esta pantalla permitirá que un usuario se registre en el sistema proporcionando sus datos personales y credenciales de acceso.

#### **Diseño:**  
![Ventana de Registro de Usuarios](/public/prototipado_del_sistema/RegistroUsuarios.png)  

---

### **2.3 Ventana de Listado de Usuarios**

#### **Descripción:**  
La interfaz proporcionará una **lista detallada** de todos los usuarios registrados en el sistema, acompañada de un **indicador de estado** que mostrará si cada usuario se encuentra **activo o inactivo**.

Adicionalmente, se incluirá la opción de **editar la información** de un usuario, permitiendo corregir cualquier dato que haya sido ingresado incorrectamente durante el proceso de registro.

Esta funcionalidad asegurará la **precisión y actualización continua** de la información del usuario en el sistema, facilitando la gestión eficiente de la plataforma por parte del administrador.

#### **Diseño:**  
![Ventana de Listado de Usuarios](/public/prototipado_del_sistema/ListaUsuarios.png)  

---

### **2.4 Ventana de Edición de Usuarios**

#### **Descripción:**  
Esta interfaz permitirá que únicamente el administrador tenga la capacidad de editar y eliminar usuarios registrados en el sistema, garantizando así la seguridad y la integridad de la información. Al restringir estas funciones a un rol específico, se asegura que los datos sensibles permanezcan protegidos y se mantenga un control adecuado sobre la gestión de usuarios.

#### **Diseño:**  
![Ventana de Edición de Usuarios](/public/prototipado_del_sistema/EdicionUsuarios.png)  

---

### **2.5 Ventana de Registro de Insumos**

#### **Descripción:**  
Esta ventana permitirá el registro de los diferentes insumos necesarios para optimizar la producción de los cultivos. Además, proporcionará una lista interactiva de todos los insumos registrados, la cual podrá ser visualizada por el usuario. Desde esta interfaz, el usuario tendrá la opción de visualizar, editar o eliminar los registros de insumos, facilitando así una gestión eficiente y precisa de los recursos agrícolas.

#### **Diseño:**  
![Ventana de Registro de Insumos](/public/prototipado_del_sistema/RegistroInsumo.png)  

---

### **2.6 Ventana de Listado de Insumos**

#### **Descripción:**  
El sistema presentará un listado de los insumos registrados, permitiendo al usuario acceder a detalles completos de cada insumo. Esta funcionalidad facilitará la consulta exhaustiva de la información asociada a cada insumo, proporcionando una visión más detallada y precisa para su correcta gestión.

#### **Diseño:**  
![Ventana de Listado de Insumos](/public/prototipado_del_sistema/ListaInsumos.png)  

---

### **2.7 Ventana de Edición de Insumos**

#### **Descripción:**  
El sistema mostrará un **listado de los insumos registrados**, brindando al usuario la posibilidad de **actualizar** la información asociada a cada insumo. Esta funcionalidad permitirá mantener los registros de insumos actualizados y garantizar la precisión de los datos en el sistema.

#### **Diseño:**  
![Ventana de Edición de Insumos](/public/prototipado_del_sistema/EdicionInsumos.png)  

---

### **2.8 Ventana de Registro de Herramientas**

#### **Descripción:**  
El sistema contará con un apartado específico para registrar los diferentes tipos de herramientas necesarias para optimizar la producción de los cultivos. Además, se desplegará un listado de herramientas registradas, que permitirá al usuario visualizar, editar o eliminar los registros según sea necesario, facilitando una gestión eficiente y actualizada de los recursos utilizados en la producción agrícola.

#### **Diseño:**  
![Ventana de Registro de Herramientas](/public/prototipado_del_sistema/RegistroHerramienta.png)  

---

### **2.9 Ventana de Listado de Herramientas**

#### **Descripción:**  
El sistema listará las herramientas registradas, permitiendo al usuario acceder a detalles completos de la información asociada a cada herramienta. Esta funcionalidad ofrecerá una visión más profunda y detallada de los registros, facilitando su gestión y consulta.

#### **Diseño:**  
![Ventana de Listado de Herramientas](/public/prototipado_del_sistema/ListaHerramienta.png)  

---

### **2.10 Ventana de Edición de Herramientas**

#### **Descripción:**  
El sistema listará las herramientas registradas, brindando al usuario la posibilidad de actualizar la información asociada a cada herramienta. Esta funcionalidad permitirá mantener los registros de herramientas actualizados, asegurando la precisión de los datos en el sistema.

#### **Diseño:**  
![Ventana de Edición de Herramientas](/public/prototipado_del_sistema/EdicionHerramienta.png)  

---

### **2.11 Ventana de Información de Todos los Sensores en Tiempo Real**

#### **Descripción:**  
El sistema deberá procesar y mostrar en tiempo real los datos de los sensores instalados en el sector agrícola, en un panel organizado y fácil de interpretar. Las métricas que se deben visualizar incluyen humedad, temperatura, luminosidad y otras variables clave. Cada variable debe actualizarse en tiempo real y mostrarse en cuadros independientes, con iconos representativos que faciliten la rápida identificación.

#### **Diseño:**  
![Ventana de Sensores en Tiempo Real](/public/prototipado_del_sistema/SensoresTiempoReal.png)  

---

### **2.12 Ventana de Información Recogida sobre la Humedad de las Eras**

#### **Descripción:**  
El sistema utilizará tecnología IoT para recopilar y transmitir en tiempo real los datos sobre la humedad en las eras. Esta información será presentada de manera clara y accesible, permitiendo a los usuarios monitorear y gestionar eficientemente la humedad del suelo en las áreas de cultivo.

#### **Diseño:**  
![Ventana de Humedad de las Eras](/public/prototipado_del_sistema/Humedad.png)  

---

### **2.13 Ventana de Información Recogida sobre la Humedad Ambiente**

#### **Descripción:**  
El sistema mostrará la información sobre la humedad ambiente recopilada mediante sensores IoT, presentando los datos en tiempo real para ofrecer información precisa y actualizada sobre los niveles de humedad en el entorno.

#### **Diseño:**  
![Ventana de Humedad Ambiente](/public/prototipado_del_sistema/HumedadAmbiente.png)  

---

### **2.14 Ventana de Información Recogida sobre la Luminosidad**

#### **Descripción:**  
La información sobre la luminosidad se obtiene mediante sensores distribuidos en varios puntos, que envían datos en tiempo real a la base de datos. Estos datos son procesados y presentados de forma clara, facilitando la gestión de las condiciones de iluminación en el campo.

#### **Diseño:**  
![Ventana de Luminosidad](/public/prototipado_del_sistema/Luminosidad.png)  

---

### **2.15 Ventana de Información Recogida sobre la Lluvia**

#### **Descripción:**  
Mediante un pluviómetro, se medirá la cantidad de lluvia en un área específica durante un período determinado. Este instrumento proporcionará datos sobre la cantidad, intensidad, frecuencia y duración de la lluvia en la ubicación seleccionada.

#### **Diseño:**  
![Ventana de Lluvia](/public/prototipado_del_sistema/Lluvia.png)  

---

### **2.16 Ventana de Información Recogida sobre la Temperatura**

#### **Descripción:**  
El sistema medirá y mostrará la temperatura en las áreas de cultivo utilizando sensores IoT. Los datos se recopilarán en tiempo real y se presentarán de manera clara, permitiendo a los usuarios monitorear las condiciones térmicas y optimizar la gestión de los recursos agrícolas.

#### **Diseño:**  
![Ventana de Temperatura](/public/prototipado_del_sistema/Temperatura.png)  

---

### **2.17 Ventana de Información Recogida sobre la Velocidad y Dirección del Viento**

#### **Descripción:**  
Mediante sensores, se medirá la velocidad y dirección del viento. Los datos serán capturados en diferentes ubicaciones y enviados en tiempo real a una plataforma en la nube para su procesamiento y visualización.

#### **Diseño:**  
![Ventana de Velocidad y Dirección del Viento](/public/prototipado_del_sistema/VelocidadViento.png)  

---

### **2.18 Ventana de Información Recogida sobre el pH del Suelo**

#### **Descripción:**  
El sistema recopilará y mostrará las lecturas de pH del suelo mediante sensores IoT especializados. Esta información será clave para gestionar la acidez o alcalinidad del suelo, lo que afecta la salud de las plantas y la eficiencia de los nutrientes.

#### **Diseño:**  
![Ventana de pH del Suelo](/public/prototipado_del_sistema/PhSuelo.png)  

---

### **2.19 Ventana de Monitoreo de Evapotranspiración**

#### **Descripción:**  
El sistema integrará sensores y algoritmos para estimar la evapotranspiración (ET) en las áreas de cultivo, considerando la evaporación del suelo y la transpiración de las plantas. Esta información será esencial para una gestión eficiente del riego.

#### **Diseño:**  
![Ventana de Evapotranspiración](/public/prototipado_del_sistema/Evapotranspiracion.png)  

---

### **2.20 Ventana de Almacenamiento y Gestión Histórica de Datos**

#### **Descripción:**  
El sistema debe almacenar los datos capturados por los sensores en una base de datos, permitiendo su consulta y análisis histórico para la optimización agrícola y la detección de tendencias.

#### **Diseño:**  
![Ventana de Gestión Histórica de Datos](/public/prototipado_del_sistema/HistoricaDatos.png)  

---

### **2.21 Ventana de Registro, Listado y Edición de un Cultivo**

#### **Descripción:**  
Este formulario tiene como propósito facilitar el registro de nombre del cultivo y tipo de cultivo, para luego ser asignados a los cultivos en el sistema. Está diseñado para permitir a los usuarios ingresar datos básicos, los cuales serán almacenados para su posterior consulta y gestión.

#### **Diseño:**  
![Ventana de Registro de Cultivos](/public/prototipado_del_sistema/RegistroTipoEspecie.png)  
![Ventana de Listado de Cultivos](/public/prototipado_del_sistema/ListaTipoEspecie.png)  
![Ventana de Edición de Cultivos](/public/prototipado_del_sistema/EdicionCultivo.png)  

---

### **2.22 Ventana de Registro, Listado y Edición de Lotes**

#### **Descripción:**  
En la sección de lotes, los usuarios podrán registrar nuevos lotes y editar la información de los lotes ya registrados. La opción de edición es esencial para corregir errores, actualizar datos y garantizar la precisión de la información almacenada.

#### **Diseño:**  
![Ventana de Registro de Lotes](/public/prototipado_del_sistema/RegistroLotes.png)  
![Ventana de Listado de Lotes](/public/prototipado_del_sistema/ListaLotes.png)  
![Ventana de Edición de Lotes](/public/prototipado_del_sistema/EdicionLotes.png)  

---

### **2.23 Ventana de Registro, Listado y Edición de una Era**

#### **Descripción:**  
El sistema de eras será diseñado y construido con el objetivo de optimizar el espacio de cultivo y facilitar el mantenimiento de las plantas. Este sistema contribuirá a crear un entorno más eficiente y sostenible para el crecimiento de los cultivos.

#### **Diseño:**  
![Ventana de Registro de Eras](/public/prototipado_del_sistema/RegistroBancal.png)  
![Ventana de Listado de Eras](/public/prototipado_del_sistema/ListaBancal.png)  
![Ventana de Edición de Eras](/public/prototipado_del_sistema/EdicionBancal.png)  

---

### **2.24 Ventana de Registro, Listado y Edición de un Cultivo**

#### **Descripción:**  
El propósito de este formulario es optimizar el registro de nuevos cultivos en el sistema. A través de él, los usuarios podrán ingresar información clave sobre cada cultivo, que será almacenada y organizada para su posterior consulta y gestión eficiente.

#### **Diseño:**  
![Ventana de Registro de Cultivos](/public/prototipado_del_sistema/RegistroCultivo.png)  
![Ventana de Listado de Cultivos](/public/prototipado_del_sistema/ListaCultivo.png)  
![Ventana de Edición de Cultivos](/public/prototipado_del_sistema/EdicionCultivo.png)  

---

### **2.25 Ventana de Registro, Listado y Edición de una Actividad**

#### **Descripción:**  
Los usuarios podrán registrar nuevas actividades para los cultivos, proporcionando información clave como el nombre de la actividad, una descripción que sirva de referencia para los aprendices, y la fecha de creación de la actividad.

#### **Diseño:**  
![Ventana de Registro de Actividades](/public/prototipado_del_sistema/RegistroTipoActividad.png)  
![Ventana de Listado de Actividades](/public/prototipado_del_sistema/ListaTipoActividad.png)  
![Ventana de Edición de Actividades](/public/prototipado_del_sistema/EdicionTipoActividad.png)  

---

### **2.26 Ventana de Asignación, Listado y Edición de una Actividad**

#### **Descripción:**  
Los instructores podrán asignar nuevas actividades a los usuarios proporcionando detalles como el lote donde se encuentra el cultivo, el cultivo en sí, y la actividad que se va a realizar (por ejemplo, riego, siembra o fertilización). Además, deberán incluir una descripción detallada de la actividad, la fecha programada, y el personal asignado para llevarla a cabo. También se especificarán los insumos y herramientas que se utilizarán durante la actividad, así como el estado en el que se asigna la actividad.

#### **Diseño:**  
![Ventana de Asignación de Actividades](/public/prototipado_del_sistema/AsignarActividad.png)  
![Ventana de Listado de Actividades Asignadas](/public/prototipado_del_sistema/ListaActividad.png)  
![Ventana de Edición de Actividades Asignadas](/public/prototipado_del_sistema/EdicionActividad.png)  

---

### **2.27 Ventana de Finalización de una Actividad Asignada**

#### **Descripción:**  
Después que la persona termina la actividad que se le asignó debe cambiar el estado de la actividad a lo cual podrá realizar mediante un botón de actualización (icono de actualización), para continuar con este proceso el usuario debe ingresar los datos del tiempo gastado en la actividad (en minutos), la cantidad gastada del insumo que se le asignó, y seleccionar el nuevo estado de la actividad por último dar en 'finalizar actividad' para terminar el proceso y dar por terminada la actividad.

#### **Diseño:**  
![Ventana de Finalización de Actividad](/public/prototipado_del_sistema/FinalizarActividad.png)  

---

### **2.28 Ventana de Registro de Producción de un Cultivo**

#### **Descripción:**  
El sistema permitirá registrar la producción obtenida de un cultivo, después de realizada la actividad de cosecha donde se debe brindar información como: El cultivo que se recolecto, la cantidad recolectada en kilogramos (kg), la unidad de medida para la recolección, la fecha de recolección y una fotografía de la recolección.

#### **Diseño:**  
![Ventana de Registro de Producción](/public/prototipado_del_sistema/Cosecha.png)  

---

### **2.29 Ventana de Registro de Enfermedades y Plagas**

#### **Descripción:**  
El registro debe incluir la fecha de observación, la identificación del organismo (nombre científico y común), su ubicación exacta en el cultivo, el nivel de daño causado, y una descripción detallada de los daños, métodos de erradicación y comentarios adicionales. Este registro tiene como objetivo realizar un control preciso de los organismos presentes en los cultivos, documentando las acciones de erradicación para mejorar la gestión de amenazas y garantizar la salud del cultivo.

#### **Diseño:**  
![Ventana de Registro de Enfermedades](/public/prototipado_del_sistema/RegistroReportePlaga.png)  

---

### **2.30 Ventana de Control Fitosanitario**

#### **Descripción:**  
El objetivo es ofrecer a los usuarios un control fitosanitario eficiente, permitiendo registrar las acciones realizadas. Tras registrar la información sobre la plaga que afecta un cultivo, el usuario podrá acceder al apartado de control fitosanitario para documentar las medidas de eliminación de la plaga o el seguimiento para la recuperación del cultivo.

#### **Diseño:**  
![Ventana de Control Fitosanitario](/public/prototipado_del_sistema/RegistroControl.png)  

---

### **2.31 Ventana de Recordatorios mediante un Calendario**

#### **Descripción:**  
El sistema ofrecerá un calendario accesible desde la interfaz principal, permitiendo a los usuarios registrar, visualizar y gestionar eventos relacionados con la producción agrícola, como siembra, fertilización, tratamientos fitosanitarios y cosechas. Este calendario contará con una interfaz intuitiva para facilitar la navegación y visualización de eventos. Los usuarios recibirán recordatorios automáticos sobre eventos próximos y podrán personalizar los registros con categorías, etiquetas, descripciones y notas adicionales. Además, será posible modificar o eliminar eventos según sea necesario para ajustar la programación de actividades.

#### **Diseño:**  
![Ventana de Calendario](/public/prototipado_del_sistema/Calendario.png)  

---

### **2.32 Ventana de Visualización de Cultivos por medio de un Mapa**

#### **Descripción:**  
Desarrollar un mapa interactivo que registre el historial de cada cultivo. Al seleccionar un sector específico como tomate o cebolla, se desplegará el historial relacionado, incluyendo detalles como riego y abono.

#### **Diseño:**  
![Ventana de Mapa de Cultivos](/public/prototipado_del_sistema/Mapa.png)
![Ventana de Mapa de Cultivos2](/public/prototipado_del_sistema/Mapa2.png)  


---

### **2.33 Ventana de Edición de Perfil de Usuario**

#### **Descripción:**  
El sistema debe permitir a los usuarios actualizar información personal básica como nombre, dirección de correo electrónico, número de teléfono, foto e incluirá mecanismos de seguridad, como la posibilidad de cambiar contraseñas, y restablecer accesos en caso de olvido de credenciales.

#### **Diseño:**  
![Ventana de Edición de Perfil](/public/prototipado_del_sistema/EdicionPerfilUsuario.png)  
![Ventana de Edición de Perfil 2](/public/prototipado_del_sistema/EdicionPerfilUsuario2.png)  

---

### **2.34 Ventana de Asignación de Roles y Permisos**

#### **Descripción:**  
El sistema debe permitir asignar roles a los usuarios, como administrador, instructor, pasante, operario, o visitante, definiendo los permisos de acceso a diferentes módulos o funcionalidades según el rol asignado.

#### **Diseño:**  
![Ventana de Asignación de Roles](/public/prototipado_del_sistema/AsignarRoles.png)  

---

### **2.35 Ventana de Registro y Edición de un Salario Mínimo (SMLV)**

#### **Descripción:**  
El sistema debe proporcionar una funcionalidad que permita registrar el salario mínimo aplicable de acuerdo con las normativas legales vigentes, proporciona una interfaz intuitiva y segura que permita a los usuarios actualizar el salario mínimo vigente de manera eficiente, esto garantizará que el sistema cumpla con los requisitos legales y facilite la gestión de nóminas o pagos de empleados conforme a las leyes laborales.

#### **Diseño:**  
![Ventana de Registro de Salario Mínimo](/public/prototipado_del_sistema/RegistroSalario.png)  

---

### **2.36 Ventana de Registro y Edición de Precio a un Producto**

#### **Descripción:**  
Permitirá registrar el precio base de un producto al momento de agregarlo al sistema Y provee una interfaz para actualizar los precios de productos existentes, permitiendo registrar cambios Este precio debe incluir información como moneda, impuestos aplicables y vigencia inicial.

#### **Diseño:**  
![Ventana de Registro de Precio](/public/prototipado_del_sistema/RegistroPrecioProducto.png)  
![Ventana de Edición de Precio](/public/prototipado_del_sistema/EdicionPrecioProducto.png)  

---

### **2.37 Ventana de Configuraciones de Sensores**

#### **Descripción:**  
El sistema permitirá configurar umbrales críticos para cada variable monitorizada. Cuando los valores superen o caigan por debajo de estos umbrales, se generarán alertas automáticas, notificando al usuario en tiempo real.

#### **Diseño:**  
![Ventana de Configuración de Sensores](/public/prototipado_del_sistema/ConfiguracionSensores.png)  

---

### **2.38 Ventana de Control de Dispositivos Arduino**

#### **Descripción:**  
Permitirá establecer la implementación de un sistema que permita al usuario seleccionar, almacenar y alternar configuraciones predefinidas de software en un microcontrolador, optimizando su flexibilidad y funcionalidad.

#### **Diseño:**  
![Ventana de Control de Arduino](/public/prototipado_del_sistema/ControlArduino.png)  

---

### **2.39 Ventana de Resumen de Pago al Trabajador**

#### **Descripción:**  
El sistema calculará el monto a pagar a cada trabajador utilizando el tiempo trabajado en cada actividad (datos registrados en el módulo de trazabilidad) multiplicado por el valor correspondiente. Para esto el sistema inicialmente obtendrá los datos registrados con respecto al tiempo (se calculan en minutos), a raíz de esto el sistema determina la cantidad de horas, para así finalmente determinar los jornales y poder determinar el valor final a pagar. En el presente Figma el usuario podrá filtrar según la información que desee obtener (actividad o fecha), con esto se logrará obtener información del pasante el tiempo trabajado y el valor a pagar.

#### **Diseño:**  
![Ventana de Resumen de Pago](/public/prototipado_del_sistema/RegistroCalculoPago.png)  
![Ventana de Filtrado de Pagos](/public/prototipado_del_sistema/DetallePago.png)  

---

### **2.40 Ventana de Registro de Ventas**

#### **Descripción:**  
El sistema permite registrar cada transacción de venta, capturando detalles como fecha, producto, cantidad, ingresos y cliente. Esto crea un historial completo que facilita el seguimiento de operaciones comerciales y mejora la gestión de la cartera de clientes.

#### **Diseño:**  
![Ventana de Registro de Ventas](/public/prototipado_del_sistema/RegistroVentas.png)  

---

### **2.41 Ventana de Reporte de Rentabilidad por Cultivo**

#### **Descripción:**  
El sistema permitirá a los usuarios calcular y comparar la rentabilidad de cada cultivo registrado, basándose en ingresos y egresos. Los resultados se mostrarán tanto en porcentajes como en valores absolutos, detallados por actividad y bancal. Además, incluirá un Resumen General enfocado en un bancal seleccionado, consolidando los datos financieros para facilitar el análisis. Los usuarios tendrán la opción de exportar estos informes en formatos PDF o Excel, optimizando la gestión y toma de decisiones estratégicas.

#### **Diseño:**  
![Ventana de Reporte de Rentabilidad](/public/prototipado_del_sistema/ReporteRentabilidadPorCultivo.png)  

---

### **2.42 Ventana de Reporte de Precios e Historial de Cultivos**

#### **Descripción:**  
El sistema deberá generar informes que detallen los precios actuales y pasados de los productos, junto con las fechas de vigencia.

#### **Diseño:**  
![Ventana de Reporte de Precios](/public/prototipado_del_sistema/ReportePrecioProducto.png)  

---

### **2.43 Ventana de Reporte de Historial de Salario Mínimo**

#### **Descripción:**  
El sistema generara un informe del historial de salarios mínimos registrados, incluyendo las fechas de vigencia y montos aplicable.

#### **Diseño:**  
![Ventana de Reporte de Salario Mínimo](/public/prototipado_del_sistema/ReporteSalarioMinimo.png)  

---

### **2.44 Ventana de Gráfico de Tiempo por Actividad**

#### **Descripción:**  
El sistema procesará los datos de tiempo registrados en cada actividad (como cosecha o fumigación) y generará un gráfico semanal que visualice el total de horas dedicadas. Este gráfico ofrecerá una representación clara de la distribución del tiempo del personal en diferentes tareas, permitiendo identificar áreas que demandan más esfuerzo o atención. Así mismo el usuario podrá filtrar el lapso de tiempo el cual quiere visualizar en la gráfica.

#### **Diseño:**  
![Ventana de Gráfico de Tiempo](/public/prototipado_del_sistema/TiempoDedicadoAActividad.png)  

---

### **2.45 Ventana de Gráfico de Costo por Actividad**

#### **Descripción:**  
El sistema proporciona un desglose de los costos totales por actividad, calculando el impacto de cada insumo utilizado dependiendo el lapso de tiempo que deseen visualizar en la gráfica (ya sea de barras o circular) donde se verán datos reflejados del valor en cuanto al costo y la actividad. Los usuarios pueden analizar cómo cada insumo afecta el presupuesto, lo que facilita un control detallado y ajustes de gastos en tiempo real.

#### **Diseño:**  
![Ventana de Gráfico de Costo](/public/prototipado_del_sistema/CostosPorActividad.png)  

---

### **2.46 Ventana de Gráficos de Rendimiento de Ventas por Producto**

#### **Descripción:**  
El sistema presenta gráficos que ilustran la cantidad de productos vendidos a lo largo del tiempo, permitiendo a los usuarios analizar el rendimiento de cada producto dependiendo el lapso de tiempo seleccionado. Esta visualización facilita la toma de decisiones para ajustar estrategias de ventas según los resultados obtenidos.

#### **Diseño:**  
![Ventana de Gráfico de Ventas](/public/prototipado_del_sistema/RendimientoVentasPorProducto.png)  

---

### **2.47 Ventana de Informe de Costo Total por Mano de Obra**

#### **Descripción:**  
El sistema desglosa el tiempo trabajado por cada empleado y el costo total por actividad, proporcionando una visión detallada de los costos laborales dependiendo el lapso de tiempo seleccionado. Esto permite al usuario analizar la rentabilidad de las actividades y ajustar la asignación de personal según las necesidades y el desempeño de cada tarea.

#### **Diseño:**  
![Ventana de Informe de Costo](/public/prototipado_del_sistema/CostoTotalManoObra.png)  

---

### **2.48 Ventana de Reporte de Usuarios**

#### **Descripción:**  
Este reporte analiza el uso de la plataforma "AgroSis" por parte de los aprendices registrados previamente por el administrador. Presenta datos clave sobre su actividad, satisfacción y problemas frecuentes, con el fin de mejorar la experiencia de aprendizaje y optimizar las funcionalidades más utilizadas.

#### **Diseño:**  
![Ventana de Reporte de Usuarios](/public/prototipado_del_sistema/ReporteUsuarios.png)  

---

### **2.49 Ventana de Reporte de Insumos Registrados**

#### **Descripción:**  
El sistema debe permitir visualizar todos los datos de los insumos registrados, enlistando cada producto con detalles como nombre, cantidad disponible, fecha de caducidad, y otras características relevantes. Esta visualización proporcionará una descripción clara de los insumos, facilitando su gestión y permitiendo un control eficiente sobre los recursos disponibles.

#### **Diseño:**  
![Ventana de Reporte de Insumos](/public/prototipado_del_sistema/ReporteInsumosRegistrados.png)  

---

### **2.50 Ventana de Reporte de Herramientas Registradas**

#### **Descripción:**  
El sistema debe permitir visualizar toda la información de las herramientas registradas, incluyendo detalles como nombre, estado, ubicación, y cualquier otra característica relevante. Esta funcionalidad facilitará el acceso completo a los datos de las herramientas, permitiendo a los usuarios gestionar y optimizar su uso de manera eficiente en los cultivos.

#### **Diseño:**  
![Ventana de Reporte de Herramientas](/public/prototipado_del_sistema/ReporteHerramientas.png)  

---

### **2.51 Ventana de Reporte de Datos en Tiempo Real de Sensores**

#### **Descripción:**  
El sistema generará un reporte con los datos tomados en tiempo real por los sensores, incluyendo información sobre humedad del suelo, humedad ambiente, temperatura, viento, luminosidad, pH y pluviómetro. Los datos serán presentados de manera clara y organizada mediante gráficas, permitiendo a  

#### **Diseño:**  
![Ventana de Reporte de Sensores](/public/prototipado_del_sistema/ReporteSensores.png)  

---

### **2.52 Prototipo 52: Ventana de Reporte de Tipo de Especies y Especies Registradas**

#### **Descripción:**  
El sistema deberá generar un reporte que liste todas las especies y los tipos registrados. Este reporte facilitará la consulta.
#### **Diseño:**  
![Ventana de Reporte de Especies](/public/prototipado_del_sistema/ReporteCultivos.png)  

---

### **2.52 Prototipo 53: Ventana de Reporte de Semilleros Activos**

#### **Descripción:**  
Genera un informe detallado de semilleros activos, incluyendo fecha de siembra y estado actual.  

#### **Diseño:**  
![Ventana de Reporte de Semilleros](/media/image71.png)  

---

### **2.53 Prototipo 53: Ventana de Reporte de Lotes**

#### **Descripción:**  
Este apartado proporcionará un reporte detallado de los lotes activos registrados en el sistema. El reporte incluirá información clave como la fecha de registro del lote, sus dimensiones, el tipo de suelo, las fechas estimadas de siembra y otros datos relevantes que faciliten el seguimiento y la gestión de cada lote. Este informe permitirá a los usuarios tener una visión clara y precisa de los lotes activos, optimizando la planificación y la toma de decisiones agrícolas.  

#### **Diseño:**  
![Ventana de Reporte de Lotes](/public/prototipado_del_sistema/ReporteLotes.png)  

---

### **2.54 Prototipo 54: Ventana de Reporte de Historial de Eras**

#### **Descripción:**  
Este apartado permitirá tener una información detallada de las eras registradas con su debida fecha y si está o no disponible, el estado en el que se encuentra tipo de suelo, dimensiones y en qué lote está ubicado. 

#### **Diseño:**  
![Ventana de Reporte de Eras](/public/prototipado_del_sistema/ReporteBancal.png)  

---

### **2.55 Prototipo 55: Ventana de Reporte de Cultivos Activos**

#### **Descripción:**  
El sistema generará un reporte en formato PDF que incluirá los cultivos activos registrados. Este informe detallará información relevante sobre cada cultivo, como el nombre del cultivo, su ubicación, el estado actual, las fechas de siembra y estimación de cosecha, así como otros datos clave para la gestión eficiente de los cultivos. El reporte permitirá a los usuarios acceder de manera rápida y organizada a la información de los cultivos activos, facilitando el seguimiento, la planificación y la toma de decisiones estratégicas en el manejo agrícola.  

#### **Diseño:**  
![Ventana de Reporte de Cultivos](/public/prototipado_del_sistema/ReporteCultivoActivo.png)  

---

### **2.56 Prototipo 56: Ventana de Reporte de Actividades Realizadas**

#### **Descripción:**  
El sistema debe permitir la generación de un reporte detallado de las actividades realizadas en cada cultivo. este reporte servirá para monitorear el historial de mantenimiento y cuidado de cada cultivo, facilitando la trazabilidad y el análisis de las prácticas agrícolas realizadas
#### **Diseño:**  
![Ventana de Reporte de Actividades](/public/prototipado_del_sistema/ReporteActividadesRealizadas.png)  

---

### **2.57 Prototipo 57: Ventana de Reporte de Enfermedades**

#### **Descripción:**  
El sistema generará un reporte en formato PDF que detallará las enfermedades detectadas en los cultivos durante un período determinado. Este informe incluirá información clave sobre cada enfermedad identificada, como el nombre de la enfermedad, la ubicación en el cultivo, el nivel de afectación, las acciones de control realizadas y las fechas de detección. Además, el reporte estará organizado por mes, lo que permitirá a los usuarios llevar un control preciso de las enfermedades presentes en los cultivos a lo largo del tiempo. Este seguimiento detallado facilitará la trazabilidad del cultivo y mejorará la gestión del control fitosanitario, ayudando a prevenir futuras incidencias. 

#### **Diseño:**  
![Ventana de Reporte de Enfermedades](/public/prototipado_del_sistema/ReporteEnfermedades.png)  

---

### **2.58 Prototipo 58: Ventana de Controles de Plagas, Enfermedades y Arvenses**

#### **Descripción:**  
El sistema deberá generar un PDF, con los reportes de los controles que se llevaron a cabo para erradicar las enfermedades, plagas o arvenses presentes en los cultivos. Al conocer los controles que se le realizaron, permitirá llevar un seguimiento detallado del cultivo.   

#### **Diseño:**  
![Ventana de Reporte de Controles](/public/prototipado_del_sistema/ReporteControl.png)  

---

### **2.59 Prototipo 59: Ventana de Reporte de Egresos por Insumos**

#### **Descripción:**  
El sistema genera un reporte detallado de los gastos de insumos por actividad, permitiendo a los usuarios revisar el tipo y costo de cada insumo. Esto facilita la evaluación de la eficiencia en el uso de recursos y ayuda a optimizar el presupuesto para futuras actividades. 

#### **Diseño:**  
![Ventana de Reporte de Egresos](/public/prototipado_del_sistema/ReporteEgresosInsumos.png)  

---

### **2.60 Prototipo 60: Ventana de Reporte de Ingresos por Producto Vendido**

#### **Descripción:**  
El sistema genera un reporte que desglosa las ventas de cada producto, incluyendo unidades vendidas, ingresos totales y margen de ganancia. Este informe permite analizar el rendimiento comercial de los productos y tomar decisiones informadas para mejorar las estrategias de venta. 

#### **Diseño:**  
![Ventana de Reporte de Ingresos](/public/prototipado_del_sistema/ReporteVentas.png)  

---

### **2.61 Prototipo 61: Ventana de Informe de Rentabilidad**

#### **Descripción:**  
El sistema ofrecerá un análisis detallado de la rentabilidad de cada actividad, comparando los ingresos generados con los egresos incurridos. Este análisis proporcionará un desglose claro del margen de ganancia para cada actividad, permitiendo a los usuarios identificar las áreas más rentables y aquellas que requieren ajustes.  

#### **Diseño:**  
![Ventana de Informe de Rentabilidad](/public/prototipado_del_sistema/ReporteRentabilidad.png)  

---

## **Conclusión**

Este documento presenta los prototipos del sistema **Agrosoft**, diseñados para optimizar la gestión agrícola mediante módulos especializados en IoT, actividades, finanzas e inventario. Cada prototipo está enfocado en facilitar el registro, monitoreo y análisis de datos, asegurando una toma de decisiones informada y eficiente. La implementación de este sistema contribuirá a prácticas agrícolas más sostenibles y productivas en la región.