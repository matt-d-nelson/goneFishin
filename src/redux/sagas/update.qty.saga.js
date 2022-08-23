import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* updateQtySaga() {
  yield takeEvery('UPDATE_CART_QTY', updateQty);
}

function* updateQty(action){
  // server request to update quantity of an item in cart
  try{
    console.log('update qty saga payload:', action.payload);
    yield axios.put(`/api/guppy/${action.payload.id}/${action.payload.qty}`);
    // saga to get all user's cart items (including newly updated)
    console.log('message:', action.payload.message);
    yield put({type: 'FETCH_CART_ITEMS'});
    // open modal to confirm success
    yield put({
        type: "OPEN_MODAL",
        payload: {
          type: "success", 
          open: true, 
          success: action.payload.message}
      })
  } catch(err){
    console.log('update qty saga error:', err);
  }
}

export default updateQtySaga;
