"use client"

const Chatbot: React.FC<{messages: any, theInput: string, isLoading: boolean, setTheInput: (val: string) => void, Submit: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void, callGetResponse: () => void}> = ({messages, theInput, isLoading, setTheInput, Submit, callGetResponse}) => {
  return (
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
