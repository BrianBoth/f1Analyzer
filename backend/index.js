import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (request, response) => {
  return response.status(234).send("Its Working!");
});

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
