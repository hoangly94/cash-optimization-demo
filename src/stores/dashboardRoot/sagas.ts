import axios from 'axios';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { FETCH_CONFIG, UPDATE_CONFIG, FETCH_AREAS, FETCH_ORGS, UPDATE_AREAS, UPDATE_ORGS, FETCH_FUNCTIONS, FETCH_PERS,UPDATE_PERS, UPDATE_FUNCTIONS, FETCH_REGIONS, UPDATE_REGIONS, UPDATE_TITLES, FETCH_TITLES } from './constants';
import Config from '@config';

function* saga() {
    yield all([
        takeEvery(FETCH_CONFIG, fetchConfig),
        takeEvery(FETCH_AREAS, fetchAreas),
        takeEvery(FETCH_ORGS, fetchOrgs),
        takeEvery(FETCH_FUNCTIONS, fetchFunctions),
        takeEvery(FETCH_PERS, fetchPers),
        takeEvery(FETCH_TITLES, fetchTitle),
        takeEvery(FETCH_REGIONS, fetchRegion),
    ]);
}

function* fetchConfig() {
    const path = '/api/cashoptimization/findConfig';
    const postData = {
        size:0,
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_CONFIG, data: responseData.data.data });
}


function* fetchAreas() {
    const path = '/api/cashoptimization/findCategoryArea';
    const postData = {
        data: {
            areaCode: 0,
            size:0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_AREAS, data: responseData.data.data });
}

function* fetchOrgs() {
    const path = '/api/cashoptimization/findCategoryOrgs';
    const postData = {
        data: {
            areaCode: 0,
            orgsCode: 0,
            size:0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_ORGS, data: responseData.data.data });
}

function* fetchFunctions() {
    const path = '/api/cashoptimization/findCategoryFunction';
    const postData = {
        data: {
            functionCode: 0,
            size:0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_FUNCTIONS, data: responseData.data.data });
}

function* fetchPers() {
    const path = '/api/cashoptimization/findCategoryPers';
    const postData = {
        data: {
            persCode: 0,
            orgsId: 0,
            size:0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_PERS, data: responseData.data.data });
}

function* fetchTitle() {
    const path = '/api/cashoptimization/findCategoryTitle';
    const postData = {
        data: {
            atmStatus: '',
            orgsId: 0,
            size:0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_TITLES, data: responseData.data.data });
}

function* fetchRegion() {
    const path = '/api/cashoptimization/findCategoryRegion';
    const postData = {
        data: {
            atmStatus: '',
            orgsId: 0,
            size:0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_REGIONS, data: responseData.data.data });
}

const callApi = (path, postData?) => {
    return axios.post(Config.url + path, postData)
        .catch(error => console.log(error));
}


export default saga;