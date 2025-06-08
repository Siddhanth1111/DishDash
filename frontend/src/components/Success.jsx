import { useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { cart, setCart } = useCart();

  useEffect(() => {
    if (!isLoaded) return;

    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    if (orderDetails && user) {
      const { outlet, totalPrice } = orderDetails;
      const userPhone = user.phoneNumbers?.[0]?.phoneNumber?.replace(/^\+/, "");

      fetch("https://dishdash-v7wp.onrender.com/confirm", {
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
          setCart([]); // Clear cart context
          localStorage.setItem("cart", JSON.stringify([]));
        })
        .catch((err) => {
          console.error("Error confirming order:", err);
        });
    }
  }, [isLoaded, user, cart, navigate, setCart]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-10 rounded-2xl shadow-[0_0_30px_rgba(253,224,71,0.15)] border border-yellow-600/30 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 bg-green-900/20 rounded-full border border-green-600/30">
            <CheckCircle className="w-16 h-16 text-green-400" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500 mb-4"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mb-6"
        >
          Thank you for your order! Your delicious meal is being prepared with care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg font-medium transition-all shadow-md"
          >
            Return Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/myOrders")}
            className="px-6 py-3 border border-yellow-600 hover:bg-yellow-600/10 text-yellow-300 rounded-lg font-medium transition-all"
          >
            View My Orders
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-500 text-sm mt-8"
        >
        </motion.p>
      </motion.div>
    </div>
  );
}