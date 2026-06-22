# Activos de Información y Riesgos de la Industria

**Empresa:** SaludOnline (Telemedicina)  
**Marco de referencia:** ISO/IEC 27001:2022 — Gestión de Activos

---

## 1. Inventario de Activos de Información

Un activo de información es cualquier dato, sistema o proceso que tiene valor para la organización y que debe ser protegido.

### 1.1 Activos de Datos

| ID | Activo | Descripción | Clasificación | Propietario |
|---|---|---|---|---|
| D-01 | Base de datos de pacientes | Datos personales, historial médico, alergias, medicamentos actuales | **Confidencial — Crítico** | Director Médico |
| D-02 | Prescripciones médicas digitales | Recetas activas e históricas, medicamentos controlados | **Confidencial — Crítico** | Director Médico |
| D-03 | Fichas clínicas | Diagnósticos, anamnesis, imágenes radiológicas, resultados de laboratorio | **Confidencial — Crítico** | Director Médico |
| D-04 | Registros de videoconsultas | Grabaciones de consultas médicas (si aplica), notas de la sesión | **Confidencial — Alto** | Jefe de TI |
| D-05 | Datos financieros | Pagos, datos de tarjetas, cobertura de seguros, cobros a isapres | **Confidencial — Alto** | Gerente Financiero |
| D-06 | Credenciales de acceso | Hashes de contraseñas de médicos, pacientes y administrativos | **Confidencial — Crítico** | Jefe de TI |
| D-07 | Logs del sistema | Registros de acceso, errores y auditoría del portal | **Interno — Medio** | Jefe de TI |
| D-08 | Agenda médica | Horarios de médicos, citas agendadas, disponibilidad | **Interno — Bajo** | Operaciones |

### 1.2 Activos de Software

| ID | Activo | Descripción | Clasificación |
|---|---|---|---|
| S-01 | Portal web de pacientes | Aplicación web de atención al cliente (donde se ejecutan los ataques) | **Crítico** |
| S-02 | Sistema de gestión de recetas | Módulo de prescripción y firma digital | **Crítico** |
| S-03 | Plataforma de videoconsultas | Sistema de videollamadas médico-paciente | **Alto** |
| S-04 | Sistema de gestión hospitalaria (HIS) | Backend médico integrado con fichas clínicas | **Crítico** |
| S-05 | API de integración con Fonasa/Isapres | Consulta de cobertura y cobro de prestaciones | **Alto** |
| S-06 | Sistema de backups | Herramienta de respaldo automático de la base de datos | **Alto** |

### 1.3 Activos de Infraestructura

| ID | Activo | Descripción | Clasificación |
|---|---|---|---|
| I-01 | Servidor de aplicaciones web | Servidor que ejecuta el portal de clientes | **Crítico** |
| I-02 | Servidor de base de datos | Motor de base de datos con registros clínicos | **Crítico** |
| I-03 | Servidor de videollamadas | Infraestructura de WebRTC o servicio de terceros | **Alto** |
| I-04 | Red interna y VPN | Comunicación entre médicos y el sistema desde clínicas remotas | **Alto** |
| I-05 | Sistema de respaldo offsite | Copias de seguridad en ubicación diferente | **Alto** |

---

## 2. Amenazas Relevantes para la Industria de Telemedicina

La industria de la salud es el sector más atacado del mundo según el **IBM X-Force Threat Intelligence Index 2024**, superando al sector financiero desde 2020.

### 2.1 Amenazas Externas

| Amenaza | Descripción | Probabilidad en Salud |
|---|---|---|
| Ransomware | Cifrado de bases de datos clínicas con demanda de rescate | Muy Alta |
| Inyección SQL | Extracción de fichas clínicas desde el portal web | Alta |
| Phishing dirigido | Correos falsos a médicos para robar credenciales | Muy Alta |
| Ataques de fuerza bruta | Intentos masivos de autenticación en el portal | Alta |
| Exfiltración de datos | Venta de fichas clínicas en el mercado negro (precio: USD 250/ficha) | Media |
| Man-in-the-Middle | Interceptar teleconsultas no cifradas | Media |
| Supply chain attack | Comprometer una librería de terceros utilizada por el portal | Baja |

### 2.2 Amenazas Internas

| Amenaza | Descripción | Probabilidad |
|---|---|---|
| Insider malicioso | Empleado que vende datos de pacientes a terceros | Media |
| Error humano | Médico que envía ficha clínica a un correo equivocado | Alta |
| Uso indebido de credenciales | Compartir contraseñas entre colegas | Alta |
| Dispositivo perdido/robado | Laptop de médico con acceso al portal sin cifrado | Media |

---

## 3. Análisis de Vulnerabilidades por Activo

| Activo | Vulnerabilidad Detectada | Riesgo Inherente |
|---|---|---|
| D-01, D-02, D-03 | Inyección SQL en S-01 permite acceso sin autenticación | **Crítico** |
| S-01, D-06 | XSS reflejado permite robo de sesiones de médicos | **Alto** |
| I-01, S-01 | Inyección de comandos permite control total del servidor | **Crítico** |
| D-05 | Datos financieros sin cifrado en tránsito | **Alto** |
| D-06 | Contraseñas almacenadas en texto plano (DVWA por defecto) | **Crítico** |

---

## 4. Marco Regulatorio Aplicable

| Norma | Requisito Relevante |
|---|---|
| **Ley 19.628 (Chile)** | Protección de datos personales; obligación de seguridad y notificación de brechas |
| **Ley 20.584** | Derechos del paciente; confidencialidad de la información clínica |
| **ISO/IEC 27001:2022** | SGSI; control A.8 (Gestión de Activos) |
| **HIPAA (referencial)** | Protección de PHI (Protected Health Information) en sistemas electrónicos |
| **NIST CSF 2.0** | Marco de ciberseguridad para infraestructura crítica de salud |
