// import axiosInstance from '@/utils/client';

// export interface PetCreateProps {
//   name: string;
//   petType: string;
//   breed: string;
//   age: number;
//   weight: number;
//   medicalConditions?: string[];
//   userId: number;
//   genderType: string;
// }

// export async function petById(id: string) {
//   try {
//     const response = await axiosInstance.get(`/api/v1/pet/${id}`);
//     return response?.data;
//   } catch (error) {
//     console.log('Error archiving bookings', error);
//   }
// }

// export const createPetEffect = async (data: any) => {
//   try {
//     const { image, ...updatedData } = data;

//     const formData = new FormData();

//     if (data.image instanceof File) {
//       formData.append('image', image);
//     }
//     formData.append('petRequest', JSON.stringify(updatedData));

//     formData.forEach((value, key) => console.log(`${key}:`, value));

//     const res = await axiosInstance.post(`/api/v1/pet`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return res;
//   } catch (err) {
//     console.error('Error uploading pet data:', err);
//     throw err;
//   }
// };

// export const getPetFilterData = async (params: {
//   pageCount: number;
//   pageSize: number;
//   userId: number;
// }) => {
//   try {
//     const response = await axiosInstance.get(`api/v1/pet/filter?`, {
//       params: {
//         pageSize: params?.pageSize,
//         pageCount: params?.pageCount,
//         userId: params?.userId,
//       },
//     });
//     console.log('response...............', response);

//     return response.data;
//   } catch (error) {
//     console.log('error', error);
//   }
// };

// export const petUpdate = async (data: any, id: string) => {
//   try {
//     const { image, ...updatedData } = data;
//     const formData = new FormData();

//     if (data.image instanceof File) {
//       formData.append('image', image);
//     }
//     formData.append('petRequest', JSON.stringify(updatedData));
//     formData.forEach((value, key) => console.log(`${key}:`, value));
//     const res = await axiosInstance.put(`/api/v1/pet/${id}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return res;
//   } catch (err) {
//     console.error('Error uploading pet data:', err);
//     throw err;
//   }
// };

// export const petHealthRecordUpdate = async (data: any, id: string) => {
//   try {
//     const { documents, otherTreatment, ...pastTreatments } = data;
//     const formData = new FormData();

//     if (data.image instanceof File) {
//       formData.append('petDocuments', documents);
//     }
//     formData.append('healthRecordRequest', JSON.stringify(pastTreatments));
//     formData.forEach((value, key) => console.log(`${key}:`, value));
//     const res = await axiosInstance.put(
//       `/api/v1/pet/${id}/upload-health-record`,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     return res;
//   } catch (err) {
//     console.error('Error uploading pet data:', err);
//     throw err;
//   }
// };

import axiosInstance from '@/utils/client';

export interface PetCreateProps {
  name: string;
  petType: string;
  breed: string;
  age: number;
  weight?: number;
  medicalConditions?: string[];
  userId: number;
  genderType: string;
  image?: File;
}

export interface PetFilterParams {
  pageCount: number;
  pageSize: number;
  userId: number;
}

export interface HealthRecordUpdateProps {
  documents?: File;
  pastTreatments: Record<string, unknown>; // Adjust based on actual structure
}

/**
 * Fetch pet details by ID
 */
export async function petById(id: string) {
  try {
    const response = await axiosInstance.get(`/api/v1/pet/${id}`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching pet details:', error);
    throw error;
  }
}

/**
 * Create a new pet
 */
export const createPetEffect = async (data: PetCreateProps) => {
  try {
    const { image, ...updatedData } = data;
    const formData = new FormData();

    if (image) {
      formData.append('image', image);
    }
    formData.append('petRequest', JSON.stringify(updatedData));
    const res = await axiosInstance.post(`/api/v1/pet`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data;
  } catch (err) {
    console.error('Error uploading pet data:', err);
    throw err;
  }
};

/**
 * Get filtered pet data
 */
export const getPetFilterData = async (params: PetFilterParams) => {
  try {
    const response = await axiosInstance.get(`api/v1/pet/filter`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
        userId: params.userId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching filtered pet data:', error);
    throw error;
  }
};

/**
 * Update pet details
 */
export const petUpdate = async (data: PetCreateProps, id: string) => {
  try {
    const { image, ...updatedData } = data;
    const formData = new FormData();

    if (image) {
      formData.append('image', image);
    }
    formData.append('petRequest', JSON.stringify(updatedData));

    const res = await axiosInstance.put(`/api/v1/pet/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data;
  } catch (err) {
    console.error('Error updating pet data:', err);
    throw err;
  }
};

/**
 * Update pet health record
 */
export const petHealthRecordUpdate = async (
  data: HealthRecordUpdateProps,
  id: string
) => {
  try {
    const { documents, ...pastTreatments } = data;
    const formData = new FormData();

    if (documents) {
      formData.append('petDocuments', documents);
    }
    formData.append('healthRecordRequest', JSON.stringify(pastTreatments));

    const res = await axiosInstance.put(
      `/api/v1/pet/${id}/upload-health-record`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return res.data;
  } catch (err) {
    console.error('Error updating pet health record:', err);
    throw err;
  }
};
