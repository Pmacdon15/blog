import { useQuery } from '@tanstack/react-query';
import { isAdmin } from '../actions/auth';

export const useIsAdmin = () => {
  return useQuery({
    queryKey: ['isAdmin'],
    queryFn: () => isAdmin(),
  })
}