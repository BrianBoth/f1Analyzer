// Import axios and dotenv
import axios from "axios";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
dotenv.config();

// Configure the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

// Define the function to interact with the generative AI API
export async function generateContent(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(
      `Error occurred: ${error.response ? error.response.data : error.message}`
    );
    return null;
  }
}
