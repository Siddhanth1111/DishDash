const addToCart = (cart, setCart, item) => {
  const updatedCart = cart.find((cartItem) => cartItem.id === item.id)
    ? cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    : [...cart, { ...item, quantity: 1 }];

  setCart(updatedCart);
};

export default addToCart;
