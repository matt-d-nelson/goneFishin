const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return action.payload;
    default:
      return state;
  }
};

// all orders be on the redux state at:
// state.orders
export default ordersReducer;
