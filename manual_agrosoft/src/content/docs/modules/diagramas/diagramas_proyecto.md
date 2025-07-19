---
title: Diagrama de funcionalidad del proyecto
---

## diargama de funcionalidad del proyecto

A continuación se presentaran diagramas del sistema con diversos casos y distintos tipos de usuarios (roles) y sus funciones e interacciones en el sistema

---

### 1. Caso administrador - Registros necesarios
1. EL administrador interactua en distintos módulos para realizar los registros necesarios para la funcionalidad del proyecto:

**El adminstrador tiene permisos sobre todo el sistema y sus modulos**

   <img src="/public/diagramas/funcionalidad//1-Diagrama_Funcionalidad_Admin_Registra.jpg" alt="Navegación al módulo de salario"  />

---
### 2. Caso Instructor - asigna actividad
1. El instructor procede a registrar y asignar una actividad a un usuario (registrado previamente por el administrador):

**El instructor cuenta con los mismos permisos que un administrador excepto sobre el manejo de informacion de usuarios y la creación de los mismos**

   <img src="/public/diagramas/funcionalidad/2_Diagrama_funcionalidad_Instructor_asigna_actividad.jpeg" alt="Navegación al módulo de salario"  />

---

### 3. Caso Instructor - registro de un Tipo de control 
1. El Instructor procede a diligenciar un formulario, el el cual habrán datos relacionados al tipo de control que se le aplicara a un determinado cultivo en forma de seguimiento, el administrador se encarga de este registro para que el pasante pueda registrar un futuro reporte de afecciones de un cultivo.

   <img src="/public/diagramas/funcionalidad/3_Diagrama_funcionalidad_Instructor_registra_Tipo_Control.jpeg" alt="Navegación al módulo de salario"  />

---


### 4. Caso Pasante - registro de un reporte de plagas
1. El pasante procede a diligenciar un formulario, en el cual habrán datos relacionados a  afecciones del cultivo y su informacion detallada, unbicacion del cultivo, tipo de plaga, 

**El pasante tendrá un formulario a su disposición sobre afecciones vistas en el cultivo**

   <img src="/public/diagramas/funcionalidad/4_Diagrama_funcionalidada_Pasante_registra_afeccion.jpg" alt="Navegación al módulo de salario"  />

---

### 5. Caso Pasante - Finaliza actividad
1. El pasante procede a marcar la actividad que se le asignó como completada:

**El pasante contiene menos permisos que otros los roles del sistema,solo los necesarios para realizar sus actividades**

   <img src="/public/diagramas/funcionalidad/5_Diagrama_funcionalidad_Pasante_Finaliza_actividad_temp.jpeg" alt="Navegación al módulo de salario"  />

---

### 6. Caso Administrador - pago a pasante
1. El Administrador procede a diligenciar un formulario con datos relacionados a el pago de actividad que se le asignó anteriormente, la realizacion del pago depende del estado de actividad y de usuario:

**El pago se realiza usando un salario registrado previamente, el cual se registra para un determinado rol especifico de usuario**

   <img src="/public/diagramas/funcionalidad/6_Diagrama_funcionalidad_Instructor_Manejo_Pagos.jpeg" alt="Navegación al módulo de salario"  />

---

