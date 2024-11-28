import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HLSPlayer from "../components/hls";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const DisplayVideo = () => {
  const location = useLocation();
  const formData = location.state;
  const videoURL = formData?.indexInfo?.hls?.video_url;
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBackClick = () => {
    navigate(`/data/${id}`);
  };

  return (
    <div className="h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images.jpeg)",
          filter: "blur(5px)",
          zIndex: -1,
        }}
      ></div>
      <span
        className="flex cursor-pointer items-end absolute bottom-5 left-5"
        onClick={handleBackClick}
      >
        <MdArrowBack className="text-white text-3xl mt-5 ml-5"></MdArrowBack>
        <h2 className="text-white mt-6 ml-5">Back to Video Collections</h2>
      </span>

      <div className="overflow-hidden w-full">
        <div className="marquee-content animate-marquee mt-5">
          <p className="text-xl font-semibold text-white">
            {formData.videoData.RaceName}
          </p>
        </div>
      </div>
      <div className="h-screen flex items-center">
        <div className="videoDisplay h-2/3 w-60 bg-white ml-44 mb-20"></div>
        <HLSPlayer src={videoURL}></HLSPlayer>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default DisplayVideo;
