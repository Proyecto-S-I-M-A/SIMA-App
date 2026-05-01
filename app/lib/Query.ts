import { useMutation } from "@tanstack/react-query";
import type { LoginData, LoginResponseData } from "~/types/login";
import type { ClienteCreation } from "~/types/cliente";
import type { UsuarioCreation } from "~/types/Usuario";
import { apiJson } from "~/lib/apiClient";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (form: LoginData): Promise<LoginResponseData> => {
      return apiJson<LoginResponseData>("/auth/login", {
        method: "POST",
        body: form,
      });
    }
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (form: LoginData): Promise<LoginResponseData> => {
      return apiJson<LoginResponseData>("/auth/signup", {
        method: "POST",
        body: form,
      });
    }
  });
};

export type CreateClienteResponse = { messages: string };

export const useCreateClienteMutation = () => {
  return useMutation({
    mutationFn: async (form: ClienteCreation): Promise<CreateClienteResponse> => {
      return apiJson<CreateClienteResponse>("/clientes", {
        method: "POST",
        body: form,
        auth: true,
      });
    },
  });
};



export const useCreateUsuarioMutation = () => {
  return useMutation({
    mutationFn: async (form: UsuarioCreation): Promise<unknown> => {
      return apiJson<unknown>("/usuarios", {
        method: "POST",
        body: form,
        auth: true,
      });
    },
  });
};