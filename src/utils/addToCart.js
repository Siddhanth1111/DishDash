const addToCart = (cart, setCart, item) => {
  
  if(cart == []){
    localStorage.setItem('cart',[]);
  }

  const updatedCart = cart.find((cartItem) => cartItem.id === item.id)
    ? cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    : [...cart, { ...item, quantity: 1 }];

  setCart(updatedCart);
  localStorage.setItem('cart',updatedCart);
};

export default addToCart;
