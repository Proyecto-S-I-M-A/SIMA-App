import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Receta, RecetaCreation, RecetaUpdate, RecetasDosisCreation } from '~/types/receta';
import { apiJson } from '../apiClient';

export const useCreateRecetaMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: RecetaCreation): Promise<Receta> => {
      return apiJson<Receta>('/recetas', {
        method: 'POST',
        body: form,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recetas'] });
    },
  });
};

export const useCreateRecetaWithDosisMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: RecetasDosisCreation) => {
      return apiJson<{ id: number }>('/recetas/dosis', {
        method: 'POST',
        body: form,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recetas'] });
      queryClient.invalidateQueries({ queryKey: ['dosis'] });
    },
  });
};

export const useUpdateRecetaMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: RecetaUpdate }) => {
      return apiJson<Receta>(`/recetas/${id}`, {
        method: 'PUT',
        body,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recetas'] });
    },
  });
};

export const useGetRecetas = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['recetas', id],
    queryFn: async (): Promise<Receta[]> => {
      return apiJson<Receta[]>(`/recetas/${id}`, {
        method: 'GET',
        auth: true,
      });
    },
    enabled,
  });
};
