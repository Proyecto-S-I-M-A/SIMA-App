---
name: sima-response
description: "Estilo de respuesta para SIMA-App: resumen breve de cambios, sin pasos numerados ni explicaciones detalladas. Aplicar siempre al responder cambios de código."
---

# Estilo de Respuesta — SIMA-App

## Regla principal
Al completar cualquier cambio de código, responder **solo con un resumen corto** de lo que se hizo.  
**No usar listas de pasos, no explicar el proceso, no describir cada decisión.**

## Formato de respuesta

```
## Cambios

**`ruta/archivo`** — qué se hizo en una línea.
**`ruta/archivo`** — qué se hizo en una línea.
```

Si solo hay un archivo, una línea basta. Sin tablas, sin secciones extra, sin encabezados adicionales.

## Lo que NO hacer
- ❌ "Paso 1: ..., Paso 2: ..., Paso 3: ..."
- ❌ Explicar por qué se tomó cada decisión
- ❌ Repetir el código que ya aparece en los archivos
- ❌ Agregar secciones como "Arquitectura", "Convenciones", "Próximos pasos"
- ❌ Usar más de 5 líneas de texto libre

## Interacción con otras skills
- **sima-app**: seguir sus reglas de estructura (components/, hooks/, lib/) pero sin explicarlas en la respuesta.
- **sima-docs**: solo aplica cuando el usuario pide documentación explícitamente; no generar docs por defecto.
