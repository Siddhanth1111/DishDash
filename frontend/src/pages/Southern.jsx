import { useState, useEffect } from "react";
import MenuCard from "../components/MenuCard";

function Southern(){
    const [list,setList] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080/menu/southern",{
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
            <h2 className="text-3xl font-bold mb-6 w-1/4 mx-auto">Southern Stories MENU</h2>
            <MenuCard list={list} ></MenuCard>
        </div>
    )
}

export default Southern;