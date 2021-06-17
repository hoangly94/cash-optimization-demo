import axios from 'axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { DONE_CREATING, FETCH_DATA, HANDLE_APPROVE_ACTION, HANDLE_CONTINUE_ACTION, HANDLE_DELETE_ACTION, HANDLE_REJECT_ACTION, REQUEST_CREATING, REQUEST_EDITING, REQUEST_QUERY, UPDATE_DATA, } from './constants';
import Config from '@config';
import { addNoti } from '~stores/_base/sagas';
import { HANDLE_POPUP } from '~stores/_base/constants';
import { _Date } from '_/utils';

function* saga() {
    // yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, updateDataSaga);
    yield takeLatest(HANDLE_APPROVE_ACTION, handleApprovalSaga, 1);
    yield takeLatest(HANDLE_REJECT_ACTION, handleApprovalSaga, 2);
    yield takeLatest(HANDLE_DELETE_ACTION, deleteDataSaga);
    yield takeLatest(HANDLE_CONTINUE_ACTION, continueSaga);
}

// function* fetchHistorySaga(action?) {
//     const responseData = yield call(getHistory, action?.page);
//     yield put({ type: UPDATE_HISTORY, data: responseData.data });
// }

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.registration.filters, action?.page);

    yield put({ type: UPDATE_DATA, data: responseData.data });
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/cashoptimization/authority/create', state.registration.creatingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error');
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['registration', 'create', 'isShown'], value: false });
}

function* updateDataSaga() {
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/authority/update', state.registration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error');
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['registration', 'edit', 'isShown'], value: false });
}

function* continueSaga() {
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/authority/continue', state.registration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error');
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['registration', 'edit', 'isShown'], value: false });
}

function* handleApprovalSaga(type) {
    const state = yield select();

    const responseData = type == 1
        ? yield call(requestApproval, Config.url + '/api/cashoptimization/authority/approve', state.registration.editingPopup, state.auth)
        : yield call(requestApproval, Config.url + '/api/cashoptimization/authority/reject', state.registration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', 'Lệnh UQ ở trạng thái không cho phép duyệt');
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['registration', 'edit', 'isShown'], value: false });
}

function* deleteDataSaga() {
    const state = yield select();
    const responseData = yield call(requestDelete, Config.url + '/api/cashoptimization/authority/delete', state.registration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error');
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
}

function getHistory(page: number = 0) {
    const url = Config.url + '/api/cashoptimization/historyCategoryArea';
    const postData = {
        data: {
            page: page,
            size: Config.numberOfItemsPerPage,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getData(filters, page: number = 0) {
    console.log(filters);
    const url = Config.url + '/api/cashoptimization/authority/search';
    const data = filters.radio === '1'
        ? {
            orgsId: filters.orgs.value,
            authorityFromDate: _Date.convertDataDDMMYYYtoYYYYMMDD(filters.dateFrom),
            authorityToDate: _Date.convertDataDDMMYYYtoYYYYMMDD(filters.dateTo),
            authorityStatus: filters.status.value,
        }
        : {
            authorityId: filters.id,
            orgsId: '0',
            authorityFromDate: null,
            authorityToDate: null,
            authorityStatus: '',
        };
    const postData = {
        data: {
            ...data,
            page: page,
            size: Config.numberOfItemsPerPage,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function requestCreating(url: string, data, auth) {
    const postData = {
        data: {
            orgsId: data.orgsId,
            createdbyCode: auth.user.code,
            createdbyName: auth.user.name,
            authorityFromDate: _Date.convertDataDDMMYYYtoYYYYMMDD(data.dateFrom),
            authorityToDate: _Date.convertDataDDMMYYYtoYYYYMMDD(data.dateTo),
            persId: data.sendId,
            persCode: data.sendCode,
            persFullname: data.sendName,
            persTitle: data.sendTitle,
            persCmndCccd: data.sendCmnd,
            receiverPersId: data.recvId,
            receiverPersCode: data.recvCode,
            receiverPersFullname: data.recvName,
            receiverPersTitle: data.recvTitle,
            receiverPersCmndCccd: data.recvCmnd,
            receiverPersCmndCccdYear: data.recvCmndyear,
            receiverPersCmndCccdPlace: data.recvCmndPlace,
            receiverPersMobile: data.recvPhone,
            authorityDetail: data.authorityContent2.map(item => ({
                authorityContentId: item.id,
                authorityContentValue: item.name,
            })),
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestEditing(url: string, data, auth) {
    const postData = {
        data: {
            id: data.id,
            createdbyCode: auth.user.code,
            createdbyName: auth.user.name,
            orgsId: data.orgsId,
            authorityFromDate: _Date.convertDataDDMMYYYtoYYYYMMDD(data.dateFrom),
            authorityToDate: _Date.convertDataDDMMYYYtoYYYYMMDD(data.dateTo),
            persId: data.sendId,
            persCode: data.sendCode,
            persFullname: data.sendName,
            persTitle: data.sendTitle,
            persCmndCccd: data.sendCmnd,
            receiverPersId: data.recvId,
            receiverPersCode: data.recvCode,
            receiverPersFullname: data.recvName,
            receiverPersTitle: data.recvTitle,
            receiverPersCmndCccd: data.recvCmnd,
            receiverPersCmndCccdYear: data.recvCmndyear,
            receiverPersCmndCccdPlace: data.recvCmndPlace,
            receiverPersMobile: data.recvPhone,
            authorityDetail: data.authorityContent2.map(item => ({
                authorityContentId: item.id,
                authorityContentValue: item.name,
            })),
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestApproval(url: string, data, auth) {
    const rejectReason = data.rejectReason
        ? { authorityReason: data.rejectReason } : {};
    const postData = {
        data: {
            authorityId: data.id,
            userCode: auth.user.code,
            userName: auth.user.name,
            ...rejectReason,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestDelete(url: string, data, auth) {
    const postData = {
        data: {
            authorityId: data.id,
            userCode: auth.user.code,
            userName: auth.user.name,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}


export default saga;