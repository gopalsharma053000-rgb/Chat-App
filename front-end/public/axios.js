import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://chat-app-2kv5.onrender.com/api";

export const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:30000,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true,
});

