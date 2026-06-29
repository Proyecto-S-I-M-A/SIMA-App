import type { Receta, RecetaCreation, RecetaUpdate, RecetasDosisCreation } from '@/types/Receta';
import type { RecetasYDosisResponse } from '@/types/RecetasYDosis';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiJson } from '../apiClient';
import { ENDPOINTS } from './endpoints';

export const useCreateRecetaMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: RecetaCreation): Promise<Receta> => {
      return apiJson<Receta>(ENDPOINTS.recetas.base, {
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
      return apiJson<{ id: number }>(ENDPOINTS.recetas.withDosis, {
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
      return apiJson<Receta>(ENDPOINTS.recetas.byId(id), {
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
      return apiJson<Receta[]>(ENDPOINTS.recetas.byId(id), {
        method: 'GET',
        auth: true,
      });
    },
    enabled,
  });
};

export const useGetRecetasByCedula = (cedula: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['recetas', 'cliente', cedula],
    queryFn: async (): Promise<Receta[]> => {
      return apiJson<Receta[]>(ENDPOINTS.recetas.byCliente(cedula), {
        method: 'GET',
      });
    },
    enabled,
  });
};

export const useGetRecetasYDosisByCedula = (cedula: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['recetas', 'dosis', 'cliente', cedula],
    queryFn: async (): Promise<RecetasYDosisResponse> => {
      return apiJson<RecetasYDosisResponse>(ENDPOINTS.recetas.dosisCliente(cedula), {
        method: 'GET',
        auth: true,
      });
    },
    enabled,
  });
};
