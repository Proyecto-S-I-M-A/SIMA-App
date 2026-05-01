

export async function readCookieStoreValue(key: string): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const anyWindow = window as any;
  if (!anyWindow.cookieStore?.get) return null;
  try {
    const cookie = await anyWindow.cookieStore.get(key);
    return cookie?.value ?? null;
  } catch {
    return null;
  }
}

export async function getAccessToken(): Promise<string | null> {
  const fromCookieStore = await readCookieStoreValue("token");
  if (fromCookieStore) return fromCookieStore;

  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export async function getRefreshToken(): Promise<string | null> {
  const fromCookieStore = await readCookieStoreValue("refresh_token");
  if (fromCookieStore) return fromCookieStore;

  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

export async function saveCookieStoreValue(key: string, value: string) {
  if (typeof window === "undefined") return;
  const anyWindow = window as any;
  if (anyWindow.cookieStore?.set) {
    try {
      await anyWindow.cookieStore.set({ name: key, value, path: "/" });
    } catch {
      // Ignore errors
    }
  }
}