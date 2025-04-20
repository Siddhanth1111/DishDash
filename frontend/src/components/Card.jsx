import React from "react";

function Card({ OutletName, onClick }) { // Fixed prop name to onClick
  return (
    <div 
      className="flex flex-col w-100 bg-gray-700 rounded-2xl transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
      onClick={onClick} // Added onClick handler here
    >
      <div>
        <img 
          className="rounded-t-2xl p-2 w-full h-48 object-cover"
          src="https://static.sociofyme.com/thumb/imgsize-321670,msid-98331207,width-400,resizemode-4/98331207.jpg"
          alt={OutletName}
        />
      </div>

      <div className="bg-white h-5"></div>

      <div className="bg-gray-700 text-white text-center p-2 rounded-b-2xl">
        <h2 className="font-bold text-2xl mb-2 text-yellow-600">{OutletName}</h2>
        <p>Welcome to the world of {OutletName}</p>
      </div>
    </div>
  );
}

export default Card;