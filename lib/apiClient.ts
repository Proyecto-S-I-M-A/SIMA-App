import { API_URL } from "@/config/ApiConfig";
import { Platform } from "react-native";
import { getAccessToken, getRefreshToken, saveSessionAuth } from "./GetCookie";

type ApiFetchOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  headers?: HeadersInit;
  auth?: boolean;
  _retried?: boolean;
};

function buildUrl(path: string) {
  console.log("API_URL:", API_URL);
  if (!API_URL) {
    throw new Error(
      "API_URL no está configurada. Define 'extra.apiUrl' en app.json o EXPO_PRIVATE_API_URL y reinicia Expo"
    );
  }

  let effectiveUrl = API_URL;

  // On Android emulators, 'localhost' refers to the device. Map to host machine.
  if (Platform.OS === "android") {
    if (effectiveUrl.includes("localhost")) {
      effectiveUrl = effectiveUrl.replace(/localhost/g, "10.0.2.2");
    }
    if (effectiveUrl.includes("127.0.0.1")) {
      effectiveUrl = effectiveUrl.replace(/127\.0\.0\.1/g, "10.0.2.2");
    }
  }

  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return `${effectiveUrl}${path}`;
  return `${effectiveUrl}/${path}`;
}

function toErrorMessage(payload: any): string {
  if (!payload) return "Request failed";
  if (typeof payload === "string") return payload;
  if (typeof payload.message === "string") return payload.message;
  if (typeof payload.error === "string") return payload.error;
  if (typeof payload.details === "string") return payload.details;

  const details = payload.details;
  if (Array.isArray(details)) {
    const messages = details
      .map((d) => (typeof d?.message === "string" ? d.message : null))
      .filter(Boolean);
    if (messages.length) return messages.join("\n");
  }

  const errors = payload.errors;
  if (Array.isArray(errors)) {
    const messages = errors
      .map((e) => (typeof e?.msg === "string" ? e.msg : typeof e?.message === "string" ? e.message : null))
      .filter(Boolean);
    if (messages.length) return messages.join("\n");
  }

  return "Request failed";
}

export async function apiJson<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const url = buildUrl(path);
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth) {
    const token = await getAccessToken();
    if (!token) {
      throw new Error("No hay token de sesión; inicia sesión nuevamente");
    }
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 401 && options.auth && !options._retried) {
    const refresh = await getRefreshToken();
    if (!refresh) {
      throw new Error("No hay token de sesión; inicia sesión nuevamente");
    }

    const refreshApiResponse = await fetch(buildUrl("/auth/refresh-token"), {
      method: "POST",
      body: JSON.stringify({
        refresh_token: refresh,
        token_refresh: refresh,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!refreshApiResponse.ok) {
      throw new Error("No se pudo renovar la sesion; inicia sesion nuevamente");
    }

    const refreshResponse = await refreshApiResponse.json().catch(() => null);

    if (!refreshResponse) {
      throw new Error("Respuesta invalida al renovar la sesion");
    }

    const refreshedAccessToken = refreshResponse?.session?.access_token;
    const refreshedRefreshToken =
      refreshResponse?.session?.refresh_token ?? refreshResponse?.session?.token_refresh;
    const refreshedSessionId =
      refreshResponse?.session_id ?? refreshResponse?.session?.session_id ?? refreshResponse?.session?.id;

    if (!refreshedAccessToken || !refreshedRefreshToken) {
      throw new Error("No se recibieron tokens validos al renovar la sesion");
    }

    await saveSessionAuth({
      accessToken: refreshedAccessToken,
      refreshToken: refreshedRefreshToken,
      sessionId: refreshedSessionId,
    });

    return apiJson(path, {
      ...options,
      _retried: true,
    });
  }

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : await response.text().catch(() => null);

  if (!response.ok) {
    throw new Error(toErrorMessage(payload));
  }

  return payload as T;
}

const ApiClient = {
  apiJson,
};

export default ApiClient;
