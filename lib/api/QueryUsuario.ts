import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Usuario, UsuarioUpdate } from "~/types/Usuario";
import { apiJson } from "../apiClient";

export const useUpdateUsuarioMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: UsuarioUpdate }) => {
      return apiJson<{ message: string }>(`/usuarios/${id}`, {
        method: "PUT",
        body,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
};

export const useGetUsuarios = (id: string, enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["usuarios", id],
    queryFn: async (): Promise<Usuario[]> => {
      return apiJson<Usuario[]>(`/usuarios/${id}`, {
        method: "GET",
        auth: true,
      });
    },
    enabled
  });
  return query;
};

export const useGetUsuario = (id_acceso: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["usuario", id_acceso],
    queryFn: async (): Promise<Usuario[]> => {
      return apiJson<Usuario[]>(`/usuarios/acceso/${id_acceso}`, {
        method: "GET",
        auth: true,
      });
    },
    enabled,
  });
};
