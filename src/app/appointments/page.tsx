'use client';

import React, { useCallback, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getAppointmentBookingFilterData } from '@/api/Appointment/route';
import AppointmentCard from '@/components/appointmentcard';
import { useBookingStore } from '@/store/bookingStore';
const Page = () => {
  const login = useAuthStore((state) => state.login);
  const appointments = useBookingStore((state) => state.appointments);
  const setAppointments = useBookingStore((state) => state.setAppointments);

  const getAppointmentDetails = useCallback(async () => {
    try {
      const filterAppointmentList = await getAppointmentBookingFilterData({
        pageSize: 10,
        pageCount: 1,
        userId: Number(login?.userId),
      });

      console.log(
        'filterAppointmentList.................',
        filterAppointmentList
      );

      if (filterAppointmentList?.records) {
        setAppointments(filterAppointmentList.records);
      }
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  }, [login?.userId, setAppointments]);

  useEffect(() => {
    getAppointmentDetails();
  }, [getAppointmentDetails]);

  return (
    <main className="bg-white py-8">
      <div className="flex flex-col items-center justify-between">
        <div className="container mx-auto mt-16 max-w-7xl px-3 md:px-14">
          <AppointmentCard
            // @ts-expect-error Temporary workaround - fix typings later
            AppointmentList={appointments}
            refreshAppointments={getAppointmentDetails}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
