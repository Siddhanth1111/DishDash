import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/cartContext";

export const useNavigationPrompt = () => {
  const { cart, setCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [nextPath, setNextPath] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const currentPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== currentPath.current && !showPrompt) {
      if (cart.length > 0) {
        setNextPath(location.pathname);
        setShowPrompt(true);
        navigate(currentPath.current, { replace: true }); // Cancel navigation temporarily
      } else {
        currentPath.current = location.pathname;
        window.location.reload();
      }
    }
  }, [location]);

  const confirmLeave = () => {
    setCart([]); // Clear cart
    localStorage.getItem('cart',JSON.stringify([]))
    localStorage.getItem('orderDetails',JSON.stringify([]))
    setShowPrompt(false);
    currentPath.current = nextPath;
    navigate(nextPath);
  };

  const cancelLeave = () => {
    setShowPrompt(false);
  };

  return { showPrompt, confirmLeave, cancelLeave };
};
