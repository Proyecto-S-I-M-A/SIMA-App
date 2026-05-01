import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Debe ser un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export type LoginData = z.infer<typeof LoginSchema>;

export const LoginResponse = z.object({
  message: z.string(),
  session_id: z.string().optional(),
  session: z.object({
    id: z.string().optional(),
    session_id: z.string().optional(),
    user: z.object({
      id: z.string(),
      email: z.email(),
    }),
    access_token: z.string(),
    refresh_token: z.string().optional(),
    token_refresh: z.string().optional(),
  }).optional(),
});

export type LoginResponseData = z.infer<typeof LoginResponse>;

const LoginTypes = {
  LoginSchema,
  LoginResponse,
};

export default LoginTypes;
