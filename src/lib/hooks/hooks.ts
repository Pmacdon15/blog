import { useQuery } from '@tanstack/react-query';
import { isAdmin } from '../actions/auth';
import { Section } from '@/types/types';
import { useState, useEffect } from 'react';

export const useIsAdmin = () => {
  return useQuery({
    queryKey: ['isAdmin'],
    queryFn: () => isAdmin(),
  })
}

export const useSyncedSections = (initialData: Section[]): [Section[], React.Dispatch<React.SetStateAction<Section[]>>] => {
  const [sections, setSections] = useState<Section[]>(initialData);

  useEffect(() => {
    setSections(initialData);
  }, [initialData]);

  return [sections, setSections];
};