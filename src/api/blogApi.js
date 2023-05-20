import axios from "axios";


export const blogApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

