import { useRegisterPushTokenMutation } from '@/lib/api/QueryNotification';
import {
  getExpoPushToken,
  getStoredRegistration,
  requestNotificationPermissions,
  setupAndroidChannel,
  storeRegistration,
} from '@/lib/notifications/NotificationService';
import type { Subscription } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useRef } from 'react';

/**
 * @param idAcceso - id_acceso (UUID) from the acceso table, linked to the cliente
 * @param serverPushToken - push_token currently stored in the clientes table (null = not registered yet)
 */
export default function useNotifications(
  idAcceso: string | undefined,
  serverPushToken: string | null | undefined,
) {
  const { mutateAsync: registerToken } = useRegisterPushTokenMutation();
  const notificationListener = useRef<Subscription | null>(null);
  const responseListener = useRef<Subscription | null>(null);

  const registerPushToken = useCallback(async () => {
    if (!idAcceso) return;

    await setupAndroidChannel();

    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return;

    const expoPushToken = await getExpoPushToken();
    if (!expoPushToken) return;

    // Check local cache first to avoid unnecessary API calls
    const stored = await getStoredRegistration();
    const localMatch =
      stored?.id_acceso === idAcceso && stored?.push_token === expoPushToken;

    // Check server state: register if client has no token or it's outdated
    const serverMatch = Boolean(serverPushToken) && serverPushToken === expoPushToken;

    if (localMatch && serverMatch) return;

    try {
      await registerToken({ id_acceso: idAcceso, push_token: expoPushToken });
      await storeRegistration(idAcceso, expoPushToken);
    } catch {
      // Non-critical: will retry on next app launch
    }
  }, [idAcceso, serverPushToken, registerToken]);

  useEffect(() => {
    void registerPushToken();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((_notification) => {
        // Foreground notification — expo-notifications shows the alert automatically
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((_response) => {
        // User tapped notification — add navigation/deep-link logic here if needed
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [registerPushToken]);
}
