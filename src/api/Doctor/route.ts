// "use server";

import axiosInstance from "@/utils/client";

interface DoctorFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  role?: number;
  bio: string;
  qualification: string;
  experience: string;
  paymentPerSession: string | number;
  consultationDuration: string | number;
  specializationId: string | number;
}

export async function getDoctorById(id: string) {
  try {
    const response = await axiosInstance.get(`/api/v1/doctor/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Doctor by Id: ", error);
  }
}

export async function getDoctorData(
  pageCount?: number,
  pageSize?: number,
  isVerified?: boolean,
  specializationId?: string,
  date?: string,
  cityId?: string,
  search?: string,
  doctorType?: string,
  day?: string,
  medium?: string
) {
  console.log(
    pageCount,
    pageSize,
    isVerified,
    specializationId,
    date,
    cityId,
    search,
    doctorType,
    day,
    medium
  );
  try {
    const response = await axiosInstance.get(`/api/v1/doctor/filter`, {
      params: {
        pageCount,
        pageSize,
        isVerified,
        specializationId,
        date,
        cityId,
        search,
        doctorType,
        day,
        medium,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("Error fetching doctor data:", error);
  }
}

// export async function createDoctor( formData: DoctorFormData) {

// try {
//     const payload = {
//       registerRequest: {
//         firstName: formData?.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         password: formData.password,
//         phoneNo: formData.phoneNo,
//         dateOfBirth: formData.dateOfBirth,
//         gender: formData.gender,
//         role: 4,
//       },
//       bio: formData.bio,
//       qualification: formData.qualification,
//       experience: formData.experience,
//       paymentPerSession: Number(formData.paymentPerSession) || 0,
//       consultationDuration: Number(formData.consultationDuration) || 0,
//       specializationId: Number(formData.specializationId) || 0,
//     };

//     const response = await axiosInstance.post('/api/v1/doctor', payload);
//     return response?.data;
//   } catch (error) {
//     console.error('Error creating doctor:', error);
//     throw error;
//   }
// }

export async function createDoctor(formData: DoctorFormData) {
  try {
    const updatedData = {
      registerRequest: {
        firstName: formData?.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNo: formData.phoneNo,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        role: 3,
      },
      bio: formData.bio,
      qualification: formData.qualification,
      experience: formData.experience,
      paymentPerSession: Number(formData.paymentPerSession) || 0,
      consultationDuration: Number(formData.consultationDuration) || 0,
      specializationId: Number(formData.specializationId) || 0,
    };
    const formDataToSend = new FormData();
    formDataToSend.append("doctorRequest", JSON.stringify(updatedData));
    // if (formData.image instanceof File) {
    //   formDataToSend.append("image", formData.image);
    // }

    formDataToSend.forEach((value, key) => console.log(`${key}:`, value));
    const response = await axiosInstance.post(
      "/api/v1/doctor",
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response?.data.............createDoctor", response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw error;
  }
}

interface DayAllocationRequest {
  day: string;
  startTime: string;
  endTime: string;
}

export async function allocateTimeSlot(
  id: string,
  dayAllocationRequestList: DayAllocationRequest[]
) {
  try {
    const response = await axiosInstance.put(
      `/doctor/${id}/dayAllocation`,
      dayAllocationRequestList
    );
    console.log("Time slot allocated", response);
    return response?.data;
  } catch (error) {
    console.log("Error allocating time slot:", error);
    throw error;
  }
}

export async function archiveDoctorById(id: string) {
  try {
    const response = await axiosInstance.put(`/doctor/active?id=${id}`);
    return response?.data;
  } catch (error) {
    console.log("Error archiving users", error);
  }
}
