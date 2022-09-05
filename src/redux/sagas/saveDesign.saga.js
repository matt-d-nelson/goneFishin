import axios from "axios";
import { useHistory } from "react-router-dom";
import { put, takeEvery, delay } from "redux-saga/effects";

function* saveDesign(action) {
  try {
    // open loading modal
    yield put({
      type: "OPEN_MODAL",
      payload: {
        type: "loading",
        open: true,
      },
    });
    // send post request
    const res = yield axios({
      method: "post",
      url: "/api/bluegill",
      data: action.payload,
    });

    // open success modal
    yield put({
      type: "OPEN_MODAL",
      payload: {
        type: "success_nav",
        open: true,
        success: "Your Design Was Saved",
        history: "/home",
      },
    });
  } catch (err) {
    console.log(err);
    alert("error saving design");
  }
}

function* saveDesignSaga() {
  yield takeEvery("SAVE_DESIGN", saveDesign);
}

export default saveDesignSaga;
