import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING, FETCH_HISTORY, UPDATE_HISTORY } from './constants';
import Config from '@config';
import { HANDLE_POPUP } from '~stores/_base/constants';
import { addNoti } from '~stores/_base/sagas';

function* saga() {
    yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, editDataSaga);
}

function* fetchHistorySaga(action?) {
    const responseData = yield call(getHistory, action);
    yield put({ type: UPDATE_HISTORY, data: responseData.data });
}

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.orgs.filters, action);

    yield put({ type: UPDATE_DATA, data: responseData.data });
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/cashoptimization/createCategoryOrgs', state.orgs.creatingPopup);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error');
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['orgs', 'create', 'isShown'], value: false });
}

function* editDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/updateCategoryOrgs', state.orgs.selectedItem);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error');
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['orgs', 'edit', 'isShown'], value: false });
}

function getHistory(action) {
    const {
        page = 0,
        sort = '',
    } = action;
    const url = Config.url + '/api/cashoptimization/historyCategoryOrgs';
    const postData = {
        data: {
            sort: sort,
            page: page,
            size: Config.numberOfItemsPerPage,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getData(filters, action) {
    const {
        page = 0,
        sort = '',
    } = action;const url = Config.url + '/api/cashoptimization/findCategoryOrgs';
    const orgsCode = parseInt(filters.orgsCode);
    const postData = {
        data: {
            areaCode: filters.area?.value ? parseInt(filters.area.value) : 0,
            orgsCode: orgsCode ? orgsCode : 0,
            sort,
            page,
            size: Config.numberOfItemsPerPage,
        },
    }
    return axios.post(url, postData)
        .catch(error => error.response);
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