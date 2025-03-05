import { Pet } from '@/lib/typings';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  loading: boolean;
  pets: Pet[];
  filteredPets: Pet[];
  pet: Pet | null;
  selectedPet: Pet | null;
  setAllPets: (pets: Pet[]) => void;
  setPet: (pet: Pet | null) => void;
  setFilteredPets: (filteredPets: Pet[]) => void;
  setSelectedPet: (pet: Pet | null) => void;
  setLoading: (loading: boolean) => void;
};

export const usePetStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      pets: [],
      filteredPets: [],
      pet: null,
      selectedPet: null,

      setAllPets: (pets: Pet[]) => set({ pets, loading: false }),
      setPet: (pet: Pet | null) => set({ pet, loading: false }),
      setFilteredPets: (filteredPets: Pet[]) => set({ filteredPets, loading: false }),
      setSelectedPet: (pet: Pet | null) => set({ selectedPet: pet }),
      setLoading: (loading: boolean) => set({ loading }),
    }),
    {
      name: 'pet_store',
    }
  )
);
