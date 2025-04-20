const removeFromCart = (cart, setCart, itemId) => {
  const updatedCart = cart.filter((item) => item._id !== itemId);
  setCart(updatedCart);
  localStorage.setItem('cart',JSON.stringify(updatedCart));
};

export default removeFromCart;
