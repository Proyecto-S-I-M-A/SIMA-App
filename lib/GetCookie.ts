
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "token_refresh";
const LEGACY_REFRESH_TOKEN_KEY = "refresh_token";
const SESSION_ID_KEY = "session_id";

async function getStoredValue(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  }

  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

async function setStoredValue(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
}

async function removeStoredValue(key: string): Promise<void> {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
    return;
  }

  await SecureStore.deleteItemAsync(key);
}

export async function readCookieStoreValue(key: string): Promise<string | null> {
  return getStoredValue(key);
}

export async function saveCookieStoreValue(key: string, value: string): Promise<void> {
  await setStoredValue(key, value);
}

export async function getAccessToken(): Promise<string | null> {
  return getStoredValue(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  const currentRefresh = await getStoredValue(REFRESH_TOKEN_KEY);
  if (currentRefresh) return currentRefresh;

  const legacyRefresh = await getStoredValue(LEGACY_REFRESH_TOKEN_KEY);
  if (legacyRefresh) {
    await setStoredValue(REFRESH_TOKEN_KEY, legacyRefresh);
    return legacyRefresh;
  }

  return null;
}

export async function getSessionId(): Promise<string | null> {
  return getStoredValue(SESSION_ID_KEY);
}

type SaveSessionParams = {
  accessToken: string;
  refreshToken: string;
  sessionId?: string | null;
};

export async function saveSessionAuth({ accessToken, refreshToken, sessionId }: SaveSessionParams): Promise<void> {
  await Promise.all([
    setStoredValue(ACCESS_TOKEN_KEY, accessToken),
    setStoredValue(REFRESH_TOKEN_KEY, refreshToken),
    setStoredValue(LEGACY_REFRESH_TOKEN_KEY, refreshToken),
    sessionId ? setStoredValue(SESSION_ID_KEY, sessionId) : Promise.resolve(),
  ]);
}

export async function clearSessionAuth(): Promise<void> {
  await Promise.all([
    removeStoredValue(ACCESS_TOKEN_KEY),
    removeStoredValue(REFRESH_TOKEN_KEY),
    removeStoredValue(LEGACY_REFRESH_TOKEN_KEY),
    removeStoredValue(SESSION_ID_KEY),
  ]);
}

const GetCookie = {
  readCookieStoreValue,
  saveCookieStoreValue,
  getAccessToken,
  getRefreshToken,
  getSessionId,
  saveSessionAuth,
  clearSessionAuth,
};

export default GetCookie;