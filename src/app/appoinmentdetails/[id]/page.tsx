'use client';

import React, { useCallback, useEffect, useState } from 'react';
// import { useAuthStore } from '@/store/authStore';
import { bookingById } from '@/api/Appointment/route';
import ConsultationDetails from '@/components/appoinmentdetails';
import { useBookingStore } from '@/store/bookingStore';

const Index = ({ params }: { params: Promise<{ id: string }> }) => {
  // const login = useAuthStore((state) => state.login);
  const [id, setId] = useState<string | null>(null);
  const selectedAppointment = useBookingStore(
    (state) => state.selectedAppointment
  );
  const setSelectedAppointment = useBookingStore(
    (state) => state.setSelectedAppointment
  );

  const getAppointmentDetailsById = useCallback(async (id: string) => {
    try {
      const appointmentData = await bookingById(id);
      setSelectedAppointment(appointmentData);
    } catch (error) {
      console.error('Error fetching appointment data:', error);
    }
  }, [setSelectedAppointment]);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      getAppointmentDetailsById(id);
    }
  }, [id, getAppointmentDetailsById]); 

  if (!selectedAppointment) {
    return <p>Loading appointment details...</p>;
  }

  return (
    <main className="bg-white py-8">
      <div className="flex flex-col items-center justify-between">
        <div className="container mx-auto mt-16 max-w-7xl">
          <ConsultationDetails
            consultationData={selectedAppointment}
            refreshAppointments={() => getAppointmentDetailsById(id ?? '')}
          />
        </div>
      </div>
    </main>
  );
};

export default Index;
