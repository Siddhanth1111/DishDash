import { useEffect, useState, useMemo } from "react";

function QuenchAdmin() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://dishdash-v7wp.onrender.com/admin/quench", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then((data) => {
            setList(data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching orders:", error);
            setLoading(false);
        });
    }, []);

    let pendingList = useMemo(() => {
        return list.filter(x => x.status.includes("pending"));
    }, [list]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-400 mb-8 border-b border-blue-600 pb-3">
                    Quench - Active Orders
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : pendingList.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 opacity-50 bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('https://www.freepnglogos.com/uploads/glass-png/glass-png-transparent-images-png-only-28.png')"
                            }}>
                        </div>
                        <h3 className="text-2xl font-bold text-blue-400 mb-2">No pending orders</h3>
                        <p className="text-gray-400">All orders are completed or there are no new orders</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {pendingList.map((order, idx) => (
                            <div 
                                key={order._id || idx}
                                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-200"
                            >
                                {/* Header */}
                                <div className="p-5 bg-gradient-to-r from-blue-900/30 via-gray-800 to-gray-900 border-b border-gray-700">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-semibold text-blue-400">
                                                Order #{order._id?.slice(-6).toUpperCase() || `ORD${idx}`}
                                            </h2>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Placed on: {new Date(order.time).toLocaleString()}
                                            </p>
                                            
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                                order.status === "completed"
                                                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700"
                                                    : "bg-blue-900/50 text-blue-300 border border-blue-700"
                                            }`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                                                Complete
                                            </button>
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
                                                    <p className="text-sm font-medium text-white">
                                                        {item.food}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-0.5">
                                                        ₹{item.price.toFixed(2)} per unit
                                                    </p>
                                                </div>
                                                <span className="text-sm text-gray-300 font-medium whitespace-nowrap">
                                                    x{item.quantity}
                                                </span>
                                                <p className="text-sm font-medium text-blue-400 whitespace-nowrap ml-2">
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
                                        <span className="text-lg font-semibold text-blue-400">
                                            ₹{order.totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuenchAdmin;