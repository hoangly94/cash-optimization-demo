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
    const responseData = yield call(getData, state.atmCdm.filters);
    yield put({ type: UPDATE_DATA, queryResult: responseData.data.data });
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/shipping/createATMCDM', state.atmCdm.creatingPopup);
    // yield put({ type: UPDATE_DATA, queryResult: data });
    yield put({ type: DONE_CREATING });

    yield fetchDataSaga();
}

function* editDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/shipping/updateATMCDM', state.atmCdm.selectedItem);
    // yield put({ type: UPDATE_DATA, queryResult: data });
    yield put({ type: DONE_CREATING });

    yield fetchDataSaga();
}

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function getHistory() {
    const url = Config.url + '/api/shipping/historyCategoryATMCDM';
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
    const url = Config.url + '/api/shipping/findCategoryATMCDM';
    const postData = {
        data: {
            orgsId: filters.managementUnitName.value ? filters.managementUnitName.value : 0,
            atmStatus: filters.atmCdmStatus.value ? filters.atmCdmStatus.value : null,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function requestCreating(url: string, data) {
    const postData = {
        data: {
            atmCdmCode: parseInt(data.atmCdmCode),
            atmCdmName: data.atmCdmName,
            atmCdmType: data.atmCdmType,
            atmAddress: data.atmAddress,
            atmStatus: data.atmCdmSelected.value,
            orgsId: data.orgsCodeSelected.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestEditing(url: string, data) {
    const postData = {
        data: {
            id: parseInt(data.id),
            atmCdmCode: parseInt(data.atmCdmCode),
            atmCdmName: data.atmCdmName,
            atmCdmType: data.atmCdmType,
            atmAddress: data.atmAddress,
            atmStatus: data.atmCdmSelected.value,
            orgsId: data.orgsCodeSelected.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}



export default saga;