import { useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Success() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { cart } = useCart();

  useEffect(() => {
    if (!isLoaded) return; // Wait until user is loaded

    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    if (orderDetails && user) {
      const { outlet, totalPrice } = orderDetails;
      const userPhone = user.phoneNumbers?.[0]?.phoneNumber?.replace(/^\+/, "");

      fetch("http://localhost:8080/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          outlet,
          cart,
          userPhone,
          totalPrice,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          
          localStorage.removeItem("orderDetails");
          localStorage.setItem("cart", JSON.stringify([])); // Clear cart
          
        })
        .catch((err) => {
          console.error("Error confirming order:", err);
        });
    }
  }, [isLoaded, user, cart, navigate]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful! 🎉</h1>
        <p>Thank you for your purchase.</p>
        <button
          onClick={()=>{
            navigate("/")
          }}
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover : cursor-pointer"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
