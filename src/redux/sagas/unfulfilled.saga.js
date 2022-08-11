import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* unfulfilledSaga() {
  yield takeEvery('FETCH_UNFULFILLED', fetchUnfulfilled);
}

function* fetchUnfulfilled(){
  // server request to get unfulfilled orders
  try{
    const orders = yield axios.get('/api/catfish');
    console.log('fetchUnfulfilled response:', orders.data);
    // send orders data to reducer
    yield put({type: 'SET_UNFULFILLED', payload: orders.data});
  } catch(err){
    console.log('unfulfilled saga error:', err);
  }
}

export default unfulfilledSaga;
