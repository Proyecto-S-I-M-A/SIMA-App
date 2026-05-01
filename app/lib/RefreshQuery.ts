import { useQueryClient } from '@tanstack/react-query';
export default function RefreshQuery(queryKey: string[]) {
  if(!queryKey) {
    return;
  }
  const QueryClient = useQueryClient();
  return  QueryClient.invalidateQueries({queryKey: queryKey});
}