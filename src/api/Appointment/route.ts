import { AppointmentCreate } from '@/lib/typings';
import axiosInstance from '@/utils/client';


export async function createAppointment(values: AppointmentCreate) {
  try {
    const response = await axiosInstance.post(`/api/v1/booking`, values);
    return response.data;
  } catch (error) {
    console.log("Error creating appointment :", error);
  }
}


export const getAppointmentBookingFilterData = async (params: {
  pageCount: number;
  pageSize: number;
  userId: number;
}) => {
  try {
    const response = await axiosInstance.get(`api/v1/booking/filter?`, {
      params: {
        pageSize: params?.pageSize,
        pageCount: params?.pageCount,
        userId: params?.userId,
      },

    });
    console.log("response...............",response);

    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};


export async function cancelBooking(id: string) {
  console.log("id...........",id);
  try {
    const response = await axiosInstance.put(`/api/v1/booking/${id}/cancel`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error archiving bookings", error);
  }
}


export async function bookingById(id: string) {
  try {
    const response = await axiosInstance.get(`/api/v1/booking/${id}`);
    return response?.data;
  } catch (error) {
    console.log("Error archiving bookings", error);
  }
}

export async function createPaymentSession(bookingId:number) {
  try{
    const response = await axiosInstance.post(`/api/v1/payment?bookingId=${bookingId}`);
    return response?.data;
  } catch (error) {
    console.log("Error archiving bookings", error);
    return {
      success: false,
      message: "Error creating payment session",
    }
  }
}

export async function cancelPaymentStatus(bookingId:number) {
  try{
    const response = await axiosInstance.get(`/api/v1/payment/cancel?bookingId=${bookingId}`);
    return response?.data;
  } catch (error) {
    console.log("Error archiving bookings", error);
    return {
      success: false,
      message: "Error cancelling payment status",
    }
  }
}

export async function approvePaymentStatus(bookingId:number) {
  try{
    const response = await axiosInstance.get(`/api/v1/payment/success?bookingId=${bookingId}`);
    return response?.data;
  } catch (error) {
    console.log("Error archiving bookings", error);
    return {
      success: false,
      message: "Error approving payment status",
    }
  }
}