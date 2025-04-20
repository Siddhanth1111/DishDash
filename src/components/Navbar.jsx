import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserButton, useUser, SignInButton, SignUpButton, SignOutButton } from "@clerk/clerk-react";




const Navbar = () => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {

    if (user) {
      const saveUser = async () => {
        const res = await fetch("http://localhost:8080/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: user.fullName,
            phone: user.phoneNumbers?.[0]?.phoneNumber || ""
          })
        });
  
        const data = await res.json();
        console.log("Saved user:", data);
      };
  
      saveUser();
    }
  }, [user]);

    const navigate = useNavigate();


    
    
  return (
    <div className="bg-gray-900 w-full flex items-center justify-between p-4">
      <div className="text-yellow-600 font-bold text-3xl mx-4">DishDash.</div>

      <ul className="flex space-x-10 text-yellow-600">
        <li className="hover:cursor-pointer hover:bg-cyan-50 hover:text-black rounded-2xl p-2" onClick={()=>{
          navigate("/")
        }}>
          Home
        </li>
        <li className="hover:cursor-pointer hover:bg-cyan-50 hover:text-black rounded-2xl p-2" onClick={()=>[
          navigate("/myOrders")
        ]}>
          My Orders
        </li>
        <li
          
          className="hover:cursor-pointer hover:bg-cyan-50 hover:text-black rounded-2xl p-2"
          onClick={()=>[
            navigate("/cart")
          ]}
        >
          Cart 
        </li>
      </ul>

      <div className="flex space-x-10 mx-4 text-yellow-600">
        <button className="border p-2 rounded-xl hover:text-black hover:bg-cyan-50">
          Contact us
        </button>


        {isSignedIn ? (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span>Hello, {user.fullName || "User"} 👋</span>
          
          <UserButton />
          <SignOutButton><button>Logout</button></SignOutButton>
        </div>
      ) : (
        <div className="flex space-x-10 mx-4 text-yellow-600">
          <SignUpButton className="cursor-pointer border p-2 rounded-xl hover:text-black hover:bg-cyan-50" mode="modal"><button>Sign Up/Login</button></SignUpButton>
        </div>
      )}


      </div>
    </div>
  );
};

export default Navbar;
