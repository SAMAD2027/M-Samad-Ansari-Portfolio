import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../../constants";

export async function POST(request: NextRequest) {
  try {
    const { history, userInput } = await request.json();

    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: [
        ...history.map((m: { role: string; content: string }) => ({ 
          role: m.role === 'user' ? 'user' : 'model', 
          parts: [{ text: m.content }] 
        })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ 
      response: response.text || "I'm sorry, I couldn't process that request." 
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "I'm having trouble connecting to my brain right now. Please try again later!" },
      { status: 500 }
    );
  }
}
