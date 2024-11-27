import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const UserVideos = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clickedCard, setClickedCard] = useState();
  const navigate = useNavigate();
  const videoRefs = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    axios
      .get(`http://localhost:5555/data/${id}`)
      .then((res) => {
        if (isMounted) {
          setVideoData(res.data.videoData.videoData);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log(videoData);

  const handleVideoClick = (video) => {
    navigate(`/displayVideo/${id}`, { state: video });
  };

  const handleSearch = (e) => {
    console.log(videoRefs);
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);

    const index = videoData.findIndex((video) =>
      video?.videoData?.RaceName?.toLowerCase().includes(input)
    );
    if (index !== -1 && videoRefs.current[index]) {
      videoRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
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
      {loading && <Spinner />}
      <div className="nav w-screen border border-black flex items-center p-4">
        <div className="search flex items-center bg-white border border-black rounded-lg flex-grow p-2">
          <MdSearch className="text-2xl text-black" />
          <input
            type="text"
            placeholder="Enter Video Name"
            value={searchTerm}
            onChange={handleSearch}
            className="flex-grow ml-2 outline-none text-gray-800 p-1"
          />
        </div>
        <Link to={`/addVideo/${id}`} className="addVid ml-6 relative group">
          <MdOutlineAddBox className="text-white text-4xl" />
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg px-2 py-1">
            Add Video
          </span>
        </Link>
      </div>
      <div className="cardContainer max-h-screen overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-12">
        {videoData
          .filter((video) => video)
          .map((video, index) => {
            if (video) {
              return (
                <div
                  key={index}
                  className="relative"
                  ref={(el) => (videoRefs.current[index] = el)}
                >
                  <div
                    className="card h-60 w-60 bg-white flex-shrink-0 rounded-2xl flex flex-col items-center justify-end cursor-pointer transform hover:scale-105 transition-all duration-300"
                    style={{
                      backgroundImage: video?.raceIMG?.[0]
                        ? `url(${video.raceIMG[0]})`
                        : "url('/placeholder-image.jpg')",
                      backgroundSize: "100% 70%",
                      backgroundPosition: "top",
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={() => handleVideoClick(video)}
                  >
                    <h2 className="relative bg-white/90 w-full text-center text-sm font-bold text-gray-800 p-3 rounded-b-3xl">
                      {video?.videoData?.RaceName || "No Race Name"}
                    </h2>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default UserVideos;
