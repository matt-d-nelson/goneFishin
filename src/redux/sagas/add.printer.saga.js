import { put, takeEvery, delay } from 'redux-saga/effects';
import axios from 'axios';


function* addPrinterSaga() {
  yield takeEvery('ADD_PRINTER_TO_CART', addPrinter);
}

function* addPrinter(action){
  // server request to add a printer to cart
  try{
    console.log('in addPrinter saga');
    yield axios.post(`/api/bass/printer`);
    // saga to get all user's cart items (including newly updated)
    yield put({type: 'FETCH_CART_ITEMS'});
    // open modal to confirm success
    yield put({
        type: "OPEN_MODAL",
        payload: {
          type: "success", 
          open: true, 
          success: action.payload.message}
      });
    // after a delay, close the modal
    yield delay(1100);
    yield put ({type: 'CLOSE_MODAL'});
  } catch(err){
    console.log('add printer saga error:', err);
  }
}

export default addPrinterSaga;
