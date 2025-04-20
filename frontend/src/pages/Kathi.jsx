import { useState,useEffect } from "react";
import MenuCard from "../components/MenuCard";

function Kathi(){
    const [list,setList] = useState([]);
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
        </div>
    )
}

export default Kathi;