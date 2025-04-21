import { useEffect, useMemo, useState } from "react";

function KathiAdmin(){
    const [list,setList] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080/admin/kathi",{
            method : "get",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then((data)=>{
            setList(data);
        })
    },[])

    let pendingList = useMemo(()=>{
        return list.filter(x => x.status.includes("pending"))
    },[list]);


    return(
        <div>
  <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", fontWeight: "bold", color: "#2c3e50" }}>
    Active Orders
  </h2>
  {pendingList.length === 0 ? (
    <p style={{ fontSize: "1rem", color: "#888" }}>No orders found.</p>
  ) : (
    <div className="space-y-6">
          {pendingList.map((order, idx) => (
            <div
              key={order._id || idx}
              className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-200 hover:shadow-xl"
            >
              {/* Header */}
              <div className="p-5 bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Outlet: {order.outlet.toUpperCase()}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Placed on: {new Date(order.time).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Expected Time : In {Math.floor(Math.random() * 5 + 15)} Minutes
                    </p>
                    
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        order.status === "completed"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order items */}
              <div className="divide-y divide-gray-100">
                {order.orders.map((item, i) => (
                  <div
                    key={item._id || i}
                    className="flex justify-between items-center p-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">
                          {item.food}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                          ₹{item.price.toFixed(2)} per unit
                        </p>
                      </div>
                      <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
                        x{item.quantity}
                      </span>
                      <p className="text-sm font-medium text-gray-900 whitespace-nowrap ml-2">
                        ₹{(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total section */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Total Amount
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    )
        
    
}

export default KathiAdmin