import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import { userVideoData } from "./models/videoDataModel.js";
import userRoute from "./routes/userRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  return response.status(234).send("Its Working!");
});

app.use("/", userRoute);

app.use(
  cors({
    origin: "http://localhost:5555",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    const dbName = mongoose.connection.name;
    console.log(`App Connected to Database: ${dbName}`);
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
