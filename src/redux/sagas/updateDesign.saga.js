import axios from "axios";
import { put, takeEvery, delay } from "redux-saga/effects";

function* updateDesign(action) {
  try {
    // open loading modal
    yield put({
      type: "OPEN_MODAL",
      payload: {
        type: "loading",
        open: true,
      },
    });
    // send update request
    yield axios({
      method: "put",
      url: "/api/anglerfish",
      data: action.payload,
    });
    // open success modal
    yield put({
      type: "OPEN_MODAL",
      payload: {
        type: "success_nav",
        open: true,
        success: "Your Design Was Updated",
        history: "/home",
      },
    });
  } catch (err) {
    console.log(err);
    alert("error updating design");
  }
}

function* updateDesignSaga() {
  yield takeEvery("UPDATE_DESIGN", updateDesign);
}

export default updateDesignSaga;
