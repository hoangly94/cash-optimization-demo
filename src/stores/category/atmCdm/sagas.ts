import axios from 'axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING, FETCH_HISTORY, UPDATE_HISTORY } from './constants';
import Config from '@config';
import { addNoti } from '~stores/_base/sagas';
import { HANDLE_POPUP } from '~stores/_base/constants';

function* saga() {
    yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, editDataSaga);
}

function* fetchHistorySaga(action?) {
    const responseData = yield call(getHistory, action?.page);

    yield put({ type: UPDATE_HISTORY, data: responseData.data });
}

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.atmCdm.filters, action?.page);

    yield put({ type: UPDATE_DATA, data: responseData.data });
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/cashoptimization/createATMCDM', state.atmCdm.creatingPopup);
    
    if(!responseData || !responseData.data || responseData.data.resultCode != 0){
        return yield spawn(addNoti, 'error');
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP,  keys: ['atmCdm', 'create', 'isShown'], value:false});
}

function* editDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/updateATMCDM', state.atmCdm.selectedItem);
    
    if(!responseData || !responseData.data || responseData.data.resultCode != 0){
        return yield spawn(addNoti, 'error');
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
    yield fetchDataSaga();
    yield put({ type: HANDLE_POPUP,  keys: ['atmCdm', 'edit', 'isShown'], value:false});
}
function getHistory(page:number = 0) {
    const url = Config.url + '/api/cashoptimization/historyCategoryATMCDM';
    const postData = {
        data: {
            page: page,
            size: Config.numberOfItemsPerPage,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getData(filters, page:number = 0) {
    console.log(filters);
    const url = Config.url + '/api/cashoptimization/findCategoryATMCDM';
    const postData = {
        data: {
            atmStatus: filters.atmCdmStatus?.value ? filters.atmCdmStatus.value : null,
            orgsId: filters.orgs?.value ? filters.orgs.value : 0,
            page:page,
            size: Config.numberOfItemsPerPage,
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
            orgsId: data.orgsSelected.value,
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
            orgsId: data.orgsSelected.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}



export default saga;