import { z } from 'zod';
import { DosisSchema } from './Dosis';
import { InventarioSchema } from './Inventario';
import { RecetaSchema } from './Receta';

/**
 * Schema de validación para Dosis con Inventario asociado
 */
export const DosisConInventarioSchema = DosisSchema.extend({
  inventario: InventarioSchema.nullable(),
});

export type DosisConInventario = z.infer<typeof DosisConInventarioSchema>;

/**
 * Schema de validación para Receta con Dosis
 */
export const RecetaConDosisSchema = RecetaSchema.extend({
  dosis: z.array(DosisConInventarioSchema),
});

export type RecetaConDosis = z.infer<typeof RecetaConDosisSchema>;

/**
 * Schema de validación para la respuesta del endpoint GetRecetasYDosis
 */
export const RecetasYDosisResponseSchema = z.array(RecetaConDosisSchema);

export type RecetasYDosisResponse = z.infer<typeof RecetasYDosisResponseSchema>;

// Re-exportar tipos base si es necesario
