import { z } from 'zod';

// Schema para lectura (todas las propiedades)
export const UsuarioSchema = z.object({
  id: z.number(),
  nombre: z.string().nullable(),
  apellido: z.string().nullable(),
  rol: z.string().nullable(),
  id_acceso: z.string().nullable(),
  ruc_doctor: z.string().nullable(),
  especialidades: z.string().nullable(),
});

// Schema para creación
export const UsuarioCreationSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido: z.string().nullable().optional(),
  rol: z.string().refine((val) => ["admin", "doctor","farmacista", "cajero"].includes(val), 'El rol debe ser "admin", "doctor", "farmacista" o "cajero"'),
  id_acceso: z.string().min(1, 'El ID de acceso es requerido'),
  ruc_doctor: z.string().nullable().optional(),
  especialidades: z.string().nullable().optional(),
});

export const UsuarioUpdateSchema = UsuarioCreationSchema.partial();

// Types derivados
export type Usuario = z.infer<typeof UsuarioSchema>;
export type UsuarioCreation = z.infer<typeof UsuarioCreationSchema>;
export type UsuarioUpdate = z.infer<typeof UsuarioUpdateSchema>;

const UsuarioTypes = {
  UsuarioSchema,
  UsuarioCreationSchema,
  UsuarioUpdateSchema,
};

export default UsuarioTypes;
