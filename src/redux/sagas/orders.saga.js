import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* ordersSaga() {
  yield takeEvery('FETCH_ORDERS', fetchOrders);
}

function* fetchOrders(){
  // server request to get all orders
  try{
    const orders = yield axios.get('/api/catfish');
    console.log('fetchOrders response:', orders.data);
    // send orders data to reducer
    yield put({type: 'SET_ORDERS', payload: orders.data});
  } catch(err){
    console.log('orders saga error:', err);
  }
}

export default ordersSaga;
