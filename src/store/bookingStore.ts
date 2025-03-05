import { Appointment } from "@/lib/typings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  loading: boolean;
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  filteredAppointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  setSelectedAppointment: (appointment: Appointment | null) => void;
};

export const useBookingStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      appointments: [],
      filteredAppointments: [],
      selectedAppointment: null,

      setAppointments: (appointments: Appointment[]) => {
        set({ appointments, filteredAppointments: [...appointments], loading: false });
      },

      setSelectedAppointment: (appointment: Appointment | null) => {
        set({ selectedAppointment: appointment });
      },
    }),
    {
      name: "booking_store",
    }
  )
);
