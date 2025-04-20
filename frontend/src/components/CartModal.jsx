import removeFromCart from "../utils/removeFromCart";
import updateQuantity from "../utils/updateQuantity";
import { useUser } from "@clerk/clerk-react";

const CartModal = ({ cart, setCart, outlet}) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const { user, isLoaded } = useUser(); // 👈 isLoaded tells us if user is available

  if (!isLoaded) {
    return <div>Loading...</div>; // or just return null
  }

  
  const userPhone = user.phoneNumbers?.[0]?.phoneNumber?.replace(/^\+/, '');


  return (
    <div className="w-full bg-amber-50 bg-opacity-50 flex justify-end">
      <div className="bg-white w-full p-36 h-screen overflow-y-auto flex flex-col">
        

        {cart.length === 0 ? (
          <div></div>
        //   <div className="flex-1 flex flex-col items-center justify-center">

        //   <div className="flex justify-between items-center mb-6 pb-4 border-b">
        //   <h1 className="text-3xl font-bold text-gray-800">
        //     Your Selected Items
        //   </h1>
        //   <button
        //     className="text-gray-500 hover:text-gray-700 text-4xl hover:cursor-pointer"
        //   >
        //     &times;
        //   </button>
        // </div>

        //     <svg
        //       xmlns="http://www.w3.org/2000/svg"
        //       className="h-24 w-24 text-gray-300 mb-4"
        //       fill="none"
        //       viewBox="0 0 24 24"
        //       stroke="currentColor"
        //     >
        //       <path
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         strokeWidth={2}
        //         d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        //       />
        //     </svg>
        //     <p className="text-gray-500 text-lg">Your cart is empty</p>
        //   </div>
        ) : (
          <>
          
            <div className="flex-1 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="py-4 border-b last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        Rs.{item.price.toFixed(2)} each
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(cart,setCart,item._id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(cart,setCart,item._id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-medium text-gray-700">
                      Rs.{(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center text-lg font-bold text-gray-800 mb-4">
                <span>Total:</span>
                <span>Rs.{totalPrice.toFixed(2)}</span>
              </div>
              <button onClick={()=>{
                confirmOrder(outlet,cart, userPhone, totalPrice,setCart);
              }} className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 hover:cursor-pointer transition-colors font-medium">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function confirmOrder(outlet,cart,userPhone,totalPrice,setCart){
    fetch(`http://localhost:8080/confirm`,{
      method : "post",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        outlet,
        cart,
        userPhone,
        totalPrice
      })
    })
    .then(response =>response.json())
    .then(()=>{
      alert("Order placed successfully");
      setCart([]);
      localStorage.setItem('cart',JSON.stringify([]));
    }
      
    )
}

export default CartModal;
