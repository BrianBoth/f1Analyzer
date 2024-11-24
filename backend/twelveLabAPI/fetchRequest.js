import dotenv from "dotenv";
import { twelveLabQuery } from "../queries.js";
import fetch from "node-fetch";
dotenv.config();

export const generate = async (VIDEO_ID) => {
  const url = "https://api.twelvelabs.io/v1.2/generate";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temperature: 0.7,
      stream: false,
      video_id: VIDEO_ID,
      prompt: twelveLabQuery,
    }),
  };

  try {
    const response = await fetch(url, options);

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    return jsonResponse; // Return the JSON response
  } catch (err) {
    console.error("Error during request:", err.message);
    throw err; // Re-throw the error for external handling if needed
  }
};
