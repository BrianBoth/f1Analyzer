import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

function AddVideo() {
  const [indexes, setIndexes] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/addVideo/${id}`)
      .then((res) => {
        setIndexes(res.data.indexIDArr);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleUpload = (e) => {
    e.preventDefault();

    const index = e.target.elements.browser.value;
    const file = e.target.elements.fileInput.value;

    if (!file) {
      console.log("No file selected");
      return;
    }

    console.log("Index: ", index);
    console.log("File: ", file);
    const existingIndex = indexes.includes(index);

    const data = { index, file, existingIndex };

    setLoading(true);

    axios
      .put(`http://localhost:5555/addVideo/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        navigate(`/displayVideo/${id}`, { state: res.data.videoData });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBackClick = () => {
    navigate(`/data/${id}`);
  };

  return (
    <div className="h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(/360_F_590397842_YiRthnetu32IIY7zsDYnFNrmuhDZEwC4.jpg)",
          filter: "blur(5px)",
          zIndex: -1,
        }}
      ></div>
      <span className="flex cursor-pointer" onClick={handleBackClick}>
        <MdArrowBack className="text-white text-3xl mt-5 ml-5"></MdArrowBack>
        <h2 className="text-white mt-6 ml-5">Back to Video Collections</h2>
      </span>
      <div className="fileContainer flex flex-col mx-auto h-screen items-center justify-center p-6 rounded-lg shadow-lg">
        <form
          onSubmit={handleUpload}
          className="w-full max-w-md bg-black p-6 rounded-lg shadow-md"
        >
          <div className="mb-6 flex flex-col">
            <label
              htmlFor="browser"
              className="text-white mb-2 text-sm font-semibold"
            >
              Enter Index:
            </label>
            <input
              list="browsers"
              name="browser"
              id="browser"
              placeholder="Insert Index"
              className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <datalist id="browsers">
              {indexes.map((index, idx) => (
                <option key={idx} value={index} />
              ))}
            </datalist>
          </div>
          <div className="flex flex-col mb-6">
            <label
              htmlFor="fileInput"
              className="text-white mb-2 text-sm font-semibold"
            >
              Upload Relative File Path:
            </label>
            <input
              type="text"
              placeholder="Insert File Path"
              name="fileInput"
              id="fileInput"
              className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* <input
              type="file"
              name="fileInput"
              className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></input> */}
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-green-500 transition duration-300"
          >
            Upload
          </button>
        </form>
        {loading && (
          <div className="mt-4">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddVideo;
