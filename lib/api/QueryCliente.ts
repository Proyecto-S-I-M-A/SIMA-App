import type { Cliente, ClienteUpdate } from "@/types/Cliente";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiJson } from "../apiClient";
import { ENDPOINTS } from "./endpoints";

export const useGetAllClientes = () => {
  return useQuery({
    queryKey: ["clientes-all"],
    queryFn: async (): Promise<Cliente[]> => {
      return apiJson<Cliente[]>(ENDPOINTS.clientes.all, {
        method: "GET",
        auth: true,
      });
    },
  });
};

export const useUpdateClienteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: ClienteUpdate }) => {
      return apiJson<{ message: string }>(ENDPOINTS.clientes.byId(id), {
        method: "PUT",
        body,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      queryClient.invalidateQueries({ queryKey: ["clientes-all"] });
    },
  });
};

export const useGetClientes = (id: string, enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["clientes", id],
    queryFn: async (): Promise<Cliente> => {
      return apiJson<Cliente>(ENDPOINTS.clientes.byId(id), {
        method: "GET",
        auth: true,
      });
    },
    enabled
  });
  return query;
};

export const useGetClienteByCedula = (cedula: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["clientes", "cedula", cedula],
    queryFn: async (): Promise<Cliente> => {
      return apiJson<Cliente>(ENDPOINTS.clientes.byCedula(cedula), {
        method: "GET",
        auth: true,
      });
    },
    enabled,
  });
};
