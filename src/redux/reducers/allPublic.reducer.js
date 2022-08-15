const allPublicReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_PUBLIC_DESIGNS':
      return action.payload;
    default:
      return state;
  }
};

// all orders be on the redux state at:
// state.orders
export default allPublicReducer;
