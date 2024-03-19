import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

const { BASE_URL } = process.env;
const axiosInterceptorInstance = axios.create({
    baseURL: BASE_URL,
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
    config => {
        // Modify the request config here (add headers, authentication tokens)
        // If token is present add it to request's Authorization Header
        return config;
    },
    error => {
        // Handle request errors here
        return Promise.reject(error);
    },
);
// End of Request interceptor

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
    response => {
        // Modify the response data here
        return response;
    },
    (error: AxiosError) => {
        // Handle response errors here
        return Promise.reject(redirect('/'));
    },
);
// End of Response interceptor

export default axiosInterceptorInstance;
