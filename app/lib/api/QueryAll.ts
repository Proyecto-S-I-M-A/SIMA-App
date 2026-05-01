import { useQuery } from "@tanstack/react-query";
import { apiJson } from "../apiClient";


export function useQueryAll (endpoint:string) {
  const All = useQuery({
    queryKey: [`${endpoint}-all`],
    queryFn: async (): Promise<any[]> => apiJson(`${endpoint}/all`, {
      method: 'GET',
      auth: true,
    }),
  });
  return {All};
}
