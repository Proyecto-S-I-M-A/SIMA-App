import { z } from 'zod';
import { DosisCreationSchema } from './Dosis';
import { es } from 'zod/v4/locales';

const DosisInRecetaCreationSchema = DosisCreationSchema.omit({ id_receta: true });

// Schema para lectura (todas las propiedades)
export const RecetaSchema = z.object({
  id: z.number(),
  id_cliente: z.number(),
  activo: z.boolean().nullable(),
  doctor_remitente: z.string().nullable(),
  ruc_doctor_remitente: z.string().nullable(),
  hospital_remitente: z.string().nullable(),
  telefono_hospital: z.string().nullable(),
  correo: z.email().nullable(),
  codigo: z.number().nullable(),
  fecha: z.date().nullable(),
  estado: z.string().nullable(),
});

// Schema para creación
export const RecetaCreationSchema = z.object({
  id: z.number().optional(),
  id_cliente: z.number(),
  doctor_remitente: z.string().nullable().optional(),
  ruc_doctor_remitente: z.string().nullable().optional(),
  hospital_remitente: z.string().nullable().optional(),
  telefono_hospital: z.string().nullable().optional(),
  correo: z.email().nullable().optional(),
  codigo: z.number().nullable().optional(),
  fecha: z.date().nullable().optional(),
  estado: z.enum(["Pendiente", "Retirado", "Vencido"]).nullable().optional(),
});

// Schema para actualización (todos los campos opcionales excepto id)
export const RecetaUpdateSchema = RecetaCreationSchema.omit({ id: true }).partial();

// Schema para receta con dosis (estructura combinada)
export const RecetasDosisSchema = z.object({
  Receta: RecetaCreationSchema,
  Dosis: z.array(DosisInRecetaCreationSchema).min(1, 'Al menos una dosis es requerida'),
});

// Types derivados de los schemas
export type Receta = z.infer<typeof RecetaSchema>;
export type RecetaCreation = z.infer<typeof RecetaCreationSchema>;
export type RecetaUpdate = z.infer<typeof RecetaUpdateSchema>;
export type RecetasDosisCreation = z.infer<typeof RecetasDosisSchema>;