import { useState, } from "react";

import Card from "../components/Card";
import Navbar from "../components/Navbar";
import addToCartFn from "../utils/addToCart";
import removeFromCartFn from "../utils/removeFromCart";
import updateQuantityFn from "../utils/updateQuantity";
import CartModal from "../components/CartModal";
import { useNavigate } from "react-router-dom";

function Home(){

  const [cart, setCart] = useState([]);
  const addToCart = (item) => addToCartFn(cart, setCart, item);
  const removeFromCart = (itemId) => removeFromCartFn(cart, setCart, itemId);
  const updateQuantity = (itemId, newQuantity) =>
    updateQuantityFn(cart, setCart, itemId, newQuantity);

  const navigate = useNavigate();

  return (
    <div className="">
      {/* navbar */}
      {/* <Navbar  /> */}

      {/* Outlet Cards */}
      <div className="flex flex-wrap justify-center mt-20 gap-8">
        <Card
          OutletName="SOUTHERN_STORIES"
          onClick={() => navigate("/southern")}
        />
        <Card OutletName="KATHI" onClick={() => navigate("/kathi")} />
        <Card OutletName="QUENCH" onClick={() => navigate("/quench")} />
      </div>
    </div>
  );
}
    

export default Home;