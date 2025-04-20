const updateQuantity = (cart, setCart, itemId, newQuantity) => {
  if (newQuantity < 1) return;
  const updatedCart = cart.map((item) =>
    item._id === itemId ? { ...item, quantity: newQuantity } : item
  );
  setCart(updatedCart);
  localStorage.setItem('cart',JSON.stringify(updatedCart));
};

export default updateQuantity;
