const MessagesLoadingSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
<<<<<<< HEAD
      {[...Array(6)].map((_,index) => (
        <div key={index}
        className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}
        >
=======
      {[...Array(6)].map((_,index)=>(
        <div 
        key={index}
        className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}>
>>>>>>> 0375bdea59d4ba405226f3ef257a147c87e20e17
            <div className={`chat-bubble bg-slate-800 text-white w-32`}></div>
        </div>
      ))}
    </div>
  )
}

export default MessagesLoadingSkeleton;
