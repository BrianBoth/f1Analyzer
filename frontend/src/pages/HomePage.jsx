import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="relative bg-cover bg-center min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images.jpeg)",
          filter: "blur(5px)",
          zIndex: -1,
        }}
      ></div>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto text-center text-white md:h-screen lg:py-0">
        <img
          className="w-72 h-72 rounded-2xl mt-10"
          src="/—Pngtree—hand-painted f1 world formula one_3851929.png"
          alt="F1 Car"
        />

        <h2 className="text-5xl font-bold mt-6">Video Analysis</h2>
        <h4 className="text-2xl font-light mt-4">
          View Any Racing Video with a Fun Twist
        </h4>

        <Link
          to="/login"
          className="mt-10 px-6 py-3 text-white font-semibold bg-red-500 rounded-lg hover:bg-green-500 transition duration-200 w-1/3"
        >
          Go
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
