// app/api/ai/describe/route.js
export const runtime = 'nodejs';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access the key WITHOUT "NEXT_PUBLIC_" for server-side safety
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    // 1. Check if API Key exists
    if (!process.env.GEMINI_API_KEY) {
       return new Response(JSON.stringify({ error: "API Key is missing from server environment" }), { status: 500 });
    }

    const body = await req.json();
    const data = body.data;

    if (!data) {
      return new Response(JSON.stringify({ error: "No data provided" }), { status: 400 });
    }

    const prompt = `
      You are a business analytics assistant.
      Analyze the followind sales with simple one or two phrase.

      Data:
      ${JSON.stringify(data, null, 2)}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent(prompt);
    
    // 2. Await the response text properly
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ description: text }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("AI ERROR:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}