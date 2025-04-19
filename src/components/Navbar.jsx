import React from "react";
import { useNavigate } from "react-router-dom";

// const user = JSON.parse(localStorage.getItem('user'));

const Navbar = ({ cart, toggleCart }) => {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-900 w-full flex items-center justify-between p-4">
      <div className="text-yellow-600 font-bold text-3xl mx-4">DishDash.</div>

      <ul className="flex space-x-10 text-yellow-600">
        <li className="hover:cursor-pointer hover:bg-cyan-50 hover:text-black rounded-2xl p-2">
          Home
        </li>
        <li className="hover:cursor-pointer hover:bg-cyan-50 hover:text-black rounded-2xl p-2">
          My Orders
        </li>
        <li
          onClick={toggleCart}
          className="hover:cursor-pointer hover:bg-cyan-50 hover:text-black rounded-2xl p-2"
        >
          Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
        </li>
      </ul>

      <div className="flex space-x-10 mx-4 text-yellow-600">
        <button className="border p-2 rounded-xl hover:text-black hover:bg-cyan-50">
          Contact us
        </button>
        <button onClick={()=>{
            navigate("/login") 
        }} className="border p-2 rounded-xl hover:text-black hover:bg-cyan-50">
          Login/Signup
        </button>
      </div>
    </div>
  );
};

export default Navbar;
