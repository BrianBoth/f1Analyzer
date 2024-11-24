import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage.jsx";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import UserVideos from "./pages/UserVideos.jsx";
import DisplayVideo from "./pages/DisplayVideo.jsx";
import AddVideo from "./pages/AddVideo.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/data/:id" element={<UserVideos></UserVideos>}></Route>
      <Route
        path="/display/:id"
        element={<DisplayVideo></DisplayVideo>}
      ></Route>
      <Route path="/addVideo/:id" element={<AddVideo></AddVideo>}></Route>
    </Routes>
  );
};

export default App;
