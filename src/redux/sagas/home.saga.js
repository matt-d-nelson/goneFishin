import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* getAllUserDesigns(action) {
  try {
    const response = yield axios.get(`/api/carp`);
    console.log('CARP DATA', response.data);
    yield put ({ type: 'SET_DESIGNS', payload: response.data});
  } catch (error) {
    console.log('error in get all user designs', error);
  }
 
}

function* homeSaga() {
  yield takeLatest('FETCH_USER_DESIGNS', getAllUserDesigns);
}

export default homeSaga;
