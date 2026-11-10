import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL:"https://chat-app-2kv5.onrender.com/api",
//     timeout:30000,
//     headers:{
//         "Content-Type":"application/json",
//     },
//     withCredentials:true,
// });

export const axiosInstance = axios.create({
    baseURL:"http://localhost:3000/api",
    timeout:30000,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true,
});
