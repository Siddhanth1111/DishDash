import { useState,useEffect } from "react";
import MenuCard from "../components/MenuCard";
import CartModal from "../components/CartModal";
import { useCart } from "../context/cartContext";

function Quench(){
    const [list,setList] = useState([]);
    const {cart, setCart} = useCart();
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

    return(
        <div>
            <h2 className="text-3xl font-bold mb-6 w-1/4 mx-auto">Quench MENU</h2>
            <MenuCard list={list} ></MenuCard>
            <CartModal cart={cart} setCart = {setCart} outlet = "quench" ></CartModal>
        </div>
    )
}       

export default Quench;