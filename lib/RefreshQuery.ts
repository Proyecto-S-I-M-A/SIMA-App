import { useQueryClient } from '@tanstack/react-query';
export default function RefreshQuery(queryKey: string[]) {
  const QueryClient = useQueryClient();
  if (!queryKey || queryKey.length === 0) {
    return;
  }
  return  QueryClient.invalidateQueries({queryKey: queryKey});
}