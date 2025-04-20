import { useUser } from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";

function MyOrders() {
  const [list, setList] = useState([]);
  const { user, isLoaded } = useUser();

  

  const userPhone = user?.phoneNumbers?.[0]?.phoneNumber?.replace(/^\+/, "");

  useEffect(() => {
    if (!userPhone) return;

    fetch("http://localhost:8080/myorders/fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPhone }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Orders:", data);
        setList(data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [userPhone]);

  const filteredList = useMemo(() => {
    return list.filter((order) => order.userPhone === Number(userPhone));
  }, [list, userPhone]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Orders</h2>
      {filteredList.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        filteredList.map((order, idx) => (
          <div key={order._id || idx} style={{ border: "1px solid gray", margin: "10px", padding: "10px", borderRadius: "10px" }}>
            <h3>Outlet: {order.outlet}</h3>
            <p>Status: <strong>{order.status}</strong></p>
            <p>Placed on: {new Date(order.time).toLocaleString()}</p>
            <p>Total Price: ₹{order.totalPrice}</p>

            <h4>Items:</h4>
            {order.orders.map((item, i) => (
              <div key={item._id || i} style={{ marginLeft: "10px" }}>
                <p>- {item.food} × {item.quantity} @ ₹{item.price} each</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
