import { z } from 'zod';

// Schema para lectura (todas las propiedades)
export const AccesoSchema = z.object({
  id: z.uuid(),
  usuario: z.string(),
  tipo: z.string(),
  ultimo_acceso: z.coerce.date().nullable(),
  correo: z.email('Email inválido'),
  activo: z.boolean(),
  updatedAt: z.coerce.date(),
});

// Schema para creación
export const AccesoCreationSchema = z.object({
  id: z.uuid('ID inválido'),
  usuario: z.string().min(1, 'El usuario es requerido').optional(),
  tipo: z.string().min(1, 'El tipo es requerido').optional(),
  ultimo_acceso: z.coerce.date().nullable().optional(),
  correo: z.email('Email inválido'),
  activo: z.boolean().optional().default(true),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// Schema para actualización
export const AccesoUpdateSchema = AccesoCreationSchema.partial();

// Types derivados
export type Acceso = z.infer<typeof AccesoSchema>;
export type AccesoCreation = z.infer<typeof AccesoCreationSchema>;
export type AccesoUpdate = z.infer<typeof AccesoUpdateSchema>;

const AccesoTypes = {
  AccesoSchema,
  AccesoCreationSchema,
  AccesoUpdateSchema,
};

export default AccesoTypes;
