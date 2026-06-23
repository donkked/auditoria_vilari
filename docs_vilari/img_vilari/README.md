# Capturas de los ataques — img_vilari

Aquí van las capturas de pantalla reales obtenidas de DVWA (nivel **Low**),
con el payload y el resultado visibles. Nombres exactos exigidos:

| Archivo | Ataque | Payload que debe verse |
|---|---|---|
| `sqli_vilari.png` | Inyección SQL | `' OR '1'='1` devolviendo todos los usuarios |
| `xss_vilari.png` | XSS (Reflected) | `<script>alert('XSS')</script>` ejecutándose |
| `comandos_vilari.png` | Inyección de comandos | `127.0.0.1; cat /etc/passwd` mostrando el archivo |

## Importante: las imágenes deben copiarse en DOS carpetas

1. **`docs_vilari/img_vilari/`** (esta carpeta) — para cumplir la estructura de la
   rúbrica y que las imágenes se vean al abrir los `.md` en GitHub.
2. **`public/img_vilari/`** — para que se muestren en el sitio React/Vercel.

Los `.md` referencian las capturas de forma relativa
(`![SQLi](img_vilari/sqli_vilari.png)`); el componente `MarkdownRenderer` reescribe
esa ruta a `/img_vilari/...` para servirla desde `public/` en la web.
