import removeFromCart from "../utils/removeFromCart";
import updateQuantity from "../utils/updateQuantity";
import { useUser } from "@clerk/clerk-react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51RFvmwRmmd7ZuCtZTAEPc4nIHDSh21Pkhj5Q0cc4tm3lhsgroQxGGBpIYw2rQkkhMkx2UIi3bVuiP23xOHuQctYT00zPKah976"
);

const CartModal = ({ cart, setCart, outlet, onClose }) => {
  const [loading, setLoading] = useState(false);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="text-yellow-400">Loading...</div>;
  }

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;

      localStorage.setItem(
        "orderDetails",
        JSON.stringify({ outlet, totalPrice })
      );

      const response = await fetch(
        "https://dishdash-v7wp.onrender.com/create-checkout-session/payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart.map(({ _id, food, price, quantity }) => ({
              food,
              price,
              quantity,
            })),
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Payment failed");
      }

      const { id: sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) throw error;
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-40"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-yellow-600">
              <h2 className="text-2xl font-bold text-yellow-400">Your Cart</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-yellow-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Content */}
            {cart.length === 0 ? (
              <div className="py-12 text-center">
                <svg
                  className="w-24 h-24 mx-auto text-yellow-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="text-yellow-100 text-lg">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item._id} className="py-4 border-b border-gray-700">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-yellow-300 font-medium">{item.food}</h3>
                          <p className="text-yellow-100 text-sm">₹{item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(cart, setCart, item._id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(cart, setCart, item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded bg-gray-700 text-yellow-300 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span className="text-yellow-100">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cart, setCart, item._id, item.quantity + 1)}
                            className="w-8 h-8 rounded bg-gray-700 text-yellow-300"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-yellow-300 font-medium">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-yellow-600">
                  <div className="flex justify-between text-lg font-bold text-yellow-400 mb-4">
                    <span>Total:</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={loading || cart.length === 0}
                    className={`w-full py-3 rounded-lg font-medium ${
                      loading || cart.length === 0
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white"
                    }`}
                  >
                    {loading ? "Processing..." : "Checkout Now"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal; 