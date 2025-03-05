import { Appointment, Doctor } from '@/lib/typings';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  loading: boolean;
  doctors: Doctor[];
  doctor: Doctor[];
  selectedDoctor: Doctor | null;
  doctorAppointments: Appointment[];
  doctorfiltAppointments: Appointment[];
  setLoading: (loading: boolean) => void;
  setAllDoctors: (doctors: Doctor[]) => void;
  setDoctorList: (doctor: Doctor[]) => void;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  setDoctorAppointments: (appointments: Appointment[]) => void;
};

export const useDoctorStore = create<Store>()(
  persist(
    (set) => ({
      loading: true,
      doctors: [],
      doctor: [],
      selectedDoctor: null,
      doctorAppointments: [],
      doctorfiltAppointments: [],

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      setAllDoctors: (doctors: Doctor[]) => {
        set({ doctors, loading: false });
      },

      setDoctorList: (doctor: Doctor[]) => {
        set({ doctor, loading: false });
      },

      setSelectedDoctor: (doctor: Doctor | null) => {
        set({ selectedDoctor: doctor });
      },

      setDoctorAppointments: (appointments: Appointment[]) => {
        set({
          doctorAppointments: appointments,
          doctorfiltAppointments: [...appointments],
        });
      },
    }),
    {
      name: 'doctor_store',
    }
  )
);
