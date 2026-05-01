import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Acceso, AccesoCreation, AccesoUpdate } from "~/types/Acceso";
import { apiJson } from "../apiClient";

export type CreateAccesoResponse = { message: string; acceso: { id: string } };

export const useCreateAccesoMutation = () => {
  return useMutation({
    mutationFn: async (form: AccesoCreation): Promise<CreateAccesoResponse> => {
      console.log("Creating acceso with form data:", form);
      return apiJson<CreateAccesoResponse>("/accesos", {
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
      return apiJson<{ message: string }>(`/accesos/${id}`, {
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
      return apiJson<{ message: string }>(`/accesos/${id}`, {
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
      return apiJson<Acceso[]>(`/accesos/${id}`, {
        method: "GET",
        auth: true,
      });
    },
    enabled
  });
  return query;
}
