import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* feedSaga() {
  yield takeEvery('FETCH_ALL_PUBLIC_DESIGNS', getAllPublicDesigns);
}

function* getAllPublicDesigns(action){
  try{
    const response =
    yield axios.get(`/api/flounder`);
    yield put({ type: "SET_ALL_PUBLIC_DESIGNS", payload: response.data });
  }catch(err){
    console.log('feed saga error:', err);
  }
}

export default feedSaga;