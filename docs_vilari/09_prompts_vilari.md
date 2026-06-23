# Bitácora de Uso de Inteligencia Artificial

**Alumno:** sufijo `vilari`  
**Asignatura:** Fundamentos de Seguridad de la Información — INACAP  
**Herramienta IA utilizada:** Claude (Anthropic) — Claude Code  

---

## Nota sobre la metodología

Este proyecto se construyó de forma **iterativa** con Claude Code (extensión de VS Code) a lo largo de varias sesiones. Los prompts que transcribo a continuación **resumen** las instrucciones que fui dando en cada fase; en la práctica el trabajo fue conversacional, alternando generación asistida por IA con revisión y corrección de mi parte. Las decisiones de negocio (enfoque en telemedicina, criticidad de los activos, valoración de riesgos), la **evidencia propia** (las capturas reales de los ataques en DVWA) y la verificación final del contenido fueron mías. La responsabilidad técnica del informe es del auditor, no de la herramienta.

---

## Registro de Prompts

### Prompt 1 — Estructura y andamiaje del proyecto

**Sección:** Estructura general / `App.tsx` / 9 componentes  
**Prompt utilizado:**
> "Necesito construir una aplicación React con Vite y TypeScript para la Evaluación Sumativa N°3 de Seguridad de la Información en INACAP. La empresa asignada es SaludOnline (telemedicina, código E26) y mi sufijo es `_vilari`. Crea la estructura: 9 archivos Markdown en `docs_vilari/` (resumen, los 3 ataques, activos, matriz, controles, recuperación y bitácora), 9 componentes React en `src/components/` que rendericen cada `.md`, y un mapa de calor visual para la matriz. Todo el contenido debe reflejar el impacto en una empresa de telemedicina que custodia fichas clínicas y recetas, no un análisis genérico."

**¿Qué acepté?**
- La estructura de carpetas y la correspondencia `.md` → componente
- El esqueleto de los 9 informes y el render de Markdown con resaltado de código

**¿Qué corregí o aporté yo?**
- Definí el alcance real (SaludOnline / telemedicina) y los datos sensibles concretos del rubro (fichas clínicas, recetas de medicamentos controlados, datos de isapres)
- Decidí trabajar con commits incrementales para dejar evidencia de proceso continuo

---

### Prompt 2 — Análisis de impacto en telemedicina (SQLi)

**Sección:** `02_sqli_vilari.md` — Impacto específico en SaludOnline  
**Prompt utilizado:**
> "Para SaludOnline, que custodia fichas clínicas, recetas con medicamentos controlados y datos de videoconsultas, ¿cuáles son las consecuencias concretas de explotar una inyección SQL con `' OR '1'='1` sobre la tabla de usuarios? Quiero al menos 5 consecuencias específicas del rubro salud, no genéricas, y la regulación chilena aplicable."

**¿Qué acepté?**
- Las consecuencias específicas del dominio de salud (exfiltración de fichas, acceso a recetas de medicamentos controlados, alteración de diagnósticos)

**¿Qué corregí o aporté yo?**
- La IA tendía a citar GDPR/HIPAA (marcos extranjeros). Exigí priorizar la **Ley 19.628** y la **Ley 20.584**, que son las normas chilenas pertinentes
- Apliqué el mismo criterio de "impacto en salud" a los otros dos ataques (XSS y comandos)

---

### Prompt 3 — Defensa esperada de cada ataque

**Sección:** `02`, `03`, `04` — Política de prevención y control de mitigación  
**Prompt utilizado:**
> "Para cada uno de los tres ataques, escribe la causa raíz técnica y la defensa correcta: en SQLi quiero consultas parametrizadas (prepared statements), no solo 'validar la entrada'; en XSS quiero codificación de salida según contexto + CSP; en inyección de comandos quiero prohibir `shell_exec` con datos del usuario y usar APIs nativas. Muestra el código vulnerable y el código seguro lado a lado."

**¿Qué acepté?**
- El patrón vulnerable vs. seguro en cada caso (parametrización, `htmlspecialchars`/CSP, `escapeshellarg`/`subprocess` sin `shell=True`)

**¿Qué corregí o aporté yo?**
- Pedí explícitamente la defensa "fuerte" (parametrización), porque sé que la IA mal dirigida suele conformarse con "sanitizar la entrada", que es insuficiente

---

### Prompt 4 — Mapa de calor de la matriz de riesgo

**Sección:** `Matriz.tsx` / `06_matriz_vilari.md`  
**Prompt utilizado:**
> "Necesito un componente React en TypeScript que muestre un mapa de calor 5×5 de probabilidad × impacto, con colores verde (1–4), amarillo (5–9), naranja (10–14) y rojo (15–25). Los riesgos de SaludOnline (SQLi, ransomware, XSS, etc.) deben ubicarse como puntos sobre la matriz. Sin librerías de gráficos, solo CSS y JSX."

**¿Qué acepté?**
- La implementación del mapa de calor 5×5 con la escala de colores y el posicionamiento de los riesgos

**¿Qué corregí o aporté yo?**
- Definí yo los valores de probabilidad e impacto de cada riesgo (P×I) según el contexto del negocio
- Corregí la orientación del eje de probabilidad (mayor probabilidad arriba) y los textos de los ejes en español

---

### Prompt 5 — Plan de recuperación ante ransomware

**Sección:** `08_recuperacion_vilari.md`  
**Prompt utilizado:**
> "Diseña un procedimiento de respuesta a ransomware para SaludOnline considerando que maneja recetas activas y teleconsultas en curso. Incluye RPO y RTO por sistema crítico, la regla de backup 3-2-1 adaptada a salud, y alternativas de continuidad (recetas en papel, consultas telefónicas) cuando el sistema principal no esté disponible."

**¿Qué acepté?**
- La estructura del plan: RPO/RTO por sistema, backup 3-2-1, BCP con alternativas

**¿Qué corregí o aporté yo?**
- Ajusté el RPO de la base de datos de pacientes de 1 hora a **15 minutos**: en emergencias médicas una ficha desactualizada es tan peligrosa como no tener acceso
- Agregué la **Superintendencia de Salud** como autoridad chilena a notificar

---

### Prompt 6 — Rediseño de la presentación (portada + navbar)

**Sección:** `Home.tsx`, `Navbar.tsx`, `PageHero.tsx`, CSS  
**Prompt utilizado:**
> "Reemplaza el sidebar por una portada de inicio de una sola pantalla y un navbar superior para navegar las 9 secciones, agrupadas por Informe A (vulnerabilidades) e Informe B (matriz). Usa una paleta de ciberseguridad (azul profundo + cian/teal) y un hero temático por sección."

**¿Qué acepté?**
- La portada, el navbar superior y los heroes temáticos por sección

**¿Qué corregí o aporté yo?**
- Tengo presente que la rúbrica **no evalúa la presentación visual**; prioricé que esta fase no quitara tiempo al análisis de seguridad, que es lo que pesa en la nota

---

### Prompt 7 — Revisión de los documentos contra la rúbrica

**Sección:** Los 9 `.md` (revisión transversal)  
**Prompt utilizado:**
> "Revisa los 9 documentos de la auditoría contra la rúbrica de INACAP y dime qué falta o es inconsistente: enfoque real en telemedicina, vectores y puntajes CVSS, nomenclatura `_vilari`, rutas de las capturas, y completitud de la matriz de riesgo. No cambies nada todavía, solo lista los hallazgos."

**¿Qué acepté?**
- El diagnóstico de inconsistencias detectadas

**¿Qué corregí o aporté yo (tras revisar la lista)?**
- Unifiqué la **nomenclatura y rutas de las imágenes** (`img_vilari/sqli_vilari.png`, etc.), referenciadas de forma relativa en los `.md` y reescritas a ruta absoluta por el renderer para la web
- Completé el **mapa de calor** para que incluyera los 10 riesgos (R-01 a R-10), no solo los primeros
- Corregí la **URL del laboratorio** en el resumen para que coincidiera con el entorno real desplegado

---

### Prompt 8 — Integración de mis capturas reales de DVWA

**Sección:** `02`, `03`, `04` — Evidencia de los ataques  
**Prompt utilizado:**
> "Tomé yo mismo las capturas de los tres ataques en DVWA en nivel Low (SQLi con `' OR '1'='1`, XSS con `<script>alert('XSS')</script>` y comandos con `127.0.0.1; cat /etc/passwd`). Intégralas con los nombres `sqli_vilari.png`, `xss_vilari.png` y `comandos_vilari.png` en `docs_vilari/img_vilari/` y en `public/img_vilari/`, y verifica que se vean tanto en GitHub como en el sitio."

**¿Qué acepté?**
- La integración de las imágenes en ambas carpetas y la verificación de que el sitio las sirviera correctamente

**¿Qué aporté yo?**
- La **evidencia es propia**: las capturas las obtuve ejecutando los ataques en el DVWA del laboratorio, no son material generado por IA

---

### Prompt 9 — Auditoría de honestidad de esta misma bitácora

**Sección:** `09_prompts_vilari.md` (autocrítica)  
**Prompt utilizado:**
> "Revisa mi propia bitácora de IA: marca cualquier afirmación que diga que hice algo que en realidad no hice, y verifica que los puntajes CVSS sean correctos. Quiero que el registro sea honesto, porque la evaluación valora justamente el uso transparente de la IA."

**¿Qué acepté?**
- La verificación de que los puntajes CVSS 3.1 son correctos: **10.0** (SQLi), **6.1** (XSS) y **10.0** (inyección de comandos), consistentes con la calculadora oficial CVSS 3.1 (https://www.first.org/cvss/calculator/3.1)
- La reformulación de frases que sonaban a logros no realizados

**¿Qué corregí o aporté yo?**
- Decidí reescribir esta bitácora para que reflejara el proceso **real** (iterativo, con revisión y corrección) en lugar de un relato idealizado

---

## Reflexión Final sobre el Uso de IA

Usar Claude Code en esta evaluación fue útil sobre todo en dos frentes: **acelerar la redacción técnica** de los informes y **generar el código React** (componentes y mapa de calor) que de otro modo habría tomado horas.

**Lo que aportó la IA:**
- Borradores estructurados del análisis y código funcional, sobre los que pude iterar rápido
- Detección de inconsistencias cuando le pedí revisar el proyecto contra la rúbrica

**Lo que aportó mi criterio (y la IA no podía decidir por mí):**
- El **contexto de negocio**: por qué una misma vulnerabilidad pesa distinto en telemedicina (fichas clínicas y recetas) que en otro rubro
- La **regulación local** correcta (Ley 19.628, Ley 20.584, Superintendencia de Salud), frente a la tendencia de la IA a citar marcos extranjeros
- La **valoración de los riesgos** (probabilidad × impacto) y los objetivos de recuperación (RPO/RTO) con criterio clínico
- La **evidencia real** de los ataques, capturada por mí en DVWA
- La **verificación honesta** del propio trabajo, incluida esta bitácora

**Conclusión:**
Confirmé en la práctica lo que advierte la rúbrica: los prompts genéricos producen respuestas genéricas, y una IA mal dirigida puede proponer defensas insuficientes (p. ej. "validar la entrada" en vez de consultas parametrizadas). El valor de esta auditoría no está en lo que generó la IA, sino en dirigirla con precisión, corregir lo que entregó y contextualizarlo en el escenario real de SaludOnline. La IA fue un amplificador del trabajo del analista, no un sustituto.
