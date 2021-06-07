import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_CONFIG, UPDATE_CONFIG, FETCH_AREAS, FETCH_ORGS, UPDATE_AREAS, UPDATE_ORGS } from './constants';
import Config from '@config';

function* saga() {
    yield all([
        takeLatest(FETCH_CONFIG, fetchConfig),
        takeLatest(FETCH_AREAS, fetchAreas),
        takeLatest(FETCH_ORGS, fetchOrgs),
    ]);
}

function* fetchConfig() {
    const path = '/api/shipping/findConfig';
    const postData = {
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_CONFIG, data: responseData.data.data });
}


function* fetchAreas() {
    const path = '/api/shipping/findCategoryArea';
    const postData = {
        data: {
            areaCode: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_AREAS, data: responseData.data.data });
}

function* fetchOrgs() {
    const path = '/api/shipping/findCategoryOrgs';
    const postData = {
        data: {
            areaCode: 0,
            orgsCode: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_ORGS, data: responseData.data.data });
}

const callApi = (path, postData?) => {
    return axios.post(Config.url + path, postData)
        .catch(error => console.log(error));
}


export default saga;