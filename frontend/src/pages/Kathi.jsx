import { useState,useEffect,} from "react";
import MenuCard from "../components/MenuCard";
import CartModal from "../components/CartModal";
import { useCart } from "../context/cartContext";

function Kathi(){
    const [list,setList] = useState([]);
    const {cart, setCart} = useCart();
    useEffect(()=>{
        fetch("http://localhost:8080/menu/kathi",{
            method : "get",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then((data)=>{
            setList(data);
        })
    },[list])

    return(
        <div>
            <h2 className="text-3xl font-bold mb-6 w-1/4 mx-auto">Kathi MENU</h2>
            <MenuCard list={list}></MenuCard>
            <CartModal cart={cart} setCart = {setCart} outlet = "kathi" ></CartModal>
        </div>
    )
}

export default Kathi;