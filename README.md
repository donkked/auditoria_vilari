# auditoria_vilari — Auditoría de Seguridad Web

Aplicación web que presenta una **auditoría de seguridad** del portal de clientes de **SaludOnline**, una empresa ficticia de **telemedicina**. El informe demuestra tres ataques sobre un entorno controlado (DVWA), mide su gravedad con CVSS, construye la matriz de riesgo del negocio y propone medidas de prevención, mitigación y recuperación.

> **Evaluación Sumativa N°3** — TI3034 Fundamentos de Seguridad de la Información
> INACAP Valparaíso · Docente: Rubén Schnettler
> Autor: **Ariel Villarroel** ([@donkked](https://github.com/donkked))

---

## 🔗 Enlaces

- **Repositorio:** https://github.com/donkked/auditoria_vilari
- **Sitio (Vercel):** https://auditoria-vilari.vercel.app

---

## 🏥 Caso de estudio

**SaludOnline** (rubro telemedicina) custodia información altamente sensible: fichas clínicas, recetas con medicamentos controlados, datos de videoconsultas y datos de previsión de salud. El análisis evalúa el impacto de cada vulnerabilidad **en el contexto del rubro salud** y bajo la normativa chilena (Ley 19.628, Ley 20.584).

## 🎯 Ataques demostrados (DVWA, nivel Low)

| Ataque | Payload | CVSS 3.1 |
|---|---|---|
| Inyección SQL | `' OR '1'='1` | 10.0 — Crítica |
| XSS (Reflected) | `<script>alert('XSS')</script>` | 6.1 — Media |
| Inyección de comandos | `127.0.0.1; cat /etc/passwd` | 10.0 — Crítica |

> ⚖️ **Marco ético-legal:** los ataques se realizan únicamente sobre un entorno controlado y autorizado (DVWA). Atacar sistemas ajenos sin permiso es delito (Ley 21.459). Estas técnicas se documentan con fines defensivos y educativos.

---

## 📁 Estructura

```
auditoria_vilari/
├─ docs_vilari/              # Contenido del informe (Markdown)
│  ├─ 01_resumen_vilari.md
│  ├─ 02_sqli_vilari.md
│  ├─ 03_xss_vilari.md
│  ├─ 04_comandos_vilari.md
│  ├─ 05_activos_vilari.md
│  ├─ 06_matriz_vilari.md
│  ├─ 07_controles_vilari.md
│  ├─ 08_recuperacion_vilari.md
│  ├─ 09_prompts_vilari.md   # Bitácora de uso de IA
│  └─ img_vilari/            # Capturas de los ataques
├─ public/img_vilari/        # Capturas servidas por la web
└─ src/components/           # Un componente React por sección
```

Cada archivo `.md` se renderiza mediante un componente en `src/components/`. La matriz de riesgo se representa además como un **mapa de calor visual interactivo** (`Matriz.tsx`).

## 🛠️ Stack

React · TypeScript · Vite · React Router · react-markdown · desplegado en Vercel.

## ▶️ Ejecutar en local

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción
```

## 🤖 Uso de IA

El proyecto se construyó con apoyo de **Claude Code** (Anthropic). Todo el uso de IA —prompts, qué se aceptó y qué se corrigió— está documentado de forma transparente en la bitácora [`docs_vilari/09_prompts_vilari.md`](docs_vilari/09_prompts_vilari.md). La responsabilidad técnica del análisis es del autor.
