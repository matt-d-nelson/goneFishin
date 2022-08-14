const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return action.payload;
    default:
      return state;
  }
};

// all orders be on the redux state at:
// state.cart
export default cartReducer;
