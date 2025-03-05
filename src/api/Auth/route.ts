'use server';

import axiosInstance from '@/utils/client';
import { cookies } from 'next/headers';

export async function loginUser(userData: {
  userName: string;
  password: string;
}) {
  const cookieStore = cookies();

  try {
    const response = await (
      await axiosInstance
    ).post('/api/v1/admin/auth', {
      userName: userData.userName,
      password: userData.password,
    });
    console.log('🚀 ~ token', response?.data?.token);

    (await cookieStore).set('token', JSON.stringify(response?.data?.token), {
      maxAge: 86400,
    });
    console.log('response.data loginthusiiiiiii', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}
export async function registerUser(userData: {
  password: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: number;
  image?: File;
}) {
  const cookieStore = cookies();
  try {
    const formData = new FormData();
    if (userData.image instanceof File) {
      formData.append('image', userData.image);
    }
    const updatedData = {
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: 4,
    };

    formData.append('registerRequest', JSON.stringify(updatedData));
    const response = await axiosInstance.post('/api/v1/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    (await cookieStore).set('token', JSON.stringify(response?.data?.token), {
      maxAge: 86400,
    });

    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function forgotPassword(email: string) {
  try {
    const response = await (
      await axiosInstance
    ).post(`/api/v1/user/forgotPassword/${email}`, {});

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function resetPassword(userData: {
  otp: string;
  password: string;
}) {
  try {
    const response = await (
      await axiosInstance
    ).put(`/api/v1/user/resetPassword`, {
      otp: userData.otp,
      password: userData.password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
