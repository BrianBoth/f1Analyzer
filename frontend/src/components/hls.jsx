import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const HLSPlayer = ({
  src,
  width = "840px",
  height = "572px",
  onTimeUpdate,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();

      hls.loadSource(src);

      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS Manifest loaded!");
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
    }
  }, [src]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (onTimeUpdate && videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        onTimeUpdate(currentTime);
      }
    };

    const videoElement = videoRef.current;
    videoElement?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [onTimeUpdate]);

  return (
    <div className="mb-20">
      <video
        ref={videoRef}
        controls
        style={{ width, height, backgroundColor: "black" }}
        id="myVideo"
      ></video>
    </div>
  );
};

export default HLSPlayer;
