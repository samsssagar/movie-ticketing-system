import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL
});

axiosInstance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.access_token) {
        config.headers.Authorization = `Bearer ${user.access_token}`;
    }
    return config;
});