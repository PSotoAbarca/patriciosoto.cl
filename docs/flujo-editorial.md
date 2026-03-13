# Flujo Editorial — Publicar un artículo

## Flujo completo: LinkedIn → Web

### Paso 1: Generar el briefing desde el pipeline
El pipeline de LinkedIn genera un `briefing.md` en la carpeta del post (ej: `~/LinkedIn/posts/2026-03-12_titulo/briefing.md`).

### Paso 2: Crear el archivo MDX
1. Copia el contenido del briefing
2. Crea un nuevo archivo en `content/columna/` con formato:
   ```
   content/columna/[slug].mdx
   ```
   El slug es el identificador de la URL, por ejemplo:
   - `desafios-sistema-electrico-100-renovable.mdx` → `patriciosotoa.com/columna/desafios-sistema-electrico-100-renovable`

### Paso 3: Agregar el frontmatter
Al inicio de cada archivo `.mdx` SIEMPRE debes incluir:

```yaml
---
title: "¿Estamos preparados para un sistema eléctrico 100% renovable?"
date: "2026-03-12"
excerpt: "Una mirada desde la ingeniería de sistemas eléctricos sobre los 4 desafíos clave de la transición energética."
tag: "Energía"
linkedinUrl: "https://www.linkedin.com/posts/patricio-soto-abarca_..."
---
```

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| `title` | ✅ | Título completo del artículo |
| `date` | ✅ | Fecha en formato `YYYY-MM-DD` |
| `excerpt` | ✅ | Resumen de 1-2 líneas (aparece en la card) |
| `tag` | ✅ | Categoría (ej: Energía, Estrategia, Regulación, Mercados) |
| `linkedinUrl` | ⬜ | URL del post original en LinkedIn |

### Paso 4: Agregar imágenes (infografías)
Si el artículo tiene infografías:
1. Copia el archivo a `public/columna/`
2. Referencia en el MDX:
   ```mdx
   ![Desafíos del sistema eléctrico renovable](/columna/nombre-imagen.png)
   ```

### Paso 5: Publicar
```bash
cd ~/Desktop/patriciosoto
git add .
git commit -m "new: Título del artículo"
git push
```

Vercel detecta el push y publica en ~30 segundos.

### Paso 6: Comentar en LinkedIn
Una vez publicado, copia la URL del artículo:
```
patriciosotoa.com/columna/[slug]
```

Y pega en los comentarios del post de LinkedIn:

> 📖 **Versión ampliada disponible en mi web**
>
> Para quienes quieran profundizar, publiqué el artículo completo con análisis detallado.
>
> 👉 patriciosotoa.com/columna/[slug]

---

## Convenciones de slug

- Solo letras minúsculas, números y guiones
- Sin tildes ni caracteres especiales
- Descriptivo pero conciso
- Ejemplos:
  - ✅ `desafios-sistema-electrico-100-renovable`
  - ✅ `regulacion-mercados-electricos-chile-2026`
  - ❌ `artículo_nuevo` (tiene tilde y guión bajo)
  - ❌ `post1` (no es descriptivo)

---

## Estructura MDX recomendada

```mdx
---
title: "Título del artículo"
date: "2026-03-12"
excerpt: "Resumen breve para la card."
tag: "Energía"
linkedinUrl: "https://linkedin.com/..."
---

## Introducción

Párrafo introductorio...

## Sección 1

Contenido...

![Descripción imagen](/columna/imagen.png)

## Conclusión

Cierre del artículo...

---

*¿Tienes preguntas sobre este tema? [Escríbeme](/contacto).*
```
