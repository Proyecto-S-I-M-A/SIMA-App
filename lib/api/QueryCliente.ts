import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Cliente, ClienteUpdate } from "~/types/cliente";
import type { Row } from "~/pages/dashboard/types";
import { apiJson } from "../apiClient";

export const useGetAllClientes = () => {
  return useQuery({
    queryKey: ["clientes-all"],
    queryFn: async (): Promise<Row[]> => {
      return apiJson<Row[]>(`/clientes/all`, {
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
      return apiJson<{ message: string }>(`/clientes/${id}`, {
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
    queryFn: async (): Promise<Cliente[]> => {
      return apiJson<Cliente[]>(`/clientes/${id}`, {
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
      return apiJson<Cliente>(`/clientes/cedula/${cedula}`, {
        method: "GET",
        auth: true,
      });
    },
    enabled,
  });
};
