import axios from 'axios';
import { select, all, call, put, take, takeLatest } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING, FETCH_HISTORY, UPDATE_HISTORY } from './constants';
import Config from '@config';
import { getCurrentDate } from '@utils';

function* saga() {
    yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, editDataSaga);
}

function* fetchHistorySaga() {
    const responseData = yield call(getHistory);
    yield put({ type: UPDATE_HISTORY, data: responseData.data.data });
}

function* fetchDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();

    const responseData = yield call(getData, state.orgs.filters);
    yield put({ type: UPDATE_DATA, queryResult: responseData.data.data });
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/shipping/createCategoryOrgs', state.orgs.creatingPopup);
    // yield put({ type: UPDATE_DATA, queryResult: data });
    yield put({ type: DONE_CREATING });

    yield fetchDataSaga();
}

function* editDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/shipping/updateCategoryOrgs', state.orgs.selectedItem);
    // yield put({ type: UPDATE_DATA, queryResult: data });
    yield put({ type: DONE_CREATING });

    yield fetchDataSaga();
}

function getHistory() {
    const url = Config.url + '/api/shipping/historyCategoryOrgs';
    const postData = {
        "data": {
            "page": 0,
            "size": 5
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getData(filters) {
    const url = Config.url + '/api/shipping/findCategoryOrgs';
    const orgsCode = parseInt(filters.orgsCode);
    const postData = {
        data: {
            areaCode: filters.area?.value ? parseInt(filters.area.value) : 0,
            orgsCode: orgsCode ? orgsCode : 0,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function requestCreating(url: string, data) {
    const postData = {
        data: {
            orgsCode: parseInt(data.orgsCode),
            orgsName: data.orgsName,
            orgsAddress: data.orgsAddress,
            areaId: data.areaSelected.value,
            areaCode: data.areaSelected.value,
            areaName: data.areaSelected.text,
            orgsParentId: data.orgsParentSelected.value,
            dvqlKc: data.dvqlKc,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestEditing(url: string, data) {
    const postData = {
        data: {
            id: data.id,
            orgsCode: parseInt(data.orgsCode),
            orgsName: data.orgsName,
            orgsAddress: data.orgsAddress,
            areaId: data.areaSelected.value,
            areaCode: data.areaSelected.value,
            areaName: data.areaSelected.text,
            orgsParentId: data.orgsParentSelected.value,
            dvqlKc: data.dvqlKc,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}


export default saga;