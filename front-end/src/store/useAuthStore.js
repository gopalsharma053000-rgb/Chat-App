import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// const BASE_URL = "https://chat-app-2kv5.onrender.com";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" :"/";

export const useAuthStore = create((set,get) => ({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingIn:false,
    socket:null,
    onlineUsers:[],

    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
            console.log("Error in authCheck:",error);
            set({authUser:null});
        } finally{
            set({ isCheckingAuth:false});
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            console.error("SignUp error",error);
            const msg = error.response?.data?.message || error.message || "Network error, please try again!";
            toast.error(msg);
        }finally{
            set({isSigningUp:false})
        }
    }, 

    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            console.error("LoginUp error",error);
            const msg = error.response?.data?.message || error.message || "Network error, please try again!";
            toast.error(msg);
        }finally{
            set({isLoggingIn:false})
        }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out Successfully");
            get().disconnectSocket();
        } catch (error) {
            console.error("Logout error",error);
            toast.error("Error logging out");
        }
    },

    updateProfile:async(data)=>{
        try {
            const res = await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("Error in update profile",error);
            const msg = error.response?.data?.message || error.message || "Error in update profile";
            toast.error(msg);
        }
    },

    connectSocket:() =>{
        const { authUser} = get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            withCredentials:true,
            transports: ["websocket", "polling"],
        })

        socket.connect()
        set({ socket })

        //listen for online users event
        socket.on("getOnlineUsers", (userIds) =>{
            set({onlineUsers:userIds})
        })
    },

    disconnectSocket:() =>{
        if(get().socket?.connected) get().socket.disconnect()
    },
}));