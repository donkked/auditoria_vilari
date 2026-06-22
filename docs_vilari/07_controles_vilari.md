# Políticas y Controles de Seguridad — SaludOnline

**Marco:** ISO/IEC 27001:2022 — Controles de Seguridad de la Información  
**Marco complementario:** NIST Cybersecurity Framework 2.0

---

## 1. Política General de Seguridad de la Información

> **POL-SGSI-01:** SaludOnline se compromete a proteger la confidencialidad, integridad y disponibilidad de la información de sus pacientes, médicos y colaboradores, en cumplimiento de la Ley N° 19.628, la Ley N° 20.584 y los estándares internacionales ISO 27001. Todos los sistemas de información deberán implementar controles de seguridad proporcionales al nivel de riesgo de los activos que custodia.

---

## 2. Políticas Específicas por Dominio

### 2.1 Control de Acceso (ISO 27001 — A.5.15, A.8.2)

| Control | Descripción | Prioridad |
|---|---|---|
| **POL-ACC-01** | Autenticación multifactor (MFA) obligatoria para médicos, especialistas y administradores del portal | Crítica |
| **POL-ACC-02** | Principio de mínimo privilegio: cada rol accede solo a los datos estrictamente necesarios para su función | Alta |
| **POL-ACC-03** | Bloqueo automático de cuenta tras 5 intentos fallidos de autenticación | Alta |
| **POL-ACC-04** | Sesiones web con tiempo de expiración de 15 minutos de inactividad | Media |
| **POL-ACC-05** | Revisión trimestral de cuentas activas y privilegios asignados | Media |

### 2.2 Seguridad de Aplicaciones (ISO 27001 — A.8.25, A.8.28)

| Control | Descripción | Prioridad |
|---|---|---|
| **POL-APP-01** | Uso obligatorio de consultas parametrizadas (prepared statements) para toda interacción con la base de datos | Crítica |
| **POL-APP-02** | Sanitización y codificación de toda salida HTML antes de renderizar datos del usuario | Crítica |
| **POL-APP-03** | Prohibición de funciones de ejecución de comandos del sistema (`exec`, `shell_exec`, `system`) con parámetros del usuario | Crítica |
| **POL-APP-04** | Implementación de Content Security Policy (CSP) en todas las páginas del portal | Alta |
| **POL-APP-05** | Revisión de seguridad (SAST/DAST) obligatoria antes de cada despliegue a producción | Alta |
| **POL-APP-06** | Gestión de dependencias: análisis de vulnerabilidades (OWASP Dependency Check) en el pipeline CI/CD | Media |

### 2.3 Cifrado y Transmisión de Datos (ISO 27001 — A.8.24)

| Control | Descripción | Prioridad |
|---|---|---|
| **POL-CIF-01** | Todo tráfico web deberá usar HTTPS con TLS 1.2 mínimo (recomendado TLS 1.3) | Crítica |
| **POL-CIF-02** | Las fichas clínicas y recetas almacenadas en base de datos deberán estar cifradas con AES-256 | Alta |
| **POL-CIF-03** | Contraseñas almacenadas exclusivamente como hash con BCrypt (factor de costo ≥ 12) o Argon2id | Crítica |
| **POL-CIF-04** | Las grabaciones de videoconsultas (si existen) deberán cifrarse en reposo con clave gestionada por HSM | Alta |

### 2.4 Gestión de Incidentes (ISO 27001 — A.5.24, A.5.25, A.5.26)

| Control | Descripción | Prioridad |
|---|---|---|
| **POL-INC-01** | Todo incidente de seguridad deberá ser reportado al CISO en un plazo máximo de 1 hora desde su detección | Alta |
| **POL-INC-02** | Los incidentes que afecten datos de pacientes deberán notificarse al CSIRT de Gobierno en un plazo máximo de 72 horas | Crítica |
| **POL-INC-03** | Se mantendrá un registro de incidentes con análisis de causa raíz y lecciones aprendidas | Media |

### 2.5 Gestión de Vulnerabilidades (ISO 27001 — A.8.8)

| Control | Descripción | Prioridad |
|---|---|---|
| **POL-VUL-01** | Escaneo automático de vulnerabilidades semanal en todos los servidores expuestos a Internet | Alta |
| **POL-VUL-02** | Parches críticos (CVSS ≥ 9.0) aplicados en un plazo máximo de 48 horas | Crítica |
| **POL-VUL-03** | Prueba de penetración anual realizada por empresa externa certificada (OSCP/CEH) | Alta |
| **POL-VUL-04** | Programa de divulgación responsable (Responsible Disclosure) publicado en el sitio web | Media |

---

## 3. Controles Técnicos Implementados

### 3.1 Defensa en Profundidad

```
Internet
    │
    ▼
[CDN + DDoS Protection]         ← Cloudflare / Akamai
    │
    ▼
[WAF — Web Application Firewall] ← Reglas OWASP Core Rule Set
    │
    ▼
[Load Balancer + TLS Termination]
    │
    ▼
[Servidor de Aplicaciones]       ← App en contenedor Docker (no root)
    │
    ▼
[Base de Datos]                  ← Acceso solo desde red interna; usuario con mínimo privilegio
    │
    ▼
[Backup Cifrado]                 ← Copia offsite + copia en frío (desconectada)
```

### 3.2 Monitoreo y Detección

| Herramienta | Propósito |
|---|---|
| SIEM (Security Information and Event Management) | Correlación de eventos de seguridad y alertas en tiempo real |
| IDS/IPS | Detección y bloqueo de tráfico malicioso en la red |
| Logs de aplicación | Registro de todas las acciones sobre fichas clínicas y recetas |
| Alertas de anomalías | Notificación cuando un médico accede a más de N fichas por hora |
| Monitoreo de integridad de archivos (FIM) | Detección de cambios no autorizados en archivos del servidor |

---

## 4. Capacitación y Concienciación

| Actividad | Audiencia | Frecuencia |
|---|---|---|
| Taller de phishing simulado | Todos los médicos y administrativos | Trimestral |
| Curso de seguridad de la información | Nuevos empleados | Al ingreso |
| Charla de actualización de amenazas | Todo el personal | Semestral |
| Capacitación de desarrollo seguro (OWASP) | Equipo de desarrollo | Anual |
