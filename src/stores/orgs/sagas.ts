import axios from 'axios';
import { select, all, call, put, take, takeLatest } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING } from './constants';
import Config from '@config';
import { getCurrentDate } from '@utils';

function* saga() {
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, editDataSaga);
}

function* fetchDataSaga() {
    console.log('=================fetchData--Saga');
    yield put({ type: FETCH_DATA });
    const state = yield select();

    const responseData = yield call(getData, state.orgs.filters);
    yield put({ type: UPDATE_DATA, queryResult: responseData.data.data });
}

function* createDataSaga() {
    console.log('=================create--Saga');
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/shipping/createCategoryOrgs', state.orgs.creatingPopup);
    // yield put({ type: UPDATE_DATA, queryResult: data });
    yield put({ type: DONE_CREATING });

    yield fetchDataSaga();
}

function* editDataSaga() {
    console.log('=================edit--Saga');
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/shipping/updateCategoryOrgs', state.orgs.selectedItem);
    // yield put({ type: UPDATE_DATA, queryResult: data });
    yield put({ type: DONE_CREATING });
    
    yield fetchDataSaga();
}

const delay = (ms) => new Promise(res => setTimeout(res, ms))

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