import React from "react";
import { useCart } from "../context/cartContext";
import addToCart from "../utils/addToCart";
import { motion } from "framer-motion";

function MenuCard({ list }) {
    const { cart, setCart } = useCart();

    return (
        <div className="mt-8 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ml-90">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((item) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-yellow-500/50 transition-all"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">{item.food}</h3>
                                <p className="text-gray-300">{item.description || "Delicious item from our menu"}</p>
                            </div>
                            
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-yellow-300 font-medium text-lg">
                                    ₹{item.price.toFixed(2)}
                                </span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => addToCart(cart, setCart, item)}
                                    className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg font-medium transition-all shadow-md"
                                >
                                    Add to Cart
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default MenuCard;