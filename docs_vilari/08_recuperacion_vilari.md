# Plan de Recuperación ante Desastres (DR) y Mejoras

**Empresa:** SaludOnline (Telemedicina)  
**Marco:** ISO/IEC 22301:2019 — Continuidad del Negocio  
**Complemento:** NIST SP 800-34 — Guía de Planificación de Contingencias

---

## 1. Objetivos de Recuperación

Los objetivos de recuperación definen cuánta pérdida de datos y tiempo de inactividad es tolerable para SaludOnline en cada categoría de sistema.

| Sistema | RPO (Recovery Point Objective) | RTO (Recovery Time Objective) | Justificación |
|---|---|---|---|
| Base de datos de pacientes (D-01) | **15 minutos** | **1 hora** | Datos clínicos críticos; médicos necesitan acceso en consultas urgentes |
| Sistema de prescripciones (S-02) | **1 hora** | **2 horas** | Las recetas activas deben estar disponibles para dispensación en farmacias |
| Portal web de pacientes (S-01) | **4 horas** | **4 horas** | Teleconsultas pueden reprogramarse si el fallo no es extendido |
| Plataforma de videoconsultas (S-03) | **1 hora** | **2 horas** | Consultas urgentes no pueden esperar más de 2 horas |
| Registros de auditoría (D-07) | **24 horas** | **8 horas** | Necesarios para investigación forense post-incidente |

---

## 2. Estrategia de Backup

### 2.1 Política de Respaldo (Regla 3-2-1)

La estrategia sigue la regla **3-2-1**:
- **3** copias de los datos (producción + 2 backups)
- **2** tipos de medios o ubicaciones diferentes
- **1** copia **offsite** (fuera de las instalaciones principales)

| Tipo | Frecuencia | Retención | Ubicación | Cifrado |
|---|---|---|---|---|
| Backup incremental | Cada 15 minutos | 7 días | Cloud (región secundaria) | AES-256 |
| Backup completo diario | Diario 02:00 AM | 30 días | Cloud (región secundaria) | AES-256 |
| Backup semanal | Domingo 03:00 AM | 12 semanas | Cinta física offsite | AES-256 |
| Backup mensual | Día 1 de cada mes | 12 meses | Almacenamiento en frío (S3 Glacier) | AES-256 |

### 2.2 Verificación de Backups

- **Prueba automática de restauración:** ejecutada semanalmente en entorno de staging
- **Prueba completa de DR:** realizada trimestralmente con el equipo completo
- **Alerta:** si un backup falla, se notifica inmediatamente al jefe de TI por SMS y correo

---

## 3. Plan de Respuesta a Incidentes

### 3.1 Fases de Respuesta (basado en NIST SP 800-61)

```
DETECTAR → CONTENER → ERRADICAR → RECUPERAR → POST-INCIDENTE
```

### 3.2 Procedimiento por Tipo de Incidente

#### Escenario A: Brecha de datos (SQLi o Command Injection)

| Fase | Tiempo | Acciones |
|---|---|---|
| **Detección** | T+0 | SIEM genera alerta por volumen anormal de consultas SQL / spawn de procesos inusuales |
| **Contención** | T+0 a T+1h | Desconectar servidor de Internet; bloquear IPs atacantes en WAF; invalidar todas las sesiones activas |
| **Evaluación** | T+1h a T+4h | Determinar qué datos fueron accedidos; tomar snapshot forense del servidor antes de cualquier cambio |
| **Notificación** | T+4h a T+24h | Notificar al CSIRT de Gobierno; preparar comunicación a pacientes afectados |
| **Erradicación** | T+24h a T+72h | Aplicar parche; reconstruir servidor desde imagen base si fue comprometido |
| **Recuperación** | T+72h | Restaurar servicios con monitoreo intensificado durante 30 días |
| **Post-incidente** | T+2 semanas | Análisis de causa raíz; actualización del plan de IR; lecciones aprendidas |

#### Escenario B: Ransomware

| Fase | Tiempo | Acciones |
|---|---|---|
| **Detección** | T+0 | Alerta por FIM detecta cifrado masivo de archivos; llamadas anómalas de ransom note |
| **Contención** | T+0 a T+30min | **Apagar inmediatamente** todos los servidores comprometidos; desconectar la red; aislar backups en frío |
| **Evaluación** | T+30min a T+2h | Identificar la variante del ransomware; verificar si los backups están intactos |
| **Decisión** | T+2h | **No pagar el rescate** (no garantiza recuperación); activar Plan B de recuperación |
| **Recuperación** | T+2h a T+24h | Reconstruir infraestructura desde cero usando backups en frío; priorizar DB de pacientes y prescripciones |
| **Comunicación** | T+4h | Activar protocolo de comunicación de crisis; informar a la Superintendencia de Salud |

---

## 4. Plan de Continuidad del Negocio (BCP)

### 4.1 Actividades Críticas y Alternativas

| Actividad Crítica | Alternativa Temporal |
|---|---|
| Teleconsultas por videollamada | Redirigir a consultas telefónicas; usar plataformas externas (Zoom, Teams) bajo NDA |
| Acceso a fichas clínicas | Acceso de emergencia a backup en modo solo lectura desde dispositivo seguro del médico |
| Emisión de recetas digitales | Recetas en papel firmadas manualmente; coordinación con farmacias para protocolo de emergencia |
| Pagos en línea | Pago presencial o transferencia bancaria manual durante el período de recuperación |

### 4.2 Árbol de Comunicaciones de Crisis

```
CTO/CISO
    ├── Jefe de TI → Equipo técnico de recuperación
    ├── Gerente General → Comunicación a la junta directiva
    ├── Gerente Comercial → Comunicación a clientes corporativos (isapres, clínicas)
    └── Asesor Legal → CSIRT Gobierno + Superintendencia de Salud + comunicación pública
```

---

## 5. Mejoras de Seguridad Propuestas

### 5.1 Mejoras Inmediatas (0-30 días)

| Mejora | Costo Estimado | Prioridad |
|---|---|---|
| Implementar prepared statements en toda la aplicación | Bajo (horas de desarrollo) | **Crítica** |
| Activar HTTPS con HSTS y TLS 1.3 | Bajo (configuración) | **Crítica** |
| Configurar HTTPOnly y SameSite en cookies de sesión | Bajo (configuración) | Alta |
| Implementar MFA para cuentas de médicos | Medio (servicio OTP) | **Crítica** |
| Activar WAF con reglas OWASP CRS | Medio (servicio cloud) | Alta |

### 5.2 Mejoras a Mediano Plazo (30-90 días)

| Mejora | Costo Estimado | Prioridad |
|---|---|---|
| Contenedorización de la aplicación (Docker + Kubernetes) | Alto (arquitectura) | Alta |
| Implementar SIEM para correlación de eventos | Alto (licencia + configuración) | Alta |
| Prueba de penetración externa (ethical hacking) | Medio (servicio externo) | Alta |
| Cifrado de fichas clínicas en reposo (AES-256) | Medio (desarrollo) | Alta |
| Programa de capacitación anti-phishing para médicos | Bajo (plataforma e-learning) | Media |

### 5.3 Mejoras a Largo Plazo (90-180 días)

| Mejora | Costo Estimado | Prioridad |
|---|---|---|
| Certificación ISO 27001 | Alto (consultoría + auditoría) | Alta |
| Implementar Zero Trust Network Access (ZTNA) | Alto (arquitectura) | Media |
| Programa de Bug Bounty (divulgación responsable) | Bajo (plataforma) | Media |
| SOC (Security Operations Center) 24/7 | Muy Alto (equipo o outsourcing) | Media |

---

## 6. Lecciones Aprendidas de los Ataques Demostrados

| Vulnerabilidad | Lección Principal |
|---|---|
| Inyección SQL | Un solo campo sin sanitizar puede exponer la base de datos completa. La validación de entrada no basta: se necesitan prepared statements en toda la capa de datos. |
| XSS Reflejado | La confianza en el usuario es el enemigo. Todo dato que sale hacia el navegador es potencialmente peligroso, incluso si "solo muestra texto". |
| Inyección de Comandos | La regla de oro: **nunca pasar datos del usuario a funciones que ejecutan código**. Si se necesita interacción con el sistema, usar APIs del lenguaje, no el shell. |
| Conclusión general | La seguridad no es un producto que se compra, sino un proceso continuo. Un DVWA en nivel "Low" representa el estado de miles de aplicaciones en producción hoy. |
