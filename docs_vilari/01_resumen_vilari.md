# Resumen Ejecutivo — Auditoría de Seguridad Web

**Empresa:** SaludOnline (Código E26)  
**Rubro:** Telemedicina  
**Sufijo del auditor:** `vilari`  
**Fecha:** Junio 2026  
**Asignatura:** Fundamentos de Seguridad de la Información — INACAP  

---

## 1. Descripción de la Empresa

**SaludOnline** es una plataforma de telemedicina chilena que conecta a pacientes con médicos y especialistas a través de un portal web. Permite agendar teleconsultas por videollamada, emitir recetas digitales y gestionar el historial clínico de cada paciente de forma remota.

| Servicio | Descripción |
|---|---|
| Teleconsultas | Videollamadas médico-paciente en tiempo real |
| Recetas Digitales | Emisión y gestión de prescripciones médicas |
| Historial Clínico | Fichas clínicas digitales con diagnósticos y exámenes |
| Agenda Médica | Reserva y cancelación de horas con especialistas |
| Pagos en Línea | Cobros, seguros de salud y copagos |

---

## 2. Portal de Clientes Auditado

El portal de clientes es una aplicación web que custodia información altamente sensible. Opera bajo la normativa chilena (**Ley N° 19.628** de Protección de la Vida Privada) y estándares internacionales como **ISO/IEC 27001** e **HIPAA**.

### Datos bajo custodia

| Categoría | Ejemplos |
|---|---|
| Fichas clínicas | Diagnósticos, anamnesis, imágenes radiológicas, resultados de laboratorio |
| Prescripciones | Medicamentos, dosis, duración del tratamiento, alertas de interacción |
| Datos personales | RUT, dirección, teléfono, correo electrónico, previsión de salud |
| Credenciales | Usuarios y contraseñas de médicos, especialistas y administrativos |
| Datos financieros | Información de pago, coberturas de seguros, historial de cobros |

---

## 3. Entorno de Pruebas

La auditoría se realizó sobre **DVWA (Damn Vulnerable Web Application)**, una aplicación web deliberadamente vulnerable que simula el portal de clientes de SaludOnline. La configuración de seguridad fue establecida en nivel **"Low"** para exponer las vulnerabilidades en su forma más directa, tal como se encontrarían en un sistema sin controles de seguridad básicos.

**URL del laboratorio:** `https://dvwa-dnwe.onrender.com` (entorno controlado desplegado en Render)  
**Credenciales de prueba:** `admin / password`

---

## 4. Vulnerabilidades Identificadas

| N° | Módulo DVWA | Vulnerabilidad | CVSS v3.1 | Severidad |
|---|---|---|---|---|
| 01 | SQL Injection | Inyección SQL | **10.0** | Crítica |
| 02 | XSS (Reflected) | Cross-Site Scripting Reflejado | **6.1** | Media |
| 03 | Command Injection | Inyección de Comandos del Sistema | **10.0** | Crítica |

---

## 5. Impacto en el Negocio de SaludOnline

Las vulnerabilidades detectadas representan un riesgo existencial para una empresa de telemedicina:

- **Regulatorio:** Las multas por filtración de datos clínicos bajo la Ley 19.628 pueden paralizar operaciones y generar responsabilidades penales para los administradores del sistema.
- **Reputacional:** La exposición de fichas clínicas o recetas médicas destruiría la confianza de pacientes y médicos, quienes migrarían a competidores.
- **Operacional:** Un atacante con acceso al servidor puede interrumpir completamente las teleconsultas, dejando a pacientes sin atención médica urgente.
- **Financiero:** Los costos de respuesta a incidentes, notificación a afectados, demandas civiles y pérdida de contratos con isapres superarían la viabilidad financiera de la empresa.

---

## 6. Alcance y Metodología

Esta auditoría cubre los tres vectores de ataque más críticos identificados en el portal web, utilizando el marco **OWASP Top 10** como referencia y la calculadora **CVSS 3.1** del NIST para cuantificar la gravedad de cada hallazgo. Cada vulnerabilidad es analizada en tres dimensiones:

1. **Evidencia técnica:** Demostración del ataque en DVWA con captura de pantalla
2. **Análisis de impacto:** Consecuencias específicas para una empresa de telemedicina
3. **Controles propuestos:** Medidas de prevención, mitigación y recuperación
