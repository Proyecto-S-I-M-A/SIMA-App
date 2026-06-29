import type {
  RegisterPushTokenPayload,
  RegisterPushTokenResponse,
} from '@/types/PushNotification';
import { useMutation } from '@tanstack/react-query';
import { apiJson } from '../apiClient';
import { ENDPOINTS } from './endpoints';

export const useRegisterPushTokenMutation = () => {
  return useMutation({
    mutationFn: async (
      payload: RegisterPushTokenPayload,
    ): Promise<RegisterPushTokenResponse> => {
      return apiJson<RegisterPushTokenResponse>(
        ENDPOINTS.notifications.registerToken,
        {
          method: 'POST',
          body: payload,
          auth: true,
        },
      );
    },
  });
};
