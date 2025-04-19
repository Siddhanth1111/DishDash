import { useState, } from "react";

import Card from "../components/Card";
import Navbar from "../components/Navbar";
import addToCartFn from "../utils/addToCart";
import removeFromCartFn from "../utils/removeFromCart";
import updateQuantityFn from "../utils/updateQuantity";
import CartModal from "../components/CartModal";
import { useNavigate } from "react-router-dom";

function Home(){
    const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => addToCartFn(cart, setCart, item);
  const removeFromCart = (itemId) => removeFromCartFn(cart, setCart, itemId);
  const updateQuantity = (itemId, newQuantity) =>
    updateQuantityFn(cart, setCart, itemId, newQuantity);

  const navigate = useNavigate();

  // menu data for different outlets
  const menuData = {
    SOUTHERN_STORIES: [
      { id: 1, name: "Masala Dosa", price: 90 },
      { id: 2, name: "Chole Bhature", price: 150 },
    ],
    KATHI: [
      { id: 3, name: "Kathi Roll", price: 100 },
      { id: 4, name: "Paneer Roll", price: 120 },
    ],
    QUENCH: [
      { id: 5, name: "Aloo Tikki Burger", price: 70 },
      { id: 6, name: "Cold Coffee", price: 65 },
    ],
  };

  return (
    <div className="">
      {/* navbar */}
      <Navbar cart={cart} toggleCart={() => setShowCart(!showCart)} />

      {/* Outlet Cards */}
      <div className="flex flex-wrap justify-center mt-20 gap-8">
        <Card
          OutletName="SOUTHERN_STORIES"
          onClick={() => setSelectedOutlet("SOUTHERN_STORIES")}
        />
        <Card OutletName="KATHI" onClick={() => setSelectedOutlet("KATHI")} />
        <Card OutletName="QUENCH" onClick={() => setSelectedOutlet("QUENCH")} />
      </div>

      {/* Menu Display */}
      {selectedOutlet && (
        <div className="mt-8 mx-auto max-w-4xl p-6">
          <h2 className="text-3xl font-bold mb-6">{selectedOutlet} MENU</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {menuData[selectedOutlet].map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md shadow-yellow-600"
              >
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600 mt-2">Rs.{item.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 hover:cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      )}
    </div>
  );
}
    

export default Home;