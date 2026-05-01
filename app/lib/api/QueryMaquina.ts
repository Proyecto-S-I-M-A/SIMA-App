import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Maquina, MaquinaCreation, MaquinaUpdate } from '~/types/Maquina';
import { apiJson } from '../apiClient';

export const useCreateMaquinaMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: MaquinaCreation): Promise<Maquina> => {
      return apiJson<Maquina>('/maquinas', {
        method: 'POST',
        body: form,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maquinas'] });
    },
  });
};

export const useUpdateMaquinaMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: MaquinaUpdate }) => {
      return apiJson<Maquina>(`/maquinas/${id}`, {
        method: 'PUT',
        body,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maquinas'] });
    },
  });
};

export const useGetMaquinas = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['maquinas', id],
    queryFn: async (): Promise<Maquina[]> => {
      return apiJson<Maquina[]>(`/maquinas/${id}`, {
        method: 'GET',
        auth: true,
      });
    },
    enabled,
  });
};