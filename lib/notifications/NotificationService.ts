import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { readCookieStoreValue, saveCookieStoreValue } from '@/lib/GetCookie';

const PUSH_REGISTRATION_KEY = 'push_registration';

type PushRegistration = {
  id_acceso: string;
  push_token: string;
};

// Configure foreground notification behavior — runs at module import time
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function setupAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;

  await Notifications.setNotificationChannelAsync('default', {
    name: 'Notificaciones SIMA',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
  });
}

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function getExpoPushToken(): Promise<string | null> {
  try {
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId as string | undefined;
    const result = await Notifications.getExpoPushTokenAsync({ projectId });
    return result.data;
  } catch {
    return null;
  }
}

export async function getStoredRegistration(): Promise<PushRegistration | null> {
  const raw = await readCookieStoreValue(PUSH_REGISTRATION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PushRegistration;
  } catch {
    return null;
  }
}

export async function storeRegistration(
  id_acceso: string,
  push_token: string,
): Promise<void> {
  const registration: PushRegistration = { id_acceso, push_token };
  await saveCookieStoreValue(PUSH_REGISTRATION_KEY, JSON.stringify(registration));
}
