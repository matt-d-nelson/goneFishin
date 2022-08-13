import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* saveDesign(action) {
  try {
    const res = yield axios({
      method: "post",
      url: "/api/bluegill",
      data: action.payload,
    });
    alert("your design was saved");
  } catch (err) {
    console.log(err);
    alert("error saving design");
  }
}

function* uploadPNG(action) {
  try {
    yield axios({
      method: "post",
      url: "/api/bluegill/png",
      data: action.payload,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.log(err);
    alert("error uploading png");
  }
}

function* saveDesignSaga() {
  yield takeEvery("SAVE_DESIGN", saveDesign);
  yield takeEvery("UPLOAD_PNG", uploadPNG);
}

export default saveDesignSaga;
