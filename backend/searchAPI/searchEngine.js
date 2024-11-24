// Import the googleapis and dotenv modules using ES module syntax
import { google } from "googleapis";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

// Set up API Key and Custom Search Engine ID
const apiKey = process.env.SEARCH_ENGINE_KEY;
const cseId = process.env.SEARCH_ENGINE_ID;

// Function to search for an image
export async function googleImageSearch(query) {
  try {
    // Build the custom search service
    const customSearch = google.customsearch("v1");

    // Execute the image search query
    const response = await customSearch.cse.list({
      q: query, // The search query
      cx: cseId, // Custom Search Engine ID
      searchType: "image", // Ensures it's an image search
      num: 1, // Retrieve 10 results
      auth: apiKey, // API Key
    });

    const items = response.data.items || [];
    for (let item of items) {
      const imageUrl = item.link;
      return imageUrl; // Return the first valid image URL
    }

    return "No suitable image found (jpg or png).";
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    return null;
  }
}

export async function renderImages(playerData, queryType) {
  let links = [];
  const races = playerData["Races"].map((item) => item["Car"]);

  // IMG RENDER
  for (const el of races) {
    let queryString;
    if (queryType === "car") {
      queryString = `${playerData["SportName"]} ${playerData["Year"]} ${el["Make"]} Number ${el["Number"]}`;
    } else if (queryType === "racer") {
      queryString = `${el["Driver"]}`;
    } else if (queryType === "raceTrack") {
      queryString = playerData["RaceName"];
    }
    const searchResult = await googleImageSearch(queryString);

    // Assuming searchResult returns the URL of the image
    if (searchResult) {
      links.push(searchResult);
    } else {
      console.log("No image found.");
    }
  }
  return links;
}
