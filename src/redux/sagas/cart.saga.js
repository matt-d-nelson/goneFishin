import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* cartItemsSaga() {
  yield takeEvery('FETCH_CART_ITEMS', fetchCartItems);
}

function* fetchCartItems(){
  // server request to get all cart items from this user that haven't been ordered
  try{
    const cart = yield axios.get('/api/guppy');
    console.log('fetchCartItems response:', cart.data);
    // send cart items data to reducer
    yield put({type: 'SET_CART_ITEMS', payload: cart.data});
  } catch(err){
    console.log('cart items saga error:', err);
  }
}

export default cartItemsSaga;
