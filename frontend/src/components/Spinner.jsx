import React from "react";

function Spinner() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="text-center flex flex-col items-center">
        <img
          src="/59097644ada257296db3d19882f84ed6.gif"
          alt="Loading..."
          className="w-40 h-40 rounded-full shadow-lg border-4 border-white"
        />
        <h2 className="mt-4 text-white text-lg font-semibold animate-pulse">
          Please wait, loading...
        </h2>
      </div>
    </div>
  );
}

export default Spinner;
