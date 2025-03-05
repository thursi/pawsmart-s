import axiosInstance from "@/utils/client";

export const getDepartmentData = async () => {
    try {
      const response = await axiosInstance.get(`/departments`);
      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  };