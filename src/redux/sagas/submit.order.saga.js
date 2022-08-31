import { put, takeEvery, delay } from "redux-saga/effects";
import axios from "axios";

function* submitOrderSaga() {
  yield takeEvery("ORDER_CART_ITEMS", submitOrder);
}

function* submitOrder() {
  // server request to mark cart item as ordered
  try {
    yield axios.put(`/api/guppy`);
    // saga to get all cart items
    yield put({ type: "FETCH_CART_ITEMS" });
    // open modal to confirm successful ordering
    yield put({
      type: "OPEN_MODAL",
      payload: {
        type: "success",
        open: true,
        success: "Order submitted!",
      },
    });
    yield delay(1100);
    yield put({ type: "CLOSE_MODAL" });
  } catch (err) {
    console.log("submit order saga error:", err);
  }
}

export default submitOrderSaga;
