// uploads video to create video index
import fetch from "node-fetch";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const upload = async (INDEX_ID, file) => {
  const formData = new FormData();

  formData.append("provide_transcription", "false");
  formData.append("language", "en");
  formData.append("disable_video_stream", "false");
  formData.append("index_id", INDEX_ID); // Use the passed INDEX_ID parameter

  formData.append(
    "video_file",
    // add video path as parameter
    fs.createReadStream(file)
  );

  const url = "https://api.twelvelabs.io/v1.2/tasks";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-api-key": process.env.API_KEY, // Use process.env for the API key
    },
    body: formData,
  };

  try {
    const response = await fetch(url, options); // Await the fetch call

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Handle non-200 responses
    }

    const json = await response.json(); // Await the JSON response
    console.log("Upload Response:", json); // Log the response
    return json; // Return the JSON response
  } catch (error) {
    console.error("Error during upload:", error.message); // Log any errors
    throw error; // Rethrow the error if needed
  }
};
