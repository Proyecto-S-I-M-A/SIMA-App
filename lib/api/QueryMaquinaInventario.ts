import type { MaquinaInventario, MaquinaInventarioCreation, MaquinaInventarioUpdate } from '@/types/Inventario';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiJson } from '../apiClient';
import { ENDPOINTS } from './endpoints';

export interface InventarioMaquinaItem {
  id: number;
  id_maquina: number;
  id_inventario: number;
  cantidad: number | null;
  medicamento: {
    id: number;
    nombre: string | null;
    marca: string | null;
    precio: number | null;
    resetado: boolean | null;
  };
}

export const useCreateMaquinaInventarioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: MaquinaInventarioCreation): Promise<MaquinaInventario> => {
      return apiJson<MaquinaInventario>(ENDPOINTS.maquinaInventario.base, {
        method: 'POST',
        body: form,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maquina-inventario'] });
    },
  });
};

export const useUpdateMaquinaInventarioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: MaquinaInventarioUpdate }) => {
      return apiJson<MaquinaInventario>(ENDPOINTS.maquinaInventario.byId(id), {
        method: 'PUT',
        body,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maquina-inventario'] });
    },
  });
};

export const useGetMaquinaInventarios = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['maquina-inventario', id],
    queryFn: async (): Promise<MaquinaInventario[]> => {
      return apiJson<MaquinaInventario[]>(ENDPOINTS.maquinaInventario.byId(id), {
        method: 'GET',
        auth: true,
      });
    },
    enabled,
  });
};

export const useGetMaquinaInventariosByMaquina = (id_maquina: number | null, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['maquina-inventario-by-maquina', id_maquina],
    queryFn: async (): Promise<MaquinaInventario[]> => {
      return apiJson<MaquinaInventario[]>(ENDPOINTS.maquinaInventario.byMaquina(id_maquina!), {
        method: 'GET',
        auth: true,
      });
    },
    enabled: enabled && id_maquina !== null,
  });
};

export const useGetInventarioMaquina = (id_maquina: number | null, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['inventario-maquina', id_maquina],
    queryFn: async (): Promise<InventarioMaquinaItem[]> => {
      return apiJson<InventarioMaquinaItem[]>(ENDPOINTS.maquinaInventario.inventarioMaquina(id_maquina!), {
        method: 'GET',
        auth: true,
      });
    },
    enabled: enabled && id_maquina !== null,
  });
};

export const useGetMaquinaInventariosByInventario = (id_inventario: number | null, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['maquina-inventario-by-inventario', id_inventario],
    queryFn: async (): Promise<MaquinaInventario[]> => {
      return apiJson<MaquinaInventario[]>(ENDPOINTS.maquinaInventario.byInventario(id_inventario!), {
        method: 'GET',
        auth: true,
      });
    },
    enabled: enabled && id_inventario !== null,
  });
};

export const useDeleteMaquinaInventarioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return apiJson<{ message: string }>(ENDPOINTS.maquinaInventario.byId(id), {
        method: 'DELETE',
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maquina-inventario'] });
    },
  });
};
