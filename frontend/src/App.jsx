import { useState,  } from "react";
import { useLocation } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Southern from "./pages/Southern";
import Kathi from "./pages/Kathi";
import Quench from "./pages/Quench";
import Navbar from "./components/Navbar";
import MyOrders from "./pages/myOrders";
import Success from "./components/Success";
// import CartPage from "./pages/CartPage";

function App() {
  const location = useLocation();

  return (
    <div>

      <Navbar></Navbar>

      <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/southern" element={<Southern></Southern>}></Route>
      <Route path="/kathi" element={<Kathi></Kathi>}></Route>
      <Route path="/quench" element={<Quench></Quench>}></Route>
      <Route path="/myorders" element={<MyOrders></MyOrders>}></Route>
      <Route path="/success" element={<Success></Success>}></Route>
      
    </Routes>
    </div>
    
  )
    
}

export default App;
