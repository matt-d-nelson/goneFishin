const editDesign = (state = [], action) => {
  switch (action.type) {
    case "SET_EDIT_DESIGN":
      return action.payload;
    default:
      return state;
  }
};

export default editDesign;
