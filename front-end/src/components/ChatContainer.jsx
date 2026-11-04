<<<<<<< HEAD
import { useEffect, useRef } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> 0375bdea59d4ba405226f3ef257a147c87e20e17
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

const ChatContainer = () => {

  const { selectedUser,messages, getMessagesByUserId,isMessagesLoading} = useChatStore();
  const {authUser} = useAuthStore();
<<<<<<< HEAD
  const messageEndRef = useRef(null);
=======
 
>>>>>>> 0375bdea59d4ba405226f3ef257a147c87e20e17

  useEffect(()=> {
    if(selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
  },[selectedUser?._id, getMessagesByUserId]);

  // useEffect(()=>{
  //   getMessagesByUserId(selectedUser._id);
  // },[selectedUser,getMessagesByUserId]);

  useEffect(()=> {
    if(messageEndRef.current){
      messageEndRef.current.scrollIntoView({ behavior:"smooth"});
    }
  },[messages]);

  return (
    <>
    <ChatHeader/>
    <div className="flex-1 px-6 overflow-auto py-6">
      {messages.length > 0 && !isMessagesLoading ? (
        <div className="max-w-3xl mx-auto space-y-6">
<<<<<<< HEAD
          {messages.map(msg => (
            <div key={msg._id}
            className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            >
              <div className={`chat-bubble relative ${
                msg.senderId === authUser._id
                ? "bg-cyan-600 text-white"
                : "bg-slate-800 text-slate-200"
              }`
              }>
                {msg.image && (
                  <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover"/>
                )}
                {msg.text && <p className="mt-2">{msg.text}</p>}
                <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                  {/* {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})} */}
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : ""}
                </p>
              </div>
            </div>
          ))}
          <div ref={messageEndRef}/>
        </div>
      ) : isMessagesLoading ? <MessagesLoadingSkeleton/> : (
        <NoChatHistoryPlaceholder name={selectedUser.fullName}/>
      )}
    </div>
    <MessageInput/>
=======
          {messages.map(msg =>(
            <div key={msg._id}
            className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            >
              <div className={`chat-bubble relative ${msg.senderId === authUser._id ? 
              "bg-cyan-600 text-white" :
               "bg-slate-800 text-slate-200"}`}
               >
                {msg.image && (
                  <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-contain"/>
                )}
                {msg.text && <p className="mt-2">{msg.text}</p>}
                <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                  {new Date(msg.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",})}
                </p>
               </div>
            </div>
          ))}
        </div>
      ) : isMessagesLoading ? (
        <MessagesLoadingSkeleton/>
      ) : (
        <NoChatHistoryPlaceholder name={selectedUser.fullName}/>
      )}
    </div>
    <MessageInput />
>>>>>>> 0375bdea59d4ba405226f3ef257a147c87e20e17
    </>
  )
}

export default ChatContainer;
