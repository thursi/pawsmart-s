import axiosInstance from "@/utils/client";

export async function getMedicineData(
    pageCount?: number,
    pageSize?: number,
    name?: string,
    // date?:string
  ) {
    try {
      console.log("objectnamedate",name)
      const response = await axiosInstance.get(`/medicine/filter`, {
        params: {
          pageCount: pageCount,
          pageSize: pageSize,
          name: name ? name : undefined,
          // date: date ? date : undefined,
  // 
        },
      });
      return response?.data;
    } catch (error) {
      console.log("Error fetching medicine data:", error);
    }
  }