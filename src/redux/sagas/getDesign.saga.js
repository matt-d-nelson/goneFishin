import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

function* getDesign(action) {
  try {
    const res = yield axios.get(`/api/anglerfish/${action.payload}`);
    yield put({ type: "SET_EDIT_DESIGN", payload: res.data });
  } catch (err) {
    console.log(err);
    alert("error getting design");
  }
}

function* getDesignSaga() {
  yield takeLatest("GET_DESIGN", getDesign);
}

export default getDesignSaga;
