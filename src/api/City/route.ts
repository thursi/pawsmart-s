import axiosInstance from "@/utils/client";


  export async function getAllcity(
    pageCount?: number,
    pageSize?: number,
  ) {
    try {
      const response = await axiosInstance.get(`/api/v1/city/filter`, {
        params: {
          pageCount: pageCount,
          pageSize: pageSize,
        },
      });
      return response?.data;
    } catch (error) {
      console.log('Error fetching doctor data:', error);
    }
  }
  