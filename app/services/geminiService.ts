
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  // In accordance with best practices, we initialize the client inside methods 
  // to ensure the latest API configuration is used for each request.

  async sendMessage(history: Message[], userInput: string): Promise<string> {
    try {
      // Always initialize with process.env.API_KEY directly
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: [
          ...history.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userInput }] }
        ],
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
          // Removed maxOutputTokens to avoid blocking responses when using thinking models 
          // without an explicit thinkingBudget.
        }
      });

      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I'm having trouble connecting to my brain right now. Please try again later!";
    }
  }
}

export const geminiService = new GeminiService();
