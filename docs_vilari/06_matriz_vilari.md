# Matriz de Riesgo — SaludOnline

**Marco:** ISO/IEC 27005:2022 — Gestión del Riesgo de Seguridad de la Información  
**Metodología:** Probabilidad × Impacto (escala 1–5)

---

## 1. Escala de Valoración

### Probabilidad (Likelihood)

| Nivel | Descripción | Criterio |
|---|---|---|
| 1 — Rara | Muy poco probable que ocurra | Menos de 1 vez en 10 años |
| 2 — Improbable | Podría ocurrir en circunstancias excepcionales | 1 vez en 5 años |
| 3 — Posible | Podría ocurrir en algún momento | 1 vez por año |
| 4 — Probable | Probablemente ocurrirá | Varias veces al año |
| 5 — Casi Seguro | Se espera que ocurra | Mensualmente o más |

### Impacto (Impact)

| Nivel | Descripción | Criterio para SaludOnline |
|---|---|---|
| 1 — Insignificante | Sin consecuencias significativas | Interrupción de servicio < 1 hora |
| 2 — Menor | Consecuencias leves gestionables | Datos no sensibles expuestos |
| 3 — Moderado | Consecuencias que requieren atención | Interrupción del servicio > 4 horas |
| 4 — Mayor | Consecuencias graves que afectan operaciones | Datos de pacientes comprometidos |
| 5 — Catastrófico | Consecuencias que amenazan la viabilidad | Filtración masiva de fichas clínicas + multas regulatorias |

### Clasificación del Riesgo

| Puntaje (P × I) | Clasificación | Acción Requerida |
|---|---|---|
| 1–4 | **Bajo** (Verde) | Aceptar; monitorear |
| 5–9 | **Medio** (Amarillo) | Tratar; plan de acción en 90 días |
| 10–14 | **Alto** (Naranja) | Tratar con urgencia; plan en 30 días |
| 15–25 | **Crítico** (Rojo) | Acción inmediata; no iniciar operaciones sin control |

---

## 2. Registro de Riesgos

| ID | Riesgo | Activo | P | I | P×I | Nivel |
|---|---|---|---|---|---|---|
| R-01 | Inyección SQL expone base de datos completa de pacientes | D-01, D-02, D-03 | 3 | 5 | **15** | Crítico |
| R-02 | Inyección de comandos permite control total del servidor | I-01, S-01 | 2 | 5 | **10** | Alto |
| R-03 | XSS permite robo de sesiones de médicos y pacientes | S-01, D-06 | 3 | 3 | **9** | Medio |
| R-04 | Ransomware cifra toda la infraestructura clínica | I-01, I-02, D-01 | 3 | 5 | **15** | Crítico |
| R-05 | Phishing roba credenciales de médicos | D-06, S-01 | 4 | 3 | **12** | Alto |
| R-06 | Acceso no autorizado a recetas digitales | D-02, S-02 | 3 | 4 | **12** | Alto |
| R-07 | Filtración de datos financieros de pacientes | D-05 | 2 | 4 | **8** | Medio |
| R-08 | Fallo en sistema de backup impide recuperación | S-06, I-05 | 2 | 4 | **8** | Medio |
| R-09 | Falla de plataforma de videoconsultas en consulta urgente | S-03 | 3 | 3 | **9** | Medio |
| R-10 | Insider vende datos de pacientes a terceros | D-01, D-03 | 2 | 5 | **10** | Alto |

---

## 3. Mapa de Calor (Matriz 5×5)

> **Visualización interactiva disponible en la sección de Matriz de Riesgo de la aplicación web.**

```
IMPACTO →
                 1-Insig.  2-Menor   3-Moder.  4-Mayor   5-Catastr.
P  5-C.Seguro  [  5-M  ] [  10-A ] [  15-C ] [  20-C ] [  25-C  ]
R  4-Probable  [  4-B  ] [   8-M ] [  12-A ] [  16-C ] [  20-C  ]
O  3-Posible   [  3-B  ] [   6-M ] [   9-M ] [  12-A ] [  15-C  ] ← R-01, R-04
B  2-Improbab. [  2-B  ] [   4-B ] [   6-M ] [   8-M ] [  10-A  ] ← R-02, R-10
A  1-Rara      [  1-B  ] [   2-B ] [   3-B ] [   4-B ] [   5-M  ]
↑

Riesgos identificados:
R-01 (P=3, I=5): Crítico  → ⬛ casilla [Posible × Catastrófico]
R-02 (P=2, I=5): Alto     → casilla [Improbable × Catastrófico]
R-03 (P=3, I=3): Medio    → casilla [Posible × Moderado]
R-04 (P=3, I=5): Crítico  → ⬛ casilla [Posible × Catastrófico]
R-05 (P=4, I=3): Alto     → casilla [Probable × Moderado]
R-06 (P=3, I=4): Alto     → casilla [Posible × Mayor]
```

---

## 4. Plan de Tratamiento de Riesgos

| ID | Riesgo | Estrategia | Control Principal | Responsable | Plazo |
|---|---|---|---|---|---|
| R-01 | Inyección SQL | **Mitigar** | Prepared statements + WAF | Jefe de TI | 7 días |
| R-02 | Iny. Comandos | **Mitigar** | Eliminar shell_exec + contenedorizar | Jefe de TI | 7 días |
| R-03 | XSS | **Mitigar** | Escape de output + CSP | Desarrollador | 14 días |
| R-04 | Ransomware | **Mitigar + Transferir** | Backups offline + seguro cyber | CISO | 30 días |
| R-05 | Phishing | **Mitigar** | MFA + capacitación | RRHH + TI | 30 días |
| R-06 | Acceso recetas | **Mitigar** | Control de acceso basado en roles | Desarrollador | 14 días |
| R-07 | Datos financieros | **Mitigar** | Cifrado TLS + tokenización | Jefe de TI | 30 días |
| R-08 | Fallo backup | **Mitigar** | Verificación automática de backups | Jefe de TI | 14 días |
| R-09 | Fallo plataforma | **Mitigar** | Redundancia y failover | Infraestructura | 60 días |
| R-10 | Insider | **Mitigar + Detectar** | Auditoría de accesos + DLP | CISO + RRHH | 30 días |
