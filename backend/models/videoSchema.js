import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    content_type: {
      type: String,
      required: true,
    },
    metadata: {
      indexID: {
        type: String,
        required: true,
      },
      customID: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
