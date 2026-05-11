---
name: sima-docs
description: "Use when: crear o actualizar documentacion del proyecto SIMA-App; incluir instalacion, configuracion, rutas, estructura, tecnologias, y referencias a archivos/funciones clave."
---

# SIMA-App Documentation Skill

## Objetivo
Generar y mantener documentacion clara y practica del proyecto SIMA-App, enfocada en onboarding, configuracion de entorno, rutas, estructura del codigo y puntos clave de desarrollo/contribucion.

## Contexto del proyecto (extraer y mantener actualizado)
- Stack principal: Expo + React Native + TypeScript + expo-router + TanStack React Query.
- Entrypoint: `expo-router/entry` (ver package.json).
- Config Expo: app.json (plugins, extra, splash, assets, typedRoutes).
- API base: `extra.apiUrl` en app.json o `EXPO_PRIVATE_API_URL` (ver lib/apiClient.ts y config/ApiConfig.ts).
- Almacenamiento seguro: expo-secure-store (ver lib/GetCookie.ts).

## Contenido minimo de la documentacion
1. **Resumen del proyecto**
   - Que es SIMA-App y a que problema responde (si aplica, usar descripcion del repo).

2. **Instalacion y ejecucion**
   - `npm install`
   - `npx expo start`
   - Scripts utiles: `npm run android`, `npm run ios`, `npm run web`, `npm run lint`.

3. **Configuracion**
   - API base en app.json: `expo.extra.apiUrl`.
   - Alternativa de entorno: `EXPO_PRIVATE_API_URL` (requiere reiniciar Expo).
   - Consideraciones Android emulator: localhost -> 10.0.2.2 (ver lib/apiClient.ts).

4. **Rutas (expo-router)**
   - app/index.tsx: login (ruta `/`).
   - app/(tabs)/home/index.tsx: home (ruta `/(tabs)/home`).
   - app/_layout.tsx: Stack y providers (React Query + StatusBar).

5. **Estructura del proyecto**
   - app/: pantallas y layouts (ruteo por archivos).
   - components/: UI reusable.
   - hooks/: logica de pagina (ej. hooks/useHome.ts).
   - lib/: cliente API, queries, helpers de auth.
   - lib/api/: queries por dominio.
   - constants/: tema/paleta.
   - types/: modelos/DTOs.
   - config/: configuracion de API.
   - assets/: imagenes e iconos.

6. **Archivos y funciones clave**
   - lib/apiClient.ts: `apiJson()` para llamadas HTTP con refresh token.
   - lib/Query.ts: hooks de mutacion (login, signup, create cliente/usuario).
   - lib/api/*: hooks de consulta por dominio.
   - lib/GetCookie.ts: `getAccessToken`, `getRefreshToken`, `saveSessionAuth`, `clearSessionAuth`.
   - hooks/useHome.ts: agregados para dashboard/home.
   - constants/theme.ts: paleta de colores.

7. **Guia de contribucion**
   - Respetar tipado estricto y los tipos en `types/`.
   - Preferir hooks en `hooks/` para logica de pantallas.
   - Mantener componentes en `components/` con su `style.ts`.
   - Usar `apiJson()` y los hooks de `lib/api` para llamadas remotas.

## Reglas de actualizacion
- Mantener consistencia con el ruteo de expo-router.
- Sincronizar nombres y paths con la estructura real.
- Documentar nuevas pantallas, queries y endpoints cuando se agreguen.

## Output recomendado
- README.md o docs/README.md con secciones numeradas.
- Ejemplos de comandos en bloques de codigo.
- Enlaces a archivos clave cuando aplique.
