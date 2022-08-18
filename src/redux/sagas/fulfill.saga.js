import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* fulfillSaga() {
  yield takeEvery('FULFILL_ORDER', fulfillOrder);
}

function* fulfillOrder(action){
  // server request to mark an order fulfilled or unfulfilled
  try{
    console.log('admin fulfill saga payload:', action.payload);
    yield axios.put(`/api/swordfish/${action.payload.cart_id}`);
    // saga to get all orders (including newly updated)
    console.log('message:', action.payload.message);
    yield put({type: 'FETCH_ORDERS'});
    // open modal to confirm success of order un/fulfillment
    yield put({
        type: "OPEN_MODAL",
        payload: {
          type: "success", 
          open: true, 
          success: action.payload.message}
      })
  } catch(err){
    console.log('fulfill saga error:', err);
  }
}

export default fulfillSaga;
