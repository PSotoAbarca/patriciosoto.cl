# Buenas Prácticas — Artículos MDX

## Frontmatter obligatorio

Cada archivo `.mdx` **debe** comenzar con este bloque:

```yaml
---
title: "Título completo del artículo"
date: "2026-03-12"
excerpt: "Resumen de 1-2 líneas que aparece en la card y en redes sociales."
tag: "Energía"
linkedinUrl: "https://www.linkedin.com/posts/patricio-soto-abarca_..."
---
```

### Tags disponibles
Usa uno de estos tags para mantener consistencia:
- `Energía`
- `Estrategia`
- `Regulación`
- `Mercados`
- `Renovables`
- `Riesgos`
- `Digitalización`

---

## Convenciones de slug (nombre del archivo)

El nombre del archivo `.mdx` se convierte automáticamente en la URL del artículo.

### Reglas:
- ✅ Solo minúsculas
- ✅ Palabras separadas por guiones `-`
- ✅ Sin tildes ni caracteres especiales
- ✅ Sin espacios
- ✅ Máximo ~60 caracteres

### Ejemplos correctos:
```
desafios-sistema-electrico-100-renovable.mdx
→ patriciosotoa.com/columna/desafios-sistema-electrico-100-renovable

regulacion-mercados-electricos-chile-2026.mdx
→ patriciosotoa.com/columna/regulacion-mercados-electricos-chile-2026

gestion-riesgos-energia-solar-volatilidad.mdx
→ patriciosotoa.com/columna/gestion-riesgos-energia-solar-volatilidad
```

---

## Uso de imágenes

### Guardar la imagen
Copia la infografía a `public/columna/`:
```bash
cp ~/LinkedIn/posts/2026-03-12_titulo/infographic_post1.png \
   ~/Desktop/patriciosoto/public/columna/nombre-descriptivo.png
```

### Insertar en el artículo
```mdx
![Descripción accesible de la imagen](/columna/nombre-descriptivo.png)
```

### Buenas prácticas de imágenes:
- Nombre descriptivo (no `IMG_001.png` sino `desafios-electricos-infografia.png`)
- Formato PNG o JPG (no HEIC ni WEBP sin verificar)
- Incluir siempre texto alternativo descriptivo entre `[ ]`
- Tamaño recomendado: máximo 1200px de ancho

---

## Enlace al post de LinkedIn

Para vincular el artículo web con el post de LinkedIn, incluye `linkedinUrl` en el frontmatter y úsalo en el cuerpo del texto:

```mdx
---
linkedinUrl: "https://www.linkedin.com/posts/patricio-soto-abarca_..."
---

Este artículo es la versión ampliada de un análisis que publiqué en
[LinkedIn](https://www.linkedin.com/posts/patricio-soto-abarca_...).
```

---

## Estructura recomendada del artículo

```mdx
---
title: "Título"
date: "2026-03-12"
excerpt: "Resumen."
tag: "Energía"
linkedinUrl: "https://linkedin.com/..."
---

Párrafo introductorio que enganche al lector. 2-3 oraciones máximo.

## Contexto

Explica el por qué del tema. ¿Cuál es el problema o la situación actual?

## [Subtema 1]

Desarrollo del primer punto clave.

![Descripción](/columna/imagen.png)

## [Subtema 2]

Desarrollo del segundo punto clave.

## Conclusión

Síntesis y llamado a la reflexión o acción.

---

*¿Tienes preguntas sobre este tema? [Escríbeme](/contacto).*
```

---

## Checklist antes de publicar

- [ ] Frontmatter completo (title, date, excerpt, tag)
- [ ] Slug descriptivo sin caracteres especiales
- [ ] Imágenes copiadas a `public/columna/` con nombres descriptivos
- [ ] Texto alternativo en todas las imágenes
- [ ] Artículo revisado (ortografía, coherencia)
- [ ] `npm run build` sin errores antes del push
- [ ] `git push` y verificar deploy en Vercel
- [ ] Comentar en LinkedIn con el link al artículo
