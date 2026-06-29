import type { Inventario, InventarioCreation, InventarioUpdate } from '@/types/Inventario';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiJson } from '../apiClient';
import { ENDPOINTS } from './endpoints';

export const useCreateInventarioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: InventarioCreation): Promise<Inventario> => {
      return apiJson<Inventario>(ENDPOINTS.inventario.base, {
        method: 'POST',
        body: form,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventarios'] });
    },
  });
};

export const useUpdateInventarioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: InventarioUpdate }) => {
      return apiJson<Inventario>(ENDPOINTS.inventario.byId(id), {
        method: 'PUT',
        body,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventarios'] });
    },
  });
};

export const useGetInventarios = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['inventarios', id],
    queryFn: async (): Promise<Inventario[]> => {
      return apiJson<Inventario[]>(ENDPOINTS.inventario.byId(id), {
        method: 'GET',
        auth: true,
      });
    },
    enabled,
  });
};

export const useGetInventario = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['inventario', id],
    queryFn: async (): Promise<Inventario[]> => {
      return apiJson<Inventario[]>(ENDPOINTS.inventario.all, {
        method: 'GET',
        auth: true,
      });
    },
    enabled,
  });
};