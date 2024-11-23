import express from "express";
import { User } from "../models/userModel.js";
import { userVideoData } from "../models/videoDataModel.js";

const router = express.Router();

// Route to save new user (EX. {username: ???, password: ???, email: ???} in the body)
router.post("/signup", async (request, response) => {
  try {
    if (
      !request.body.username ||
      !request.body.password ||
      !request.body.email
    ) {
      return response.status(400).send({
        message: "Send all required fields: username, password, email",
      });
    }

    // create new user and add to user collection
    const newUser = {
      username: request.body.username,
      password: request.body.password,
      email: request.body.email,
    };
    const user = await User.create(newUser);

    // create storage for user data
    const newUserData = {
      _id: user._id,
      videoData: [],
    };
    const data = await userVideoData.create(newUserData);

    return response.status(201).send(user);
  } catch (err) {
    console.log(err.message);
    response.status(500).send({ message: err.message });
  }
});

// create login response (EX. {username: ???, password: ???} in the body)
router.post("/login", async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).send({
        message: "Username and password are required.",
      });
    }

    const user = await User.findOne({ username });
    if (!user) return response.status(404).send({ message: "user not found" });

    const passwordMatch = user.password == password;
    if (!passwordMatch)
      return response
        .status(404)
        .send({ message: "invalid username or password" });

    return response.status(200).send({
      message: "Login Successful!",
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    console.log(err);
    return response.status(500).send({ message: err.message });
  }
});

// Route to get all video entries from user
router.get("/data/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const videoData = await userVideoData.findById(id);

    return response.status(200).json(videoData);
  } catch (err) {
    console.log(err.message);
    return response.status(500).send({ message: err.message });
  }
});

// Route to add new entry (need to pass new object entry in body) (EX. "videoData": "???" in body)
// may have to put video path into body instead and call/await the twelveCall.js and put that into the newData var
router.put("/data/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const videoData = await userVideoData.findById(id);
    if (!videoData) {
      return response.status(400).send({ message: "Document not found" });
    }

    const newData = request.body.videoData;
    console.log(request.body);
    videoData.videoData.push(newData);
    await videoData.save();

    return response.status(200).send({
      message: "video upload successful!",
      data: videoData,
    });
  } catch (err) {
    console.log(err.message);
    return response.status(500).send({ message: err.message });
  }
});

// route to delete a video entry (need to pass id for video in body) (EX. "videoID": "123" in body)
router.delete("/data/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const videoID = request.body.videoID;

    const videoData = await userVideoData.findById(id);
    if (!videoData) {
      return response.status(400).send({ message: "Document not found" });
    }

    // change in future to match actual data id name in object
    videoData.videoData = videoData.videoData.filter(
      (video) => video.id !== videoID
    );

    // save update video data
    await videoData.save();
    return response.status(200).send({
      message: "Video Deleted Successfully!",
      data: videoData,
    });
  } catch (err) {
    console.log(err.message);
    return response.status(500).send({ message: err.message });
  }
});

export default router;
