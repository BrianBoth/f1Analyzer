import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import fetch from "node-fetch";
import { index as formIndex } from "./index.js";
import { upload as uploadVideo } from "./uploadVid.js";
import { uploadData as recieveDataUpload } from "./recieveUpload.js";
import { generate } from "./fetchRequest.js";
import { generateContent } from "../SearchAPI/gemini.js";
import { queryData } from "../queries.js";
import { googleImageSearch, renderImages } from "../SearchAPI/searchengine.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// call when they put all form data in front end
export const mainTwelveCall = async function (index, filePath) {
  try {
    console.log("main", index, filePath);
    // Create the index
    console.log(index, filePath);
    const indexResp = await formIndex(index);
    const INDEX_ID = indexResp._id;
    console.log(`Index created with ID: ${INDEX_ID}`);

    // Upload video using the index ID
    const uploadResp = await uploadVideo(INDEX_ID, filePath);
    const TASK_ID = uploadResp._id;
    console.log(uploadResp);
    console.log(`Video uploaded with ID: ${TASK_ID}`);

    // pass the upload response (._id)
    let videoData = await recieveDataUpload(TASK_ID);
    console.log(videoData);

    const VIDEO_ID = videoData.video_id;
    console.log("VIDEO_ID", VIDEO_ID);

    if (videoData) {
      while (videoData.status != "ready") {
        await sleep(8000);
        videoData = await recieveDataUpload(TASK_ID);
        console.log(videoData);
      }
    }

    // generate analysis
    const generateRes = await generate(VIDEO_ID);

    // convert to lists
    const query = `${queryData} ${generateRes.data} `;
    const chatBotRes = await generateContent(query);

    const cleanedChatBotRes = chatBotRes.replace(/```json|```/g, "");
    // Extracts racers and data
    const playerData = JSON.parse(cleanedChatBotRes);

    // IMG RENDER
    const linkListCar = await renderImages(playerData, "car");
    const linkListPerson = await renderImages(playerData, "racer");
    const linkListRaceTrack = await renderImages(playerData, "raceTrack");

    // maybe add extra video data
    const masterData = {
      indexInfo: videoData,
      videoData: playerData,
      raceIMG: linkListRaceTrack,
      cars: linkListCar,
      racers: linkListPerson,
    };
    console.log(masterData);

    return masterData;
  } catch (error) {
    console.error("Error in mainTwelveCall process:", error.message);
  }
};
