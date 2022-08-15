import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import editDesign from "./editDesign.reducer";
import home from "./home.reducer";
import orders from "./orders.reducer";
import cart from "./cart.reducer";
import allPublic from "./allPublic.reducer";
import modalReducer from "./modal.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  orders, // contains an array of all orders
  editDesign, // will have data for a single post
  home, // will have an id and username if someone is logged in
  cart, // contains array of a user's unordered cart items
  allPublic,
  modalReducer,
});

export default rootReducer;
