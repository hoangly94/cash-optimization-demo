import axios from 'axios';
import { select, all, call, put, take, takeLatest } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING, REQUEST_ORGS_LIST, UPDATE_ORGS_LIST } from './constants';
import Config from '@config';
import { getCurrentDate } from '@utils';

function* saga() {
    yield takeLatest(REQUEST_ORGS_LIST, fetchOrgsDataSaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, editDataSaga);
}

function* fetchOrgsDataSaga() {
    console.log('=================getOrgsList--Saga');
    const responseData = yield call(getOrgsList);
    yield put({ type: UPDATE_ORGS_LIST, data: responseData.data.data });
}

function* fetchDataSaga() {
    console.log('=================fetchData--Saga');
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.atmCdm.filters);
    yield put({ type: UPDATE_DATA, queryResult: responseData.data.data });
}

function* createDataSaga() {
    console.log('=================create--Saga');
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/shipping/createATMCDM', state.atmCdm.creatingPopup);
    // yield put({ type: UPDATE_DATA, queryResult: data });
    yield put({ type: DONE_CREATING });

    yield fetchDataSaga();
}

function* editDataSaga() {
    console.log('=================edit--Saga');
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/shipping/updateATMCDM', state.atmCdm.selectedItem);
    // yield put({ type: UPDATE_DATA, queryResult: data });
    yield put({ type: DONE_CREATING });

    yield fetchDataSaga();
}

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function getOrgsList() {
    const url = Config.url + '/api/shipping/findCategoryOrgs';
    const postData = {
        data: {
            areaCode: 0,
            orgsCode: 0,
        },
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
    console.log(data);
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