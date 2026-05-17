import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.email("Correo electrónico no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  cedula: z.string().min(1, "La cédula es requerida"),
  aseguradora: z.boolean(),
  sexo: z.enum(["M", "F"], "El sexo es requerido"),
});

export const SingUpResponse = z.object({
  message: z.string(),
  session: z.object({
    access_token: z.string(),
    refresh_token: z.string().optional(),
    user: z.object({
      id: z.string(),
      email: z.email(),
    }),
  })
})

export type SignUpCreation = z.infer<typeof SignUpSchema>;
export type SignUpResponseData = z.infer<typeof SingUpResponse>;

export const SignUpUpdateSchema = SignUpSchema.partial();