import { put, takeLatest } from "redux-saga/effects";
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
    yield axios
      .delete(`/api/blobfish/${action.payload}/${action.id}`)
      .then((response) => {
        console.log("deleteDesign response", response);
      });
    yield put({ type: "FETCH_USER_DESIGNS" });
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
