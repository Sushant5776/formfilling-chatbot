"use client"
import React, { useState } from 'react'
import ContactForm from './components/ContactForm'
import Chatbot from './components/ChatBoat'

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const Home = () => {
  const [showChatbot, setShowChatbot] = useState<Boolean>(false);
  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{role: string, parts: [{text: string}]}[]>([
    {
      role: "model",
      parts: [{text: JSON.stringify({user_inform_response: "Hello! I am ChatterBot. I am here to help you fill the form?"})}],
    }
  ])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callGetResponse();
    }
  }

  const callGetResponse = async () => {
    setIsLoading(true);
    let temp = messages;
    let send_message = `extract details like name, email, phone number, and address from the input: ${theInput} along with one liner response for which if no info is extracted from the input then fill keys in json response with null and use input and generate appropriate content to ask for info or greet him about I am excited to help you etc. in user_inform_response key this key should never be empty and respond with the extracted details as json with keys name, email, phone, and address, user_inform_response in {"name": "", email:"", phone:"", address:"", user_inform_response:""} strictly provide json object only by filling appropriate keys and without any other character.`;
    let history = messages;
    temp.push({ role: "user", parts: [{text: theInput}] });
		setMessages(temp)
    setTheInput("");
    console.log("Calling Gemini...");

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ history, send_message }),
    })

    const data = await response.json();
    const { output } = data;
    setFormData(JSON.parse(output))
    console.log("Gemini replied...", output);

    setMessages((prevMessages) => [...prevMessages, {role: 'model', parts: [{text: output}]}]);
    setIsLoading(false);
  }

  return (
    <div className='h-fit w-full bg-zinc-900 text-white relative'>
      <section id='home' className='h-dvh w-full p-5'>
        <h1 className='mb-5'>home</h1>
        <ContactForm formData={formData} setFormData={setFormData} />
      </section>
      <section id='about' className='h-dvh w-full bg-zinc-600 p-5 text-zinc-800'>
        <h1>about</h1>
      </section>
      <div className={`fixed right-5 bottom-5 w-fit h-fit flex flex-col items-end gap-2 pl-5 ${showChatbot?'h-dvh bg-opacity-40': ''}`}>
        {showChatbot && <Chatbot Submit={submit} callGetResponse={callGetResponse} setTheInput={setTheInput} messages={messages} theInput={theInput} isLoading={isLoading} />}
        <button onClick={() => setShowChatbot((prev) => !prev)} className='w-14 h-14 rounded-full rounded-br-none bg-indigo-400 text-center text-sm shadow-lg shadow-indigo-800'>{!showChatbot? 'chat' : 'close'}</button>
      </div>
    </div >
  )
}

export default Home
