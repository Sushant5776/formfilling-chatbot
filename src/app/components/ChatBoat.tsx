"use client"

const Chatbot: React.FC = ({messages, theInput, isLoading, setTheInput, Submit, callGetResponse} : any) => {
  return (
    // <div className="max-w-sm mx-auto p-4 bg-indigo-200 rounded-lg shadow-md text-zinc-700">
    //   <div className="h-40 overflow-y-auto">
    //     {messages.map((message) => (
    //       <div
    //         key={message.id}
    //         className={`mb-2 p-2 w-fit rounded-lg ${message.sender === 'user' ? 'bg-blue-300 self-end' : 'bg-indigo-200 self-start'
    //           }`}
    //       >
    //         <p className="text-sm">{message.text}</p>
    //       </div>
    //     ))}
    //   </div>
    //   <form onSubmit={handleMessageSubmit} className="mt-4 flex">
    //     <input
    //       type="text"
    //       value={inputText}
    //       onChange={(e) => setInputText(e.target.value)}
    //       placeholder="Type your message..."
    //       className="flex-grow p-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />
    //     <button
    //       type="submit"
    //       className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     >
    //       Send
    //     </button>
    //   </form>
    // </div>
      <div
        className="flex h-[25rem] w-[25rem] flex-col items-center bg-gray-600 rounded-xl"
      >
        <div
          className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full"
        >
          <div className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
  {messages.map((e: any) => {
    return (
      <div
        key={e.parts[0].text}
        className={`w-max max-w-[18rem] rounded-md px-4 py-3 h-min ${
          e.role === "model"
            ? "self-start  bg-gray-200 text-gray-800"
            : "self-end  bg-gray-800 text-gray-50"
        } `}
      >
        {e.role === 'model' ? JSON.parse(e.parts[0].text).user_inform_response: e.parts[0].text}
      </div>
    );
  })}



  {isLoading ? <div className="self-start bg-gray-200 text-gray-800 w-max max-w-[18rem] rounded-md px-4 py-3 h-min">*thinking*</div> : ""}
</div>
        </div>
        <div className="relative  w-[80%] bottom-4 flex justify-center">
          <textarea value={theInput} onChange={(event) =>
          setTheInput(event.target.value)} className="w-[85%] h-10 px-3 py-2
          resize-none overflow-y-auto text-black bg-gray-300 rounded-l outline-none"
          onKeyDown={Submit} />
          <button
            onClick={callGetResponse}
            className="w-fit bg-blue-500 px-4 py-2 rounded-r"
          >
            send
          </button>
        </div>
      </div>
  );
};

export default Chatbot;
