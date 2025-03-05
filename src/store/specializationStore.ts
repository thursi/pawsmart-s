import { Specialization } from '@/lib/typings';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  loading: boolean;
  specializations: Specialization[];
  filterspecializations: Specialization[];
  specialization: Specialization[];
  selectedSpecialization: Specialization | null;
  setSelectedSpecialization: (specialization: Specialization | null) => void;
  setAllSpecializations: (specializations: Specialization[]) => void;
  setAllFilterSpecializations: (
    filterspecializations: Specialization[]
  ) => void;
  setAllSpecialization: (specialization: Specialization[]) => void;
};

export const useSpecializationStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      specializations: [],
      filterspecializations: [],
      specialization: [],
      selectedSpecialization: null,

      setAllSpecializations: (specializations: Specialization[]) => {
        set({ specializations, loading: false });
      },

      setAllFilterSpecializations: (
        filterspecializations: Specialization[]
      ) => {
        set({ filterspecializations, loading: false });
      },

      setAllSpecialization: (specialization: Specialization[]) => {
        set({ specialization, loading: false });
      },

      setSelectedSpecialization: (specialization: Specialization | null) => {
        set({ selectedSpecialization: specialization });
      },
    }),
    {
      name: 'specialization_store',
    }
  )
);
