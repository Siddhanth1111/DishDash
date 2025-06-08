import { useUser } from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";

function MyOrders() {
  const [list, setList] = useState([]);
  const { user, isLoaded } = useUser();
  const [selectedOutlet, setSelectedOutlet] = useState("all");
  const [loading, setLoading] = useState(true);

  const userPhone = user?.phoneNumbers?.[0]?.phoneNumber?.replace(/^\+/, "");

  useEffect(() => {
    if (!userPhone) return;

    setLoading(true);
    fetch("https://dishdash-v7wp.onrender.com/myorders/fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPhone }),
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, [userPhone]);

  // Filter orders based on selected outlet
  const filteredList = useMemo(() => {
    return selectedOutlet === "all"
      ? list
      : list.filter((order) => order.outlet.toLowerCase() === selectedOutlet);
  }, [list, selectedOutlet]);

  // Sort orders by time (latest first)
  const sortedList = useMemo(() => {
    return [...filteredList].sort((a, b) => new Date(b.time) - new Date(a.time));
  }, [filteredList]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Get outlet-specific colors
  const getOutletColor = (outlet) => {
    switch(outlet) {
      case 'kathi': return 'yellow';
      case 'quench': return 'blue';
      case 'southern': return 'amber';
      default: return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8">Your Orders</h2>

        {/* Outlet Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["all", "kathi", "southern", "quench"].map((outlet) => {
            const color = getOutletColor(outlet);
            return (
              <button
                key={outlet}
                onClick={() => setSelectedOutlet(outlet)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedOutlet === outlet
                    ? `bg-${color}-600 text-white shadow-lg`
                    : `bg-gray-700 text-gray-300 hover:bg-gray-600`
                }`}
              >
                {outlet === 'all' ? 'All Outlets' : outlet.charAt(0).toUpperCase() + outlet.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          </div>
        ) : (
          /* Orders List */
          sortedList.length === 0 ? (
            <div className="text-center py-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-yellow-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="text-xl font-medium text-yellow-400 mb-2">No orders found</h3>
              <p className="text-gray-400">You haven't placed any orders from this outlet yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedList.map((order, idx) => {
                const outletColor = getOutletColor(order.outlet);
                return (
                  <div
                    key={order._id || idx}
                    className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-200 hover:shadow-xl hover:border-yellow-500"
                  >
                    {/* Header */}
                    <div className={`p-5 bg-gradient-to-r from-${outletColor}-900/30 via-gray-800 to-gray-900 border-b border-gray-700`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className={`text-xl font-semibold text-${outletColor}-400`}>
                            {order.outlet.toUpperCase()}
                          </h2>
                          <p className="text-xs text-gray-400 mt-1">
                            Placed on: {new Date(order.time).toLocaleString()}
                          </p>
                          
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              order.status === "completed"
                                ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700"
                                : "bg-yellow-900/50 text-yellow-300 border border-yellow-700"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="divide-y divide-gray-700">
                      {order.orders.map((item, i) => (
                        <div
                          key={item._id || i}
                          className="flex justify-between items-center p-4 hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3 w-full">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">
                                {item.food}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5 truncate">
                                ₹{item.price.toFixed(2)} per unit
                              </p>
                            </div>
                            <span className="text-sm text-gray-300 font-medium whitespace-nowrap">
                              x{item.quantity}
                            </span>
                            <p className={`text-sm font-medium text-${outletColor}-400 whitespace-nowrap ml-2`}>
                              ₹{(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total section */}
                    <div className="p-4 bg-gray-800 border-t border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-400">Total Amount</span>
                        <span className="text-lg font-semibold text-yellow-400">
                          ₹{order.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MyOrders;