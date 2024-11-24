import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdSearch } from "react-icons/md";

const UserVideos = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);

  // get existing video data
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/data/${id}`)
      .then((res) => {
        setVideoData(res.data.videoData.videoData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [id]);

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
        <div className="card h-52 w-52 bg-white flex-shrink-0 rounded-2xl"></div>
        <div className="card h-52 w-52 bg-white flex-shrink-0 rounded-2xl"></div>
        <div className="card h-52 w-52 bg-white flex-shrink-0 rounded-2xl"></div>
        <div className="card h-52 w-52 bg-white flex-shrink-0 rounded-2xl"></div>
        <div className="card h-52 w-52 bg-white flex-shrink-0 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default UserVideos;
