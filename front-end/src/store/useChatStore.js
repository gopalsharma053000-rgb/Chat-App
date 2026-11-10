import { create } from "zustand";
import {axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

 
export const useChatStore = create((set,get)=> ({
    allContacts:[],
    chats:[], 
    messages:[],
    activeTab:"chats",
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound:()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled)
        set({isSoundEnabled:!get().isSoundEnabled})
    },

    setActiveTab:(tab)=> set({activeTab:tab}),
    setSelectedUser:(selectedUser)=> set({selectedUser:selectedUser}),

    getAllContacts:async() => {
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts:res.data});
        } catch (error) {
            toast.error(error.response?.data?.messages);
        } finally{
            set({isUsersLoading:false});
        }
    },

    getMyChatPartners: async() => {
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({chats:res.data});
        } catch (error) {
            toast.error(error.response?.data?.messages);
        } finally{
            set({isUsersLoading:false});
        }
    },

    getMessagesByUserId: async(userId) => {
        set({isMessagesLoading:true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data.message || res.data});
        } catch (error) {
            toast.error(error.response?.data?.messages || "Something went wrong");
        } finally{
            set({isMessagesLoading:false});
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState()

        const currentMessages = Array.isArray(messages) ? messages : [];

        const tempId = `temp-${Date.now()}`

        const optimisticMessage = {
            _id:tempId,
            senderId:authUser._id,
            receiverId:selectedUser._id,
            text:messageData.text,
            image:messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic:true,
        };

        const currentMessage = Array.isArray(messages) ? messages : [];
        set({messages:[...currentMessage,optimisticMessage] });

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            get().getMyChatPartners();
            const currentMessage = Array.isArray(messages) ? messages : [];
            set({messages:currentMessage.concat(res.data)});
        } catch (error) {
            set({messages:currentMessage});
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },
}))
        