import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the type for the login object
type Login = {
  userId: string;
  firstName: string;
  token: string;
} | undefined;

type Store = {
  login: Login; 
  loadingAuth: boolean; 
  setLogin: (login: Login) => void; 
  setLoadingAuth: (isLoadingAuth: boolean) => void; 
};

export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      login: undefined, 
      loadingAuth: false, 
      setLogin: (login: Login) => {
        console.log("login response", login);
        set({ login }); 
      },
      setLoadingAuth: (isLoadingAuth: boolean) => {
        set({ loadingAuth: isLoadingAuth }); 
      },
    }),
    {
      name: "auth_store", 
    }
  )
);
