import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* submitOrderSaga() {
  yield takeEvery('ORDER_CART_ITEMS', submitOrder);
}

function* submitOrder(){
  // server request to mark cart item as ordered
  try{
    yield axios.put(`/api/guppy`);
    // saga to get all cart items
    yield put({type: 'FETCH_CART_ITEMS'});
  } catch(err){
    console.log('submit order saga error:', err);
  }
}

export default submitOrderSaga;
