'use client';

import { approvePaymentStatus, bookingById } from '@/api/Appointment/route';
import { formatTime24to12 } from '@/lib/utils';
import { useBookingStore } from '@/store/bookingStore';
import { Check, Loader, PawPrint, Stethoscope } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

const BookingConfirmationContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('bookingId');
  const [loading, setLoading] = useState(true);
  const { selectedAppointment, setSelectedAppointment } = useBookingStore(
    (state) => state
  );

  const handlePaymentApproval = useCallback(async () => {
    const res = await approvePaymentStatus(Number(bookingId));
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }, [bookingId]);

  useEffect(() => {
    if (bookingId) {
      bookingById(bookingId).then((res) => {
        setSelectedAppointment(res);
        if (res?.paymentStatus === 'PENDING') handlePaymentApproval();
        setLoading(false);
      });
    }
  }, [bookingId, handlePaymentApproval, setSelectedAppointment]);

  return (
    <div className="flex-grow pt-24 container flex flex-col gap-2 px-0 md:px-7 mx-auto">
      <div className="bg-white shadow-lg w-fit self-center px-4 md:px-6 py-2 rounded-lg flex flex-col gap-3">
        {loading ? (
          <div className="flex-grow w-full flex items-center justify-center min-w-96 min-h-96">
            <Loader className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {selectedAppointment ? (
              <>
                <div className="w-20 h-20 p-1 rounded-full flex justify-center items-center self-center bg-[#0EC760]">
                  <Check className="text-white size-12" />
                </div>
                <div className="text-lg md:text-2xl text-primary font-bold text-center border-b-[1px] py-1 w-full">
                  Appointment Booked Successfully
                </div>
                <div className="flex flex-col gap-2 w-full pb-3">
                  <div className="flex justify-between">
                    <div className="text-gray-500 font-[400]">Reference No</div>
                    <div className="text-gray-500 font-semibold">
                      {selectedAppointment?.referenceNo}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-500 font-[400]">Date</div>
                    <div className="text-gray-500 font-semibold">
                      {selectedAppointment?.bookingDate}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-500 font-[400]">
                      Appointment Time
                    </div>
                    <div className="text-gray-500 font-semibold">
                      {formatTime24to12(selectedAppointment?.bookingTime)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-500 font-[400]">Clinic</div>
                    <div className="text-gray-500 font-semibold">
                      {selectedAppointment?.hospitalResponse?.name}
                    </div>
                  </div>
                  {selectedAppointment?.medium && (
                    <div className="flex justify-between">
                      <div className="text-gray-500 font-[400]">
                        Consultation Type
                      </div>
                      <div className="text-gray-500 font-semibold">
                        {selectedAppointment?.medium}
                      </div>
                    </div>
                  )}
                  {selectedAppointment?.reason && (
                    <div className="flex flex-col gap-2">
                      <div className="font-[400] text-gray-500">Reason</div>
                      <div className="text-gray-500 font-semibold text-sm">
                        {selectedAppointment?.reason}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between mt-2">
                    <div className="flex gap-2 items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        {selectedAppointment?.doctorResponse?.userResponse
                          ?.preSignedUrl ? (
                          <Image
                            src={
                              selectedAppointment?.doctorResponse?.userResponse
                                ?.preSignedUrl
                            }
                            fill
                            alt={
                              selectedAppointment?.doctorResponse?.userResponse
                                ?.firstName || 'Doctor'
                            }
                            className="rounded-full"
                          />
                        ) : (
                          <Stethoscope className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-grow flex flex-col gap-0.5 text-sm font-semibold text-gray-500">
                        <div>
                          Dr.{' '}
                          {
                            selectedAppointment?.doctorResponse?.userResponse
                              ?.firstName
                          }{' '}
                          {
                            selectedAppointment?.doctorResponse?.userResponse
                              ?.lastName
                          }
                        </div>
                        <div className="text-gray-400 text-[13px]">
                          {
                            selectedAppointment?.doctorResponse
                              ?.specializationResponse?.name
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        {selectedAppointment?.petResponse?.image ? (
                          <Image
                            src={selectedAppointment?.petResponse?.image}
                            fill
                            alt={
                              selectedAppointment?.petResponse?.name || 'Pet'
                            }
                            className="rounded-full"
                          />
                        ) : (
                          <PawPrint className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-grow flex flex-col gap-0.5 text-sm font-semibold text-gray-500">
                        <div>{selectedAppointment?.petResponse?.name}</div>
                        <div className="text-gray-400 text-[13px]">
                          {selectedAppointment?.petResponse?.genderType}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div
                    onClick={() => router.push('/')}
                    className="h-14 hover:scale-105 cursor-pointer bg-white active:scale-95 transition-all border-primary border-[1px] rounded-lg text-primary flex items-center justify-center w-full font-semibold text-lg"
                  >
                    Back to home
                  </div>
                  <div
                    onClick={() =>
                      router.push(`/appoinmentdetails/${bookingId}`)
                    }
                    className="h-14 cursor-pointer hover:scale-105 active:scale-95 transition-all border-primary border-[1px] bg-primary rounded-lg text-white flex items-center justify-center w-full font-semibold text-lg"
                  >
                    View details
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-grow w-full flex items-center justify-center min-w-96 min-h-96">
                <div className="text-lg md:text-2xl text-gray-300 font-semibold text-center py-1 w-full">
                  Oops! Something went wrong.
                  <br />
                  Could not get the appointment details
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const BookingConfirmation = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingConfirmationContent />
    </Suspense>
  );
};

export default BookingConfirmation;
