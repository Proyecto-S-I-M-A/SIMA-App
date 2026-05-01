import { API_URL } from "~/config/ApiConfig";
import { getAccessToken, getRefreshToken, saveCookieStoreValue } from "./GetCookie";

type ApiFetchOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  headers?: HeadersInit;
  auth?: boolean;
};

function buildUrl(path: string) {
  if (!API_URL) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return `${API_URL}${path}`;
  return `${API_URL}/${path}`;
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

  if(response.status === 401) {
    const refresh = await getRefreshToken();
    if (!refresh) {
      throw new Error("No hay token de sesión; inicia sesión nuevamente");
    }
    const refreshResponse = await fetch(buildUrl("/auth/refresh-token"), {
      method: "POST",
      body: JSON.stringify({ refresh_token: refresh }),
      headers: { "Content-Type": "application/json" },
    }).then(res => res.json());

    if (refreshResponse?.session?.access_token) {
      await saveCookieStoreValue("token", refreshResponse.session.access_token);
      await saveCookieStoreValue("refresh_token", refreshResponse.session.refresh_token);
      return apiJson(path, options);
    }
  }

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : await response.text().catch(() => null);

  if (!response.ok) {
    throw new Error(toErrorMessage(payload));
  }

  return payload as T;
}
