import { z } from 'zod';

export const InventarioSchema = z.object({
  id: z.number(),
  id_maquina: z.string(),
  nombre_medicamento: z.string().nullable(),
  marca: z.string().nullable(),
  precio: z.number().nullable(),
  cantidad: z.number().nullable(),
  resetado: z.boolean().nullable(),
});

export const InventarioCreationSchema = z.object({
  id: z.number().optional(),
  id_maquina: z.number("ID de máquina es requerido"),
  nombre_medicamento: z.string().nullable().optional(),
  marca: z.string().nullable().optional(),
  precio: z.number().nullable().optional(),
  cantidad: z.number().nullable().optional(),
  resetado: z.boolean().optional(),
});

export const InventarioUpdateSchema = InventarioCreationSchema.partial();

export type Inventario = z.infer<typeof InventarioSchema>;
export type InventarioCreation = z.infer<typeof InventarioCreationSchema>;
export type InventarioUpdate = z.infer<typeof InventarioUpdateSchema>;

const InventarioTypes = {
  InventarioSchema,
  InventarioCreationSchema,
  InventarioUpdateSchema,
};

export default InventarioTypes;