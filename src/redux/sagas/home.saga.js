import { put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* getAllUserDesigns(action) {
  try {
    const response = yield axios.get(`/api/carp`);
    console.log("CARP DATA", response.data);
    yield put({ type: "SET_DESIGNS", payload: response.data });
  } catch (error) {
    console.log("error in get all user designs", error);
  }
}

function* deleteDesign(action) {
  console.log("in deleteDesign");
  try {
    // send delete request
    yield axios.delete(`/api/blobfish/${action.payload}`).then((response) => {
      console.log("deleteDesign response", response);
    });
    // refetch user and all designs
    yield put({ type: "FETCH_USER_DESIGNS" });
    yield put({ type: "FETCH_ALL_PUBLIC_DESIGNS" });
    // open success modal
    yield put({
      type: "OPEN_MODAL",
      payload: { type: "success", open: true, success: "Design deleted" },
    });
    // close modal after a delay
    yield delay(1100);
    yield put({ type: "CLOSE_MODAL" });
  } catch (error) {
    console.log("error in deleteDesign");
  }
}

function* addDesignToCart(action) {
  console.log("in addDesignToCart", action);
  try {
    yield axios({
      method: "post",
      url: "/api/bass",
      data: action.payload,
    }).then((response) => {
      console.log("addDesignToCart response:", response);
    });
    // get all the user's cart items
    yield put({ type: "FETCH_CART_ITEMS" });
    // open success modal
    yield put({
      type: "OPEN_MODAL",
      payload: {
        type: "success",
        open: true,
        success: "Design Added To Cart",
      },
    });
    // after a delay, close the modal
    yield delay(1100);
    yield put({ type: "CLOSE_MODAL" });
  } catch (error) {
    console.log("error in addDesignToCart");
  }
}

function* homeSaga() {
  yield takeLatest("FETCH_USER_DESIGNS", getAllUserDesigns);
  yield takeLatest("DELETE_DESIGN", deleteDesign);
  yield takeLatest("ADD_DESIGN_TO_CART", addDesignToCart);
}

export default homeSaga;
