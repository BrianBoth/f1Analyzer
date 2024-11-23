import mongoose from "mongoose";

const videoShema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  videoData: {
    type: Array,
    required: true,
  },
});

export const userVideoData = mongoose.model("userVideoData", videoShema);
