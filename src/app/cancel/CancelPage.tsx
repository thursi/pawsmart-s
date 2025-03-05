'use client';

import {
  bookingById,
  cancelPaymentStatus,
  createPaymentSession,
} from '@/api/Appointment/route';
import { formatTime24to12 } from '@/lib/utils';
import { useBookingStore } from '@/store/bookingStore';
import { loadStripe } from '@stripe/stripe-js';
import { Loader, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function CancelPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('bookingId');
  const [loading, setLoading] = useState(true);
  const { selectedAppointment, setSelectedAppointment } = useBookingStore(
    (state) => state
  );

  async function handlePaymentSession() {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );
    if (!stripe) {
      return;
    }
    const res = await createPaymentSession(Number(bookingId));

    if (res.success) {
      await stripe.redirectToCheckout({
        sessionId: res.sessionId,
      });
    } else {
      toast.error(res.message);
    }
  }

  const handlePaymentCancellation = useCallback(async () => {
    const res = await cancelPaymentStatus(Number(bookingId));
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
        if (res?.paymentStatus === 'PENDING') handlePaymentCancellation();
        setLoading(false);
      });
    }
  }, [bookingId, handlePaymentCancellation, setSelectedAppointment]);

  return (
    <div className="flex-grow pt-24 container flex flex-col gap-2 px-0 md:px-7 mx-auto">
      <div className="bg-white shadow-lg w-fit self-center px-4 md:px-6 py-2 rounded-lg flex flex-col gap-3">
        {loading ? (
          <div className="flex-grow w-full flex items-center justify-center min-w-96 min-h-96">
            <Loader className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="w-20 h-20 p-1 rounded-full flex justify-center items-center self-center bg-red-400">
              <X className="text-white size-12" />
            </div>
            <div className="text-lg md:text-2xl text-gray-400 font-bold text-center border-b-[1px] py-1 w-full">
              Payment Cancelled or Failed!
            </div>
            <div className="text-center flex justify-center">
              <div className="text-sm max-w-72 md:text-lg text-gray-400 font-bold text-center border-b-[1px] py-1 w-full">
                Payment for your appointment with Dr.{' '}
                {selectedAppointment?.doctorResponse?.userResponse?.firstName}{' '}
                on {selectedAppointment?.bookingDate} at{' '}
                {selectedAppointment?.bookingTime &&
                  formatTime24to12(selectedAppointment?.bookingTime)}{' '}
                has been cancelled or failed.
              </div>
            </div>
            <div className="w-full flex gap-2 justify-stretch">
              <div
                onClick={() => router.push('/')}
                className="h-14 hover:scale-105 cursor-pointer bg-white active:scale-95 transition-all border-primary border-[1px] rounded-lg text-primary flex items-center justify-center w-full font-semibold text-lg"
              >
                Back to home
              </div>
              <div
                onClick={() => handlePaymentSession()}
                className="h-14 cursor-pointer hover:scale-105 active:scale-95 transition-all border-primary border-[1px] bg-primary rounded-lg text-white flex items-center justify-center w-full font-semibold text-lg"
              >
                Retry
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
