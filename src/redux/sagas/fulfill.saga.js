import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* fulfillSaga() {
  yield takeEvery('FULFILL_ORDER', fulfillOrder);
}

function* fulfillOrder(action){
  // server request to mark an order fulfilled
  try{
    yield axios.put(`/api/swordfish/${action.payload}`);
    // saga to get all orders (including newly updated)
    yield put({type: 'FETCH_ORDERS'});
  } catch(err){
    console.log('fulfill saga error:', err);
  }
}

export default fulfillSaga;
