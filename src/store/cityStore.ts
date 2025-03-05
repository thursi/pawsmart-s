import { City } from '@/lib/typings';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  loading: boolean;
  cities: City[];
  filterallcities: City[]; 
  city: City[];
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
  setAllCities: (cities: City[]) => void;
  setAllfilterallcities: (filterallcities: City[]) => void;
  setAllCity: (city: City[]) => void;
};

export const useCityStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      cities: [],
      filterallcities: [], 
      city: [],
      selectedCity: null,

      setAllCities: (cities: City[]) => {
        set({ cities, loading: false });
      },

      setAllfilterallcities: (filterallcities: City[]) => {
        set({ filterallcities, loading: false });
      },

      setAllCity: (city: City[]) => {
        set({ city, loading: false });
      },

      setSelectedCity: (city: City | null) => {
        set({ selectedCity: city });
      },
    }),
    {
      name: 'city_store',
    }
  )
);
