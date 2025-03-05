import { Department } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  departments: Department[];
  filterdepartments: Department[];
  department: Department[];
  selectedDepartment: Department | null | undefined;
  setSelectedDepartment: (department: Department | null | undefined) => void;
  setAllDepartments: (departments: Department[]) => void;
  setAllfilterDepartments: (filterdepartments: Department[]) => void;
  setAllDepartment: (department: Department[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useDepartmentStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      departments: [],
      filterdepartments: [],
      department: [],
      selectedDepartment: null,
      setAllDepartments: (departments: Department[]) => {
        set({ departments: departments, loading: false });
      },
      setAllfilterDepartments: (filterdepartments: Department[]) => {
        set({ filterdepartments: filterdepartments, loading: false });
      },
      setAllDepartment: (department: Department[]) => {
        set({ department: department, loading: false });
      },
      setSelectedDepartment: (department: Department | null | undefined) => {
        set({ selectedDepartment: department, loading: false });
      },
      setLoading(loading: boolean) {
        set({ loading: loading });
      },
    }),
    {
      name: "department_store",
    }
  )
);
