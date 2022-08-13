import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* deleteOrderSaga() {
  yield takeEvery('DELETE_ORDER', deleteOrder);
}

function* deleteOrder(action){
  // server request to delete order from cart_items
  try{
    yield axios.delete(`/api/bass/${action.payload}`);
    // saga to get all orders (including newly updated)
    yield put({type: 'FETCH_ORDERS'});
  } catch(err){
    console.log('delete order saga error:', err);
  }
}

export default deleteOrderSaga;
