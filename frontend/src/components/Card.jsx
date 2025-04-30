import React from "react";

function Card({ OutletName, onClick, image }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-80 bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
    >
      {/* Optional image section */}
      {image && (
        <img
          src={image}
          alt={OutletName}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Text content */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-white mb-2 tracking-wide">
          {OutletName.replace("_", " ")}
        </h2>
        <p className="text-gray-400 text-sm">
          Explore the best of {OutletName.replace("_", " ")} cuisine.
        </p>
        <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-full transition duration-300">
          Visit Outlet
        </button>
      </div>
    </div>
  );
}

export default Card;
