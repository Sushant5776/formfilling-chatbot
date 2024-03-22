import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json()

  const chat = model.startChat({
    generationConfig: {
      maxOutputTokens: 100,
    },
  })

  const result = await chat.sendMessage(body.send_message);
  const response = await result.response;
  const text = response.text();

  return NextResponse.json({ output: text}, { status: 200 })  
}