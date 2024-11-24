import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    const body = {
      indexID: index,
      fileData: file,
    };

    setLoading(true);

    axios
      .put(`http://localhost:5555/addVideo/${id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        navigate(`/data/${id}`);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
      <div className="fileContainer flex flex-col mx-auto h-screen items-center justify-center">
        <form onSubmit={handleUpload} className="">
          <div>
            <label className="text-white">Enter Index: </label>
            <input list="browsers" name="browser" id="browser"></input>
            <datalist id="browsers">
              {indexes.map((index, idx) => (
                <option key={idx} value={index} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="text-white">Upload Relative File Path:</label>
            <input
              type="text"
              placeholder="Insert File Path"
              name="fileInput"
            />
          </div>
          <button type="submit" className="bg-white">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddVideo;
