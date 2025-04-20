const addToCart = (cart, setCart, item) => {
  
  

  const updatedCart = cart.find((cartItem) => cartItem._id === item._id)
    ? cart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    : [...cart, { ...item, quantity: 1 }];

  setCart(updatedCart);
  localStorage.setItem('cart',JSON.stringify(updatedCart));
};

export default addToCart;
