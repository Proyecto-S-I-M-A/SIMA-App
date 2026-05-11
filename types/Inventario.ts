import { z } from 'zod';

export const InventarioSchema = z.object({
  id: z.number(),
  nombre_medicamento: z.string().nullable(),
  marca: z.string().nullable(),
  precio: z.number().nullable(),
  resetado: z.boolean().nullable(),
});

export const InventarioCreationSchema = z.object({
  id: z.number().optional(),
  nombre_medicamento: z.string().nullable().optional(),
  marca: z.string().nullable().optional(),
  precio: z.number().nullable().optional(),
  resetado: z.boolean().optional(),
});

export const InventarioUpdateSchema = InventarioCreationSchema.partial();

// Relación many-to-many entre Máquina e Inventario
export const MaquinaInventarioSchema = z.object({
  id: z.number(),
  id_maquina: z.number(),
  id_inventario: z.number(),
  cantidad: z.number().nullable().optional(),
});

export const MaquinaInventarioCreationSchema = z.object({
  id_maquina: z.number("ID de máquina es requerido"),
  id_inventario: z.number("ID de inventario es requerido"),
  cantidad: z.number().nullable().optional(),
});

export const MaquinaInventarioUpdateSchema = MaquinaInventarioCreationSchema.partial();

export type Inventario = z.infer<typeof InventarioSchema>;
export type InventarioCreation = z.infer<typeof InventarioCreationSchema>;
export type InventarioUpdate = z.infer<typeof InventarioUpdateSchema>;
export type MaquinaInventario = z.infer<typeof MaquinaInventarioSchema>;
export type MaquinaInventarioCreation = z.infer<typeof MaquinaInventarioCreationSchema>;
export type MaquinaInventarioUpdate = z.infer<typeof MaquinaInventarioUpdateSchema>;