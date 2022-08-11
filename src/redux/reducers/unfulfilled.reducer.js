const unfulfilledReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_UNFULFILLED':
      return action.payload;
    default:
      return state;
  }
};

// unfulfilled orders be on the redux state at:
// state.unfulfilled
export default unfulfilledReducer;
