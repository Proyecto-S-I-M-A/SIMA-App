# SIMA-App

SIMA-App (Sistema Inteligente de Medicacion Asistida) es una app movil creada con Expo y React Native. Usa ruteo por archivos con expo-router y React Query para consumo de API.

## Tecnologia

- Expo + React Native + TypeScript
- expo-router para rutas
- TanStack React Query para estado remoto
- expo-secure-store para sesion

## Instalacion y ejecucion

1. Instalar dependencias

   ```bash
   npm install
   ```

2. Iniciar la app

   ```bash
   npx expo start
   ```

Scripts utiles (ver [package.json](package.json)):

- `npm run android`
- `npm run ios`
- `npm run web`
- `npm run lint`

## Configuracion

- API base en [app.json](app.json): `expo.extra.apiUrl`.
- Alternativa por entorno: `EXPO_PRIVATE_API_URL` (reinicia Expo).
- En emulador Android, `localhost` y `127.0.0.1` se mapean a `10.0.2.2` (ver [lib/apiClient.ts](lib/apiClient.ts)).

## Rutas principales (expo-router)

- Login: [app/index.tsx](app/index.tsx) (ruta `/`).
- Home: [app/(tabs)/home/index.tsx](app/(tabs)/home/index.tsx) (ruta `/(tabs)/home`).
- Stack y providers: [app/_layout.tsx](app/_layout.tsx).

## Estructura del proyecto

- [app/](app/) pantallas y layouts (ruteo por archivos).
- [components/](components/) UI reusable.
- [hooks/](hooks/) logica de paginas.
- [lib/](lib/) cliente API, auth y helpers.
- [lib/api/](lib/api/) queries por dominio.
- [constants/](constants/) tema y paleta.
- [types/](types/) modelos y DTOs.
- [config/](config/) configuracion de API.
- [assets/](assets/) imagenes e iconos.

## Archivos y funciones clave

- [lib/apiClient.ts](lib/apiClient.ts): `apiJson()` y refresh token.
- [config/ApiConfig.ts](config/ApiConfig.ts): lectura de `apiUrl`.
- [lib/GetCookie.ts](lib/GetCookie.ts): `getAccessToken`, `getRefreshToken`, `saveSessionAuth`, `clearSessionAuth`.
- [lib/Query.ts](lib/Query.ts): hooks de mutacion (login, signup, crear cliente/usuario).
- [lib/api/](lib/api/): hooks de consulta por dominio.
- [hooks/useHome.ts](hooks/useHome.ts): agregados para home.
- [constants/theme.ts](constants/theme.ts): paleta de colores.

## Guia de contribucion

- Mantener el tipado estricto y los tipos en [types/](types/).
- Poner la logica de pantalla en [hooks/](hooks/) y UI en [components/](components/).
- Usar `apiJson()` y los hooks de [lib/api/](lib/api/) para llamadas remotas.
- Documentar nuevas pantallas, queries y endpoints al agregarlos.
