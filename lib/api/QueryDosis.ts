import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Dosis, DosisCreation, DosisUpdate } from '~/types/Dosis';
import { apiJson } from '../apiClient';

export const useCreateDosisMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: DosisCreation): Promise<Dosis> => {
      return apiJson<Dosis>('/dosis', {
        method: 'POST',
        body: form,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dosis'] });
    },
  });
};

export const useUpdateDosisMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: DosisUpdate }) => {
      return apiJson<Dosis>(`/dosis/${id}`, {
        method: 'PUT',
        body,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dosis'] });
    },
  });
};

export const useGetDosis = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['dosis', id],
    queryFn: async (): Promise<Dosis[]> => {
      return apiJson<Dosis[]>(`/dosis/${id}`, {
        method: 'GET',
        auth: true,
      });
    },
    enabled,
  });
};

export const useGetDosisByReceta = (id_receta: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['dosis', 'receta', id_receta],
    queryFn: async (): Promise<Dosis[]> => {
      return apiJson<Dosis[]>(`/dosis/receta/${id_receta}`, {
        method: 'GET',
        auth: true,
      });
    },
    enabled,
  });
};
