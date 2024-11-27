import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HLSPlayer from "../components/hls";

const DisplayVideo = () => {
  const location = useLocation();
  const formData = location.state;
  const videoURL = formData.indexInfo.hls.video_url;

  useEffect(() => {
    console.log(formData);
  }, []);

  return (
    <div>
      DisplayVideo
      <HLSPlayer src={videoURL}></HLSPlayer>
    </div>
  );
};

export default DisplayVideo;
