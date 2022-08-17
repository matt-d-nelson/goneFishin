import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* saveDesign(action) {
  try {
    const res = yield axios({
      method: "post",
      url: "/api/bluegill",
      data: action.payload,
    });
    // alert("your design was saved");
    // replaced with modal
  } catch (err) {
    console.log(err);
    alert("error saving design");
  }
}

function* saveDesignSaga() {
  yield takeEvery("SAVE_DESIGN", saveDesign);
}

export default saveDesignSaga;
