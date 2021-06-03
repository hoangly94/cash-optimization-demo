import axios from 'axios';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, SHOW_DATA } from './constants';


function getData(url:string, postData) {
    return axios.get(url)
        .catch(error => console.log(error));
}

function* fetchDataSaga() {
    const filters = yield take(REQUEST_QUERY);

    const data = yield call(getData, 'https://your-server.com/get-data', filters);

    yield put(SHOW_DATA, { data: data });
}

function* saga() {
    yield takeLatest(FETCH_DATA, fetchDataSaga);
}

export default saga;
