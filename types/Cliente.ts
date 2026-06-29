import { z } from 'zod';

// Schema para lectura (todas las propiedades)
export const ClienteSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  apellido: z.string().nullable(),
  cedula: z.string().nullable(),
  correo: z.email().nullable(),
  asegurado: z.boolean(),
  verificado: z.boolean(),
  sexo: z.string().nullable(),
  id_acceso: z.string(),
  push_token: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// Schema para creación
export const ClienteCreationSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido: z.string().nullable().optional(),
  cedula: z.string().nullable().optional(),
  correo: z.email().nullable().optional(),
  asegurado: z.boolean().optional().default(false),
  verificado: z.boolean().optional().default(false),
  sexo: z.string().nullable().optional(),
  id_acceso: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// Schema para actualización (todos los campos opcionales excepto id)
export const ClienteUpdateSchema = ClienteCreationSchema.omit({ id_acceso: true }).partial();

// Types derivados de los schemas
export type Cliente = z.infer<typeof ClienteSchema>;
export type ClienteCreation = z.infer<typeof ClienteCreationSchema>;
export type ClienteUpdate = z.infer<typeof ClienteUpdateSchema>;

const ClienteTypes = {
  ClienteSchema,
  ClienteCreationSchema,
  ClienteUpdateSchema,
};

export default ClienteTypes;
