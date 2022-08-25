const homeReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_DESIGNS":
      return action.payload;
    default:
      return state;
  }
};

// home designs be on the redux state at:
// state.home
export default homeReducer;
