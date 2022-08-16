const modalReducer = (state = {}, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return action.payload;
    case "CLOSE_MODAL":
      return {};
    default:
      return state;
  }
};

export default modalReducer;
