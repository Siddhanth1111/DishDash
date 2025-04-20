import { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
// import { cartState } from "../../atom/cartAtom";
import addToCart from "../utils/addToCart";

function MenuCard({list}){
    // const [cart,setCart] = useRecoilState(cartState);
    return(
        <div className="mt-8 mx-auto max-w-4xl p-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {list.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-md shadow-yellow-600">
                <h3 className="text-xl font-semibold">{item.food}</h3>
                <p className="text-gray-600 mt-2">Rs.{item.price.toFixed(2)}</p>
                <button
                  
                  className="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 hover:cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
    )
}

export default MenuCard;