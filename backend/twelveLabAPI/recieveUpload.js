import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

export const uploadData = async (VIDEO_IDENTIFIER) => {
  const url = `https://api.twelvelabs.io/v1.2/tasks/${VIDEO_IDENTIFIER}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json; // Return the JSON response
  } catch (err) {
    console.error("Error during upload:", err.message);
    throw err; // Re-throw the error if you need it handled elsewhere
  }
};
