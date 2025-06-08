import { useState, useEffect, useMemo, useRef } from "react";
import MenuCard from "../components/MenuCard";
import CartModal from "../components/CartModal";
import { useCart } from "../context/cartContext";

function Southern() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scrollY, setScrollY] = useState(0);
    const { cart, setCart } = useCart();
    const [filter, setFilter] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        fetch("https://dishdash-v7wp.onrender.com/menu/southern", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then((data) => {
            setList(data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching menu:", error);
            setLoading(false);
        });
    }, []);

    // Scroll tracking
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Parallax effect
    useEffect(() => {
        if (headerRef.current) {
            headerRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
        }
    }, [scrollY]);

    const filteredList = useMemo(() => {
        return list.filter(x => x.food.toLowerCase().includes(filter.toLowerCase()));
    }, [list, filter]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 text-white font-sans relative overflow-x-hidden">
            {/* Cart Button */}
            {cart.length > 0 && (
                <button 
                    onClick={() => setIsCartOpen(true)}
                    className="fixed top-4 right-4 z-40 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Cart ({cart.length})
                </button>
            )}

            {/* Hero Section */}
            <div
                ref={headerRef}
                className="relative h-80 bg-[url('https://images.unsplash.com/photo-1606787366850-de6330128bfc')] bg-cover bg-center bg-no-repeat mb-12 flex items-center justify-center overflow-hidden"
                style={{ transition: "background-position 0.1s ease-out" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-amber-900/40"></div>

                {/* Floating Icons */}
                <div
                    className="absolute w-32 h-32 right-4 md:right-10 top-20"
                    style={{
                        transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * 0.05}deg)`,
                        transition: "transform 0.1s ease-out",
                        backgroundImage: `url('https://www.freepnglogos.com/uploads/food-png/food-plate-png-transparent-image-pngpix-2.png')`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        filter: "drop-shadow(0 0 15px rgba(210, 105, 30, 0.5))",
                        opacity: 0.7,
                    }}
                ></div>

                <div
                    className="absolute w-28 h-28 left-4 md:left-10 bottom-10"
                    style={{
                        transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * -0.03}deg)`,
                        transition: "transform 0.1s ease-out",
                        backgroundImage: `url('https://www.freepnglogos.com/uploads/food-png/food-southern-fried-chicken-transparent-png-pictures-icons-and-png-19.png')`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        filter: "drop-shadow(0 0 15px rgba(255, 165, 0, 0.5))",
                        opacity: 0.7,
                    }}
                ></div>

                {/* Header Content */}
                <div
                    className="relative z-10 text-center px-4 transform transition-transform duration-1000 w-full"
                    style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400 filter drop-shadow-xl mb-4">
                        SOUTHERN STORIES
                    </h1>
                    <p className="text-amber-100 text-sm md:text-lg max-w-2xl mx-auto mb-6">
                        Authentic Southern comfort food with generations of tradition
                    </p>

                    {/* Search Bar */}
                    <div
                        className={`relative w-64 md:w-72 mx-auto h-12 flex items-center px-4 rounded-full bg-white shadow-lg border-2 transition-all duration-300 ${
                            searchFocused
                                ? "border-amber-400 ring-2 ring-amber-300 ring-opacity-50"
                                : "border-amber-600"
                        }`}
                    >
                        <button type="button" className="text-amber-600" aria-label="Search menu">
                            <svg
                                width="20"
                                height="20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <input
                            type="text"
                            placeholder="Search our menu..."
                            aria-label="Search menu items"
                            className="w-full h-full bg-transparent px-3 outline-none text-gray-700 placeholder-gray-500 font-medium"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                        {filter && (
                            <button
                                onClick={() => setFilter("")}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                aria-label="Clear search"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="container mx-auto px-4 pb-24 overflow-x-hidden">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2 text-amber-400">Our Specialties</h2>
                    <p className="text-gray-300 max-w-xl mx-auto">
                        Heartwarming dishes made with generations-old recipes
                    </p>
                    <div className="flex justify-center mt-4">
                        <div className="flex space-x-1 items-center">
                            <span className="h-1 w-8 bg-amber-500 rounded"></span>
                            <span className="h-1 w-2 bg-amber-500 rounded animate-pulse"></span>
                            <span className="h-1 w-1 bg-amber-500 rounded animate-ping"></span>
                            <span className="h-1 w-3 bg-amber-500 rounded animate-pulse"></span>
                            <span className="h-1 w-10 bg-amber-500 rounded"></span>
                        </div>
                    </div>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-amber-400 text-lg">Loading menu items...</p>
                    </div>
                ) : (
                    <>
                        {/* No Items */}
                        {filteredList.length === 0 ? (
                            <div className="text-center py-16">
                                <div
                                    className="w-24 h-24 mx-auto mb-6 opacity-50 bg-contain bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage:
                                            "url('https://www.freepnglogos.com/uploads/food-png/food-plate-png-transparent-image-pngpix-2.png')",
                                    }}
                                ></div>
                                <h3 className="text-2xl font-bold text-amber-400 mb-2">No items found</h3>
                                <p className="text-gray-400">Try adjusting your search or browse our full menu</p>
                                <button
                                    onClick={() => setFilter("")}
                                    className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 rounded-full text-white font-medium transition-colors"
                                >
                                    View All Items
                                </button>
                            </div>
                        ) : (
                            <div className="relative">
                                {/* Decorative elements */}
                                <div
                                    className="absolute left-0 top-40 w-20 h-20 opacity-10 pointer-events-none"
                                    style={{
                                        backgroundImage:
                                            "url('https://www.freepnglogos.com/uploads/food-png/food-southern-fried-chicken-transparent-png-pictures-icons-and-png-19.png')",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.02}deg)`,
                                    }}
                                ></div>
                                <div
                                    className="absolute right-0 top-80 w-24 h-24 opacity-10 pointer-events-none"
                                    style={{
                                        backgroundImage:
                                            "url('https://www.freepnglogos.com/uploads/food-png/food-cornbread-transparent-png-pictures-icons-and-png-20.png')",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * -0.03}deg)`,
                                    }}
                                ></div>

                                <MenuCard list={filteredList} />
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Scroll to Top Button */}
            {scrollY > 200 && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-6 right-6 z-50 p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg transition"
                    aria-label="Scroll to top"
                >
                    ↑
                </button>
            )}

            {/* Cart Modal */}
            {isCartOpen && <CartModal cart={cart} setCart={setCart} outlet="southern" onClose={() => setIsCartOpen(false)} />}
        </div>
    );
}

export default Southern;