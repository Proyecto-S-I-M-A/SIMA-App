import { z } from 'zod';

export const DosisSchema = z.object({
  id: z.number(),
  id_medicamento: z.number().nullable(),
  id_receta: z.number(),
  cantidad: z.number().nullable(),
  instrucciones: z.string().nullable(),
});

export const DosisCreationSchema = z.object({
  id: z.number().optional(),
  id_medicamento: z.number().nullable().optional(),
  id_receta: z.number({ message: 'El ID de la receta es requerido' }),
  cantidad: z.number().nullable().optional(),
  instrucciones: z.string().nullable().optional(),
});

export const DosisUpdateSchema = DosisCreationSchema.partial();

export type Dosis = z.infer<typeof DosisSchema>;
export type DosisCreation = z.infer<typeof DosisCreationSchema>;
export type DosisUpdate = z.infer<typeof DosisUpdateSchema>;

const DosisTypes = {
  DosisSchema,
  DosisCreationSchema,
  DosisUpdateSchema,
};

export default DosisTypes;
