// "use server";
import axios, { AxiosInstance, AxiosHeaders } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: new AxiosHeaders({
    'Content-Type': 'application/json',
  }),
});
axiosInstance.interceptors.request.use(
  async (config) => {
    console.log('🚀 ~ config:', config);
    const headers =
      config.headers instanceof AxiosHeaders
        ? config.headers
        : AxiosHeaders.from(config.headers || {});

    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`);
    // }

    if (config.data instanceof FormData) {
      headers.set('Content-Type', 'multipart/form-data');
    }

    return { ...config, headers };
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Authentication error. Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

// Create the Axios instance

export default axiosInstance;
