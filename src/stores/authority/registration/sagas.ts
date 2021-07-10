import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn, takeEvery } from 'redux-saga/effects';
import { DONE_CREATING, FETCH_DATA, HANDLE_APPROVE_ACTION, HANDLE_CONTINUE_ACTION, HANDLE_DELETE_ACTION, HANDLE_REJECT_ACTION, REQUEST_CREATING, REQUEST_EDITING, REQUEST_QUERY, UPDATE_DATA, } from './constants';
import Config from '@config';
import { addNoti } from '~stores/_base/sagas';
import { HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
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
//     const responseData = yield call(getHistory, action);
//     yield put({ type: UPDATE_HISTORY, data: responseData.data });
// }

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.registration.filters, state.auth, action);

    yield put({ type: UPDATE_DATA, data: responseData.data });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'delete', 'isDisabled'], value: true });
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/cashoptimization/authority/create', state.registration.creatingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData.data.message);
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['registration', 'create', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'delete', 'isDisabled'], value: true });
}

function* updateDataSaga() {
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/authority/update', state.registration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData.data.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['registration', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'delete', 'isDisabled'], value: true });
}

function* continueSaga() {
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/authority/continue', state.registration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData.data.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'delete', 'isDisabled'], value: true });
}

function* handleApprovalSaga(type) {
    const state = yield select();

    const responseData = type == 1
        ? yield call(requestApproval, Config.url + '/api/cashoptimization/authority/approve', state.registration.editingPopup, state.auth)
        : yield call(requestApproval, Config.url + '/api/cashoptimization/authority/reject', state.registration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['registration', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'delete', 'isDisabled'], value: true });
}

function* deleteDataSaga() {
    const state = yield select();
    const responseData = yield call(requestDelete, Config.url + '/api/cashoptimization/authority/delete', state.registration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData.data.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['registration', 'delete', 'isDisabled'], value: true });
}

function getHistory(action) {
    const {
        page = 0,
        sort = '',
    } = action;const url = Config.url + '/api/cashoptimization/historyCategoryArea';
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

function getData(filters, auth, action) {
    const {
        page = 0,
        sort = '',
    } = action;const url = Config.url + '/api/cashoptimization/authority/search';
    const data = filters.radio === '1'
        ? {
            orgsId: auth.user.orgsCode == 9 ? filters.orgs.value : auth.user.orgsId,
            authorityFromDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateFrom),
            authorityToDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateTo),
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
            sort: sort,
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
            orgsId: auth.user.orgsId,
            createdbyCode: auth.user.code,
            createdbyName: auth.user.name,
            authorityFromDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(data.dateFrom),
            authorityToDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(data.dateTo),
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
            authorityFromDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(data.dateFrom),
            authorityToDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(data.dateTo),
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