export type NotificationType =
  | 'nueva-receta'
  | 'receta-por-expirar'
  | 'receta-retirada'
  | 'recordatorio-receta';

export interface RegisterPushTokenPayload {
  id_acceso: string;
  push_token: string;
}

export interface RegisterPushTokenResponse {
  message: string;
}

export interface SendNotificationPayload {
  id_cliente: number;
  type: NotificationType;
  data?: Record<string, unknown>;
}

export interface SendNotificationResponse {
  message: string;
  result: {
    data: Array<{
      id: string;
      status: 'ok' | 'error';
      message?: string;
    }>;
  };
}
