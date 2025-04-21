import { useState,useEffect, useMemo } from "react";
import MenuCard from "../components/MenuCard";
import CartModal from "../components/CartModal";
import { useCart } from "../context/cartContext";

function Quench(){
    const [list,setList] = useState([]);
    const {cart, setCart} = useCart();
    const [filter,setFilter] = useState("");
    useEffect(()=>{
        fetch("http://localhost:8080/menu/quench",{
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

    const filteredList = useMemo(()=>{
            return list.filter(x => x.food.toLowerCase().includes(filter.toLowerCase()));
        },[list,filter])
    

    return(
        <div>
            <h2 className="text-3xl font-bold mb-6 w-55 mx-auto mt-5">Quench MENU</h2>
            <div class="relative  w-64 mx-auto h-10 flex items-center px-3 rounded-full bg-white shadow-md border border-yellow-600 focus-within:ring-2 focus-within:ring-yellow-600 transition-all duration-300">
                <button type="button" class="text-gray-500">
            <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
                </button>
        
            <input onChange={(e)=>{
                setFilter(e.target.value)
            }} type="text" placeholder="Search..." required class="w-full h-full bg-transparent px-2 outline-none text-gray-700 placeholder-gray-500" />
        
            <button type="reset" class="opacity-0 transition-opacity duration-300 text-gray-500 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

            <MenuCard list={filteredList}></MenuCard>
            <CartModal cart={cart} setCart = {setCart} outlet = "quench" ></CartModal>
        </div>
    )
}       

export default Quench;