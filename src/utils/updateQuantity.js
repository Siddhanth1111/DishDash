const updateQuantity = (cart, setCart, itemId, newQuantity) => {
  if (newQuantity < 1) return;
  const updatedCart = cart.map((item) =>
    item.id === itemId ? { ...item, quantity: newQuantity } : item
  );
  setCart(updatedCart);
};

export default updateQuantity;
