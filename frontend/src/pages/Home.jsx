import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import addToCartFn from "../utils/addToCart";
import removeFromCartFn from "../utils/removeFromCart";
import updateQuantityFn from "../utils/updateQuantity";

function Home() {
  const [cart, setCart] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  
  const addToCart = (item) => addToCartFn(cart, setCart, item);
  const removeFromCart = (itemId) => removeFromCartFn(cart, setCart, itemId);
  const updateQuantity = (itemId, newQuantity) =>
    updateQuantityFn(cart, setCart, itemId, newQuantity);

  const navigate = useNavigate();

  // to Handle scroll events for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // for Applying parallax transformations
  useEffect(() => {
    if (heroRef.current) {
      const translateY = scrollY * 0.5; 
      heroRef.current.style.backgroundPosition = `center -${translateY}px`;
    }

    if (cardsRef.current) {
      
      const translateY = scrollY * 0.1; 
      cardsRef.current.style.transform = `translateY(${translateY}px)`;
    }
  }, [scrollY]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans overflow-x-hidden">
      {/* Main Section with Parallax */}
      <div
        ref={heroRef}
        className="text-center py-60 px-6 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')] bg-no-repeat bg-cover bg-fixed rounded-b-3xl shadow-2xl relative"
        style={{
          backgroundSize: '110% auto', 
          transition: 'background-position 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-yellow-900/50 rounded-b-3xl"></div>
        
        
        <div className="absolute w-full h-full overflow-hidden">
          
          <div 
            className="absolute w-32 h-32 top-10 left-10 opacity-70"
            style={{ 
              transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * 0.05}deg)`,
              transition: 'transform 0.1s ease-out',
              backgroundImage: `url('https://www.freepnglogos.com/uploads/burger-png/burger-png-burger-king-menu-prices-india-king-maharaja-3.png')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              filter: 'drop-shadow(0 0 15px rgba(255, 165, 0, 0.5))'
            }}
          ></div>
          
        
          <div 
            className="absolute w-36 h-36 top-20 right-20 opacity-70"
            style={{ 
              transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * -0.03}deg)`,
              transition: 'transform 0.1s ease-out',
              backgroundImage: `url('https://www.freepnglogos.com/uploads/pizza-png/pizza-slice-icon-download-icons-17.png')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              filter: 'drop-shadow(0 0 15px rgba(255, 99, 71, 0.5))'
            }}
          ></div>
          
         
          <div 
            className="absolute w-28 h-28 bottom-20 left-1/4 opacity-70"
            style={{ 
              transform: `translateY(${scrollY * -0.25}px) rotate(${scrollY * 0.02}deg)`,
              transition: 'transform 0.1s ease-out',
              backgroundImage: `url('https://www.freepnglogos.com/uploads/fries-png/premium-french-fries-western-food-5.png')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))'
            }}
          ></div>
        </div>
        <div className="relative z-10 transform transition-transform duration-1000" style={{ 
          transform: `translateY(${scrollY * 0.2}px)`
        }}>
          {/* <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 mb-6 filter drop-shadow-xl">
            Welcome Bennettians..!
          </h1> */}
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 mb-6 filter drop-shadow-xl">
            Savor the Flavor
          </h1>
          <p className="text-yellow-100 text-xl max-w-2xl mx-auto font-medium filter drop-shadow">
             Bennettians discover top-rated outlets and order your favorite dishes straight to your hands.
          </p>
         
        </div>
      </div>

      {/* Heading for Outlets Section */}
      <div className="text-center my-16 ">
        <h2 className="text-4xl font-bold mb-2 text-yellow-400">Outlets For You</h2>
        <p className="text-gray-300">Satisfy your cravings with our top-rated food partners</p>
        
        {/* Animated divider */}
        <div className="flex justify-center mt-1">
          <div className="flex space-x-1 items-center">
            <span className="h-1 w-10 bg-yellow-500 rounded"></span>
            <span className="h-1 w-2 bg-yellow-500 rounded animate-pulse"></span>
            <span className="h-1 w-1 bg-yellow-500 rounded animate-ping"></span>
            <span className="h-1 w-3 bg-yellow-500 rounded animate-pulse"></span>
            <span className="h-1 w-10 bg-yellow-500 rounded"></span>
          </div>
        </div>
      </div>
      
      {/* Outlet Cards Section */}
      <div 
        ref={cardsRef}
        className="flex flex-wrap justify-center gap-10 px-6 mt-3 relative mb-40"
      >
        
        <div 
          className="absolute h-64 w-64 rounded-full bg-yellow-500 opacity-10 -left-20 top-40"
          style={{ 
            transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * 0.02}deg)`,
            transition: 'transform 0.1s ease-out' 
          }}
        ></div>
        <div 
          className="absolute h-40 w-40 rounded-full bg-red-500 opacity-10 right-10 top-20"
          style={{ 
            transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * -0.03}deg)`,
            transition: 'transform 0.1s ease-out' 
          }}
        ></div>
        
        {/* Cards with individual parallax movement */}
        <div className="transform transition-all duration-500 group" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
          <Card
            OutletName="SOUTHERN_STORIES"
            image="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            onClick={() => navigate("/southern")}
          />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-contain bg-no-repeat opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
            style={{
              backgroundImage: "url('https://www.freepnglogos.com/uploads/food-png/food-grass-fed-beef-circle-ranch-3.png')",
              transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * 0.1}deg)`,
            }}>
          </div>
        </div>
        
        <div className="transform transition-all duration-500 group" style={{ transform: `translateY(${scrollY * 0.03}px)` }}>
          <Card
            OutletName="KATHI"
            image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1014&q=80"
            onClick={() => navigate("/kathi")}
          />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-contain bg-no-repeat opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
            style={{
              backgroundImage: "url('https://www.freepnglogos.com/uploads/pizza-png/pizza-png-kaya-massage-therapy-12.png')",
              transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * -0.08}deg)`,
            }}>
          </div>
        </div>
        
        <div className="transform transition-all duration-500 group" style={{ transform: `translateY(${scrollY * 0.07}px)` }}>
          <Card
            OutletName="QUENCH"
            image="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            onClick={() => navigate("/quench")}
          />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-contain bg-no-repeat opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
            style={{
              backgroundImage: "url('https://www.freepnglogos.com/uploads/cocktail-png/cocktail-mixed-drink-rum-bahama-mama-luau-party-2.png')",
              transform: `translateY(${scrollY * -0.25}px) rotate(${scrollY * 0.12}deg)`,
            }}>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer 
        className="mt-auto bg-gray-900 text-gray-300 py-16 px-8 text-center border-t border-gray-700 relative overflow-hidden"
        style={{ marginTop: '200px' }}
      >
        {/* elements */}
        <div 
          className="absolute h-32 w-32 rounded-full bg-yellow-700 opacity-5 left-10 top-10"
          style={{ 
            transform: `translateY(${scrollY * 0.02}px)`,
            transition: 'transform 0.1s ease-out' 
          }}
        ></div>
        <div 
          className="absolute h-24 w-24 rounded-full bg-yellow-500 opacity-5 right-10 bottom-10"
          style={{ 
            transform: `translateY(${scrollY * 0.01}px)`,
            transition: 'transform 0.1s ease-out' 
          }}
        ></div>
        
        <div className="relative z-10">
          <p className="text-xl mb-2">
            © {new Date().getFullYear()} DishDash • All rights reserved.
          </p>
          <div className="flex justify-center gap-8 mt-6">
            <a href="https://twitter.com" className="text-yellow-500 hover:text-white text-2xl transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com" className="text-yellow-500 hover:text-white text-2xl transition">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" className="text-yellow-500 hover:text-white text-2xl transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className="text-sm mt-8 text-gray-500">Crafted with ❤️ for Bennett</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;