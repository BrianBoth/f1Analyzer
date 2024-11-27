import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HLSPlayer from "../components/hls";

const DisplayVideo = () => {
  const location = useLocation();
  const formData = location.state;
  console.log("formmm", formData);
  const videoURL = formData?.indexInfo?.hls?.video_url;
  console.log(videoURL);

  return (
    <div>
      DisplayVideo
      <HLSPlayer src={videoURL}></HLSPlayer>
    </div>
  );
};

export default DisplayVideo;
