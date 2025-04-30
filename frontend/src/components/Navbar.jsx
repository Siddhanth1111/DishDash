import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserButton, useUser, SignInButton, SignUpButton, SignOutButton } from "@clerk/clerk-react";


const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

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

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black w-full flex items-center justify-between p-4 border-b border-yellow-600/30 shadow-lg">
      {/* Logo */}
      <div 
        className="text-yellow-400 font-bold text-3xl mx-4 cursor-pointer hover:text-yellow-300 transition-colors"
        onClick={() => navigate("/")}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
          DishDash
        </span>
        <span className="text-yellow-500">.</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 ml-40">
        {[
          { name: "Home", path: "/" },
          { name: "My Orders", path: "/myOrders" },
          { name: "Contact Us", path: "/contact" }
        ].map((item) => (
          <li 
            key={item.name}
            className="relative group hover:cursor-pointer px-4 py-2 rounded-lg"
            onClick={() => navigate(item.path)}
          >
            <span className="text-yellow-100 group-hover:text-yellow-300 transition-colors font-medium">
              {item.name}
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
          </li>
        ))}
      </ul>

      {/* User Section */}
      <div className="flex items-center space-x-4 mx-4">
        {isSignedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-yellow-100 hidden md:inline-block">
              Hello, <span className="font-medium text-yellow-300">{user.fullName || "User"}</span> 👋
            </span>
            
            <div className="relative group">
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10 border-2 border-yellow-400",
                    userButtonPopoverCard: "bg-gray-800 border border-gray-700"
                  }
                }}
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-10 transition-all duration-300"></div>
            </div>

            <SignOutButton>
              <button className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg text-sm font-medium transition-all shadow-md">
                Logout
              </button>
            </SignOutButton>
          </div>
        ) : (
          <div className="flex space-x-4">
            
              <SignUpButton className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg text-sm font-medium transition-all shadow-md">
                Sign Up/Login
              </SignUpButton>
            
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;