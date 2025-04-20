const removeFromCart = (cart, setCart, itemId) => {
  const updatedCart = cart.filter((item) => item.id !== itemId);
  setCart(updatedCart);
};

export default removeFromCart;
