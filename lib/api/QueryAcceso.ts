import type { Acceso, AccesoCreation, AccesoUpdate } from "@/types/Acceso";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiJson } from "../apiClient";
import { ENDPOINTS } from "./endpoints";

export type CreateAccesoResponse = { message: string; acceso: { id: string } };

export const useCreateAccesoMutation = () => {
  return useMutation({
    mutationFn: async (form: AccesoCreation): Promise<CreateAccesoResponse> => {
      return apiJson<CreateAccesoResponse>(ENDPOINTS.accesos.base, {
        method: "POST",
        body: form,
        auth: true,
      });
    },
  });
};

export const useUpdateAccesoActivoMutation = () => {
  return useMutation({
    mutationFn: async ({ id, body} : {id: string, body: AccesoUpdate}) => {
      return apiJson<{ message: string }>(ENDPOINTS.accesos.byId(id), {
        method: "PUT",
        body: {...body},
        auth: true,
      });
    },
  });
};

export const useUpdateAccesoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: AccesoUpdate }) => {
      return apiJson<{ message: string }>(ENDPOINTS.accesos.byId(id), {
        method: "PUT",
        body,
        auth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accesos"] });
    },
  });
};

export const useGetAccesos = (id: string, enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["accesos", id],
    queryFn: async (): Promise<Acceso[]> => {
      return apiJson<Acceso[]>(ENDPOINTS.accesos.byId(id), {
        method: "GET",
        auth: true,
      });
    },
    enabled
  });
  return query;
}
