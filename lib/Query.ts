import { apiJson } from "@/lib/apiClient";
import type { ClienteCreation } from "@/types/Cliente";
import type { LoginData, LoginResponseData } from "@/types/Login";
import { SignUpResponseData } from "@/types/SingUp";
import type { UsuarioCreation } from "@/types/Usuario";
import { useMutation } from "@tanstack/react-query";

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
    mutationFn: async (form: LoginData): Promise<SignUpResponseData> => {
      return apiJson<SignUpResponseData>("/auth/signup", {
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

const QueryHooks = {
  useLoginMutation,
  useSignupMutation,
  useCreateClienteMutation,
  useCreateUsuarioMutation,
};

export default QueryHooks;