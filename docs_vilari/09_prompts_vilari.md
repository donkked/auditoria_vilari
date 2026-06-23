# Bitácora de Uso de Inteligencia Artificial

**Alumno:** sufijo `vilari`  
**Asignatura:** Fundamentos de Seguridad de la Información — INACAP  
**Herramienta IA utilizada:** Claude (Anthropic) — Claude Code v4.6  

---

## Registro de Prompts

### Prompt 1 — Estructuración del proyecto

**Sección:** Estructura general del proyecto / App.tsx  
**Herramienta:** Claude Code (VS Code Extension)  
**Prompt utilizado:**
> "Necesito construir una aplicación React con Vite y TypeScript para la Evaluación Sumativa N°3 de Seguridad de la Información en INACAP. La empresa asignada es SaludOnline (telemedicina, código E26). El sufijo personal es `_vilari`. Necesito: 9 archivos Markdown en `docs_vilari/`, 9 componentes React en `src/components/`, un App.tsx con una portada de inicio y un navbar superior de navegación, un mapa de calor visual para la matriz de riesgo, y que cada cambio tenga su commit. El contenido debe reflejar el impacto real en una empresa de telemedicina que custodia fichas clínicas y recetas."

**¿Qué acepté de la respuesta?**
- La estructura completa de carpetas propuesta (`docs_vilari/`, `docs_vilari/img_vilari/`, `public/img_vilari/`, `src/components/`)
- Los 9 archivos Markdown con contenido académico detallado
- Los scores CVSS 3.1 calculados para cada vulnerabilidad
- El navbar superior con agrupación por Informe A e Informe B
- El mapa de calor interactivo para la matriz de riesgo

**¿Qué corregí o adapté?**
- Verifiqué los cálculos CVSS manualmente con la calculadora oficial del NIST (https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator) para confirmar que los vectores eran correctos
- Tomé mis propias capturas de pantalla de los tres ataques en DVWA y las incorporé en `docs_vilari/img_vilari/` y `public/img_vilari/` (referenciadas de forma relativa en los `.md`)
- Ajusté los nombres de los médicos ficticios y detalles de la empresa según el contexto del ramo

---

### Prompt 2 — Análisis de impacto en telemedicina

**Sección:** 02_sqli_vilari.md — Impacto específico en SaludOnline  
**Herramienta:** Claude Code  
**Prompt utilizado:**
> "Para SaludOnline, una empresa de telemedicina que custodia fichas clínicas, recetas con medicamentos controlados y datos de videoconsultas, ¿cuáles son las consecuencias específicas de que un atacante explote una inyección SQL con `' OR '1'='1` sobre la tabla de usuarios? Necesito al menos 5 consecuencias concretas vinculadas al rubro salud, no genéricas."

**¿Qué acepté de la respuesta?**
- Las 5 consecuencias específicas del dominio de salud (exfiltración de fichas, acceso a recetas de medicamentos controlados, modificación de diagnósticos, etc.)
- La referencia a la Ley 19.628 como marco regulatorio chileno aplicable

**¿Qué corregí o adapté?**
- La IA inicialmente mencionó GDPR (regulación europea) como principal normativa. Lo corregí para priorizar la Ley 19.628 y la Ley 20.584, que son las normas chilenas pertinentes
- Reordené las consecuencias de mayor a menor gravedad

---

### Prompt 3 — Mapa de calor de la matriz de riesgo

**Sección:** Matriz.tsx / 06_matriz_vilari.md  
**Herramienta:** Claude Code  
**Prompt utilizado:**
> "Necesito un componente React en TypeScript que muestre un mapa de calor 5x5 de probabilidad por impacto. Las celdas deben tener colores: verde (1-4), amarillo (5-9), naranja (10-14), rojo (15-25). Los riesgos de SaludOnline (inyección SQL, ransomware, XSS, etc.) deben aparecer como puntos sobre el mapa con tooltip descriptivo. Sin librería externa de gráficos, solo CSS y JSX."

**¿Qué acepté de la respuesta?**
- La implementación completa del mapa de calor con colores RAGB (Rojo/Ámbar/Verde)
- La lógica de posicionamiento de los puntos de riesgo usando CSS `position: absolute`
- El sistema de tooltips con hover

**¿Qué corregí o adapté?**
- Ajusté los colores para mejor contraste de accesibilidad (los originales eran demasiado saturados)
- Corregí el orden del eje Y: la probabilidad más alta debe estar en la parte superior del mapa (el eje estaba invertido)
- Agregué los labels de los ejes en español

---

### Prompt 4 — Plan de recuperación ante ransomware

**Sección:** 08_recuperacion_vilari.md  
**Herramienta:** Claude Code  
**Prompt utilizado:**
> "Para SaludOnline (telemedicina), diseña un procedimiento paso a paso de respuesta a ransomware considerando que el sistema maneja prescripciones médicas activas y teleconsultas en curso. Incluye los objetivos RPO y RTO para cada sistema crítico, la regla de backup 3-2-1 adaptada a salud, y las alternativas de continuidad cuando el sistema principal no está disponible (ej. recetas en papel, consultas telefónicas)."

**¿Qué acepté de la respuesta?**
- Los valores RPO/RTO diferenciados por sistema (15 min para DB de pacientes, 1h para recetas, etc.)
- La estrategia de backup 3-2-1 con cronograma
- Las alternativas de continuidad (recetas en papel, redirección a consultas telefónicas)

**¿Qué corregí o adapté?**
- La IA sugirió un RPO de 1h para la base de datos de pacientes. Lo cambié a 15 minutos porque en emergencias médicas, una ficha clínica desactualizada puede ser tan peligrosa como no tener acceso
- Agregué la referencia explícita a la Superintendencia de Salud como autoridad competente a notificar en Chile

---

## Reflexión Final sobre el Uso de IA

El uso de Claude como asistente en esta evaluación fue productivo en dos áreas principales: la generación del esqueleto del análisis técnico y la implementación del código React.

**Valor agregado de la IA:**
- Aceleró significativamente la redacción técnica de los informes, permitiendo enfocar el tiempo en el análisis crítico más que en la escritura
- Generó código React funcional y bien estructurado para el mapa de calor que habría tomado horas desarrollar desde cero

**Limitaciones y correcciones necesarias:**
- La IA tiende a generalizar hacia marcos internacionales (GDPR, HIPAA) antes que la normativa local chilena. Requirió corrección activa para centrar el análisis en la Ley 19.628 y Ley 20.584
- Los valores de RPO/RTO iniciales eran conservadores para el sector salud; fue necesario ajustarlos con criterio clínico
- Los prompts genéricos producen respuestas genéricas. Los prompts que nombran la empresa, el tipo de dato (fichas clínicas, recetas) y la regulación aplicable producen análisis mucho más precisos y útiles

**Conclusión:**
La IA es una herramienta de amplificación del trabajo del analista, no un sustituto. El valor de esta auditoría no está en lo que generó la IA, sino en el juicio crítico aplicado para seleccionar, corregir y contextualizar cada hallazgo en el escenario real de SaludOnline.
