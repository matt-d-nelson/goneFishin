const editDesign = (state = [], action) => {
  switch (action.type) {
    case "SET_EDIT_DESIGN":
      return action.payload;
    default:
      return state;
  }
};

// this design be on the redux state at:
// state.editDesign
export default editDesign;
