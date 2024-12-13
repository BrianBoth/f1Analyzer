import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HLSPlayer from "../components/hls";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const DisplayVideo = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(0);
  const formData = location.state;
  const videoURL = formData?.indexInfo?.hls?.video_url;
  const drivers = formData?.videoData?.Races;
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("forms", formData);

  const handleBackClick = () => {
    navigate(`/data/${id}`);
  };

  const handleCardDisplay = (card, index) => {
    console.log(card);
    const enter = parseFloat(card?.Timestamps?.Enter);
    const exit = parseFloat(card?.Timestamps?.Exit);
    const isVisible = currentTime >= enter && currentTime <= exit;
    console.log(enter, exit, currentTime);
    if (!isVisible) return "";

    return (
      <div
        className={`card h-32 w-full bg-black flex items-center p-4 rounded-lg gap-5 shadow-lg shadow-black/50 transition-all duration-500 ease-in-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        key={index}
        style={{
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        <img
          src={
            formData?.racers?.[index]
              ? `${formData?.racers?.[index]}`
              : "https://via.placeholder.com/150"
          }
          alt={`Driver ${index}`}
          className="max-h-full max-w-[90px] object-contain"
        />
        <div className="p-2 flex flex-col gap-2 justify-center">
          <h4 className="text-white text-xs font-sans">
            {drivers?.[index]?.Car?.Driver}
          </h4>
          <h2 className="text-white text-5xl">
            {drivers?.[index]?.Car?.Number}
          </h2>
        </div>
      </div>
    );
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
        <div className="videoDisplay h-2/3 w-60 bg-white ml-44 mb-20 flex flex-col p-4 gap-4 rounded-lg overflow-y-auto">
          {drivers.map((driver, index) => {
            return handleCardDisplay(driver, index);
          })}
        </div>
        <HLSPlayer
          src={videoURL}
          onTimeUpdate={(currentTime) => setCurrentTime(currentTime)}
        ></HLSPlayer>
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
