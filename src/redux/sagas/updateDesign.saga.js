import axios from "axios";
import { takeEvery } from "redux-saga/effects";

function* updateDesign(action) {
  try {
    yield axios({
      method: "put",
      url: "/api/anglerfish",
      data: action.payload,
    });
    // replaced with success modal 
    // alert("your design was updated");
  } catch (err) {
    console.log(err);
    alert("error updating design");
  }
}

function* updateDesignSaga() {
  yield takeEvery("UPDATE_DESIGN", updateDesign);
}

export default updateDesignSaga;
