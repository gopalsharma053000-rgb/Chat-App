import { create } from "zustand";
import {axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";
<<<<<<< HEAD

=======
>>>>>>> 0375bdea59d4ba405226f3ef257a147c87e20e17

 
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

<<<<<<< HEAD
    sendMessage:async(messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;
=======
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState()

        const currentMessages = Array.isArray(messages) ? messages : [];

        const tempId = `temp-${Date.now()}`
>>>>>>> 0375bdea59d4ba405226f3ef257a147c87e20e17

        const optimisticMessage = {
            _id:tempId,
            senderId:authUser._id,
            receiverId:selectedUser._id,
            text:messageData.text,
            image:messageData.image,
            createdAt: new Date().toISOString(),
<<<<<<< HEAD
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
=======
            isOptimistic:true
        }
        //immidetaly update the UI by adding the message
        set({messages: [...currentMessages,optimisticMessage]});

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            // set({messages:messages.concat(res.data)});
            // set({ messages: [...(messages || []), res.data] });
            const updatedMessages = get().messages.map((msg) => 
            msg._id === tempId ? res.data : msg
        );
        set({messages:updatedMessages});
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
             set({messages:currentMessages})
        }
    },
}));
>>>>>>> 0375bdea59d4ba405226f3ef257a147c87e20e17
