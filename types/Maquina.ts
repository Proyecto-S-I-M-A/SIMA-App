import { z } from 'zod';

export const MaquinaSchema = z.object({
  id: z.number(),
  ubicacion: z.string().nullable(),
  activo: z.boolean().nullable(),
  latitud: z.number().nullable(),
  longitud: z.number().nullable(),
});

export const MaquinaCreationSchema = z.object({
  id: z.number().optional(),
  ubicacion: z.string().nullable().optional(),
  activo: z.boolean().optional(),
  latitud: z.number().nullable().optional(),
  longitud: z.number().nullable().optional(),
});

export const MaquinaUpdateSchema = MaquinaCreationSchema.partial();

export type Maquina = z.infer<typeof MaquinaSchema>;
export type MaquinaCreation = z.infer<typeof MaquinaCreationSchema>;
export type MaquinaUpdate = z.infer<typeof MaquinaUpdateSchema>;