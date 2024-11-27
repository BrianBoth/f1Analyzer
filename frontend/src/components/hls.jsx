import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const HLSPlayer = ({ src, width = "640px", height = "360px" }) => {
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

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width, height, backgroundColor: "black" }}
      ></video>
    </div>
  );
};

export default HLSPlayer;
