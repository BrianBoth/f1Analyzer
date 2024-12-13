// creates index key
import axios from "axios";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config({ path: "../.env" });

export const index = async (INDEX_NAME) => {
  const url = "https://api.twelvelabs.io/v1.3/indexes";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      models: [
        {
          model_options: ["visual", "audio"],
          model_name: "pegasus1.1",
        },
      ],
      index_name: INDEX_NAME,
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // If the response is not ok, throw an error
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json(); // Parse the JSON response
    return json; // Return the JSON response
  } catch (error) {
    console.error("Error during the request:", error.message);
    throw error; // Rethrow the error if you want to handle it elsewhere
  }
};
