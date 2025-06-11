---
title: Diagrama de funcionalidad del proyecto
---

## diargama de funcionalidad del proyecto

A continuación se presentaran diagramas del sistema con diversos casos y distintos tipos de usuarios (roles) y sus funciones e interacciones en el sistema

---

### 1. Caso administrador
1. En el menú principal, interactua en distintos módulos para realizar los registros necesarios para la funcionalidad de funciones del proyecto:
**El adminstrador tiene permisos sobre todo el sistema y sus modulos**

   <img src="/public/diagramas/SequenceDiagram_Administrador_realiza_registros1.jpg" alt="Navegación al módulo de salario"  />

---
### 2. Caso Instructor - asigna actividad
1. El instructor procede a registrar y asignar una actividad a un usuario (registrado previamente por el administrador):
**El instructor cuenta con los mismos permisos que un administradpr excepto sobre el manejo de informacion de usuarios**

   <img src="/public/diagramas/SequenceDiagram_Instructor_asigna_actividad_2.jpg" alt="Navegación al módulo de salario"  />

---

### 3. Caso Pasante - registro de un reporte de plagas
1. El pasante procede a diligenciar un formulario, el el cual habrán datos relacionados a  afecciones del cultivo y su informacion detallada, unbicacion del cultivo, tipo de plaga, 
**El pasante tendrá un formulario a su disposición sobre afecciones vistas en el cultivo**

   <img src="/public/diagramas/SequenceDiagram_pasante_reporta_plaga_5.jpg" alt="Navegación al módulo de salario"  />

---

### 4. Caso Pasante - actividad completada
1. El pasante procede a marcar la actividad que se le asignó como completada:
**El pasante contiene menos permisos que otros los roles del sistema,solo los necesarios para realizar sus actividades**

   <img src="/public/diagramas/SequenceDiagram_pasante_completa_activdad_3.jpg" alt="Navegación al módulo de salario"  />

---

### 5. Caso Administrador - pago a pasante
1. El Administrador procede a diligenciar un formulario con datos relacionados a el pago de actividad que se le asignó anteriormente:
**El pago se realiza usando un salario registrado previamente, el cual se registra para un determinado rol especifico de usuario**

   <img src="/public/diagramas/SequenceDiagram_pago_a _usuario_4.png" alt="Navegación al módulo de salario"  />

---

