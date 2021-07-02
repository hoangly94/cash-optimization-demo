import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn, takeEvery, delay } from 'redux-saga/effects';
import { DONE_CREATING, FETCH_DATA, HANDLE_APPROVE_ACTION, HANDLE_CONTINUE_ACTION, HANDLE_DELETE_ACTION, HANDLE_ORGSSEARCHING_CONTINUE, HANDLE_ORGSSEARCHING_UPDATE, HANDLE_REJECT_ACTION, HANDLE_SPECIAL_ADD, HANDLE_VALIDATE_APPROVE1, HANDLE_VALIDATE_APPROVE2, HANDLE_VALIDATE_APPROVE3, HANDLE_VALIDATE_REJECT1, HANDLE_VALIDATE_REJECT2, HANDLE_VALIDATE_REJECT3, REQUEST_CREATING, REQUEST_EDITING, REQUEST_QUERY, UPDATE_DATA, UPDATE_SPECIAL_DATA, } from './constants';
import Config from '@config';
import { addNoti } from '~stores/_base/sagas';
import { HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import { _Date } from '@utils';
import _ from 'lodash';

function* saga() {
    // yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, updateDataSaga);
    yield takeLatest(HANDLE_APPROVE_ACTION, handleApprovalSaga, 1);
    yield takeLatest(HANDLE_REJECT_ACTION, handleApprovalSaga, 2);
    yield takeLatest(HANDLE_DELETE_ACTION, deleteDataSaga);
    yield takeLatest(HANDLE_CONTINUE_ACTION, continueSaga);
    yield takeLatest(HANDLE_ORGSSEARCHING_UPDATE, orgsSearchingUpdateSaga);
    yield takeLatest(HANDLE_ORGSSEARCHING_CONTINUE, orgsSearchingContinueSaga);
    yield takeLatest(HANDLE_VALIDATE_APPROVE1, validateSaga, 1, 1, 1);
    yield takeLatest(HANDLE_VALIDATE_APPROVE2, validateSaga, 1, 1, 2);
    yield takeLatest(HANDLE_VALIDATE_APPROVE3, validateSaga, 1, 1, 3);
    yield takeLatest(HANDLE_VALIDATE_REJECT1, validateSaga, 1, 2, 1);
    yield takeLatest(HANDLE_VALIDATE_REJECT2, validateSaga, 1, 2, 2);
    yield takeLatest(HANDLE_VALIDATE_REJECT3, validateSaga, 1, 2, 3);
    yield takeLatest(HANDLE_SPECIAL_ADD, specialAddSaga);
}

// function* fetchHistorySaga(action?) {
//     const responseData = yield call(getHistory, action?.page);
//     yield put({ type: UPDATE_HISTORY, data: responseData.data });
// }

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.pycRegistration.filters, state.auth, action?.page);

    yield put({ type: UPDATE_DATA, data: responseData.data });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'delete', 'isDisabled'], value: true });
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/cashoptimization/pyc_add', state.pycRegistration.creatingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['pycRegistration', 'create', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'specialDeleteCreating', 'isDisabled'], value: true });
}

function* updateDataSaga() {
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/pyc_update', state.pycRegistration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['pycRegistration', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'delete', 'isDisabled'], value: true });
}

function* continueSaga() {
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/pyc_continue', state.pycRegistration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'delete', 'isDisabled'], value: true });
}

function* orgsSearchingUpdateSaga() {
    const state = yield select();
    const responseData = yield call(requestOrgsSearching, Config.url + '/api/cashoptimization/pyc_orgs_update', state.pycRegistration.orgsSearchingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['pycRegistration', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'delete', 'isDisabled'], value: true });
}

function* orgsSearchingContinueSaga() {
    const state = yield select();
    const responseData = yield call(requestOrgsSearching, Config.url + '/api/cashoptimization/pyc_orgs_continue', state.pycRegistration.orgsSearchingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'delete', 'isDisabled'], value: true });
}

function* handleApprovalSaga(type) {
    const state = yield select();

    const responseData = type == 1
        ? yield call(requestApproval, Config.url + '/api/cashoptimization/authority/approve', state.pycRegistration.editingPopup, state.auth)
        : yield call(requestApproval, Config.url + '/api/cashoptimization/authority/reject', state.pycRegistration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', 'Lệnh UQ ở trạng thái không cho phép duyệt');
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['pycRegistration', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'delete', 'isDisabled'], value: true });
}

function* deleteDataSaga() {
    const state = yield select();
    const responseData = yield call(requestDelete, Config.url + '/api/cashoptimization/pyc_delete', state.pycRegistration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'delete', 'isDisabled'], value: true });
}

function* specialAddSaga() {
    const state = yield select();
    const popupType = { 1: 'creatingPopup', 2: 'editingPopup', }[state.pycRegistration.popupType];
    const cashOptimizatioDetailModelList = state.pycRegistration[popupType].cashOptimizatioDetailModelList;

    const newItem = {
        type: state.pycRegistration[popupType].type,
        currencyType: state.pycRegistration[popupType].currencyType,
        goldType: state.pycRegistration[popupType].goldType,
        quanlity: state.pycRegistration[popupType].quanlity,
        attribute: state.pycRegistration[popupType].attribute,
    }
    const filterSameSpecialData = (newItem) => (item) => {
        if (
            item.type.value == newItem.type.value
            && item.currencyType.value == newItem.currencyType.value
            && (!item.goldType.value || (item.goldType.value && item.goldType.value == newItem.goldType.value))
            && item.attribute.value == newItem.attribute.value
        ) {
            return true;
        }
        return false;
    }
    if (_.isEmpty(cashOptimizatioDetailModelList.filter(filterSameSpecialData(newItem)))) {
        return yield put({ type: UPDATE_SPECIAL_DATA });
    }
    return yield spawn(addNoti, 'error', 'Yêu cầu điều quỹ đã tồn tại');
}

function* validateSaga(statusType, validateType, urlType) {
    const state = yield select();
    const url = Config.url + (function () {
        if (validateType === 1) {
            if (urlType === 1)
                return '/api/cashoptimization/pyc_cpd_approve';
            if (urlType === 2)
                return '/api/cashoptimization/pyc_dvdq_check_approve';
            if (urlType === 3)
                return '/api/cashoptimization/pyc_cpd_dvdq_check_approve';
        }
        if (validateType === 2) {
            if (urlType === 1)
                return '/api/cashoptimization/pyc_cpd_approve_reject';
            if (urlType === 2)
                return '/api/cashoptimization/pyc_dvdq_check_approve_reject';
            if (urlType === 3)
                return '/api/cashoptimization/pyc_cpd_dvdq_check_approve_reject';
        }
    })();

    const responseData = yield call(requestEditing, url, state.pycRegistration.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['pycRegistration', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'delete', 'isDisabled'], value: true });
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

function getData(filters, auth, page: number = 0) {
    const url = Config.url + '/api/cashoptimization/pycsearch';
    const data = filters.radio === '1'
        ? {
            pers_code: auth.user.code,
            orgs_code: filters.orgs.value,
            from_date: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateFrom),
            to_date: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateTo),
            orgs_role: filters.orgsRole.value,
            object_type: filters.objectType.value,
            status: filters.status.value,
        }
        : {
            id: filters.id,
            pers_code: '0',
            orgs_code: '0',
            orgs_role: '',
            object_type: '',
            status: ''
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
            orgsRequestId: data.orgsRequestId,
            orgsCode: auth.user.orgsCode,
            orgsName: auth.user.orgsName,
            orgsHolderCode: auth.user.code,
            orgsHolderName: auth.user.fullname,
            orgsHolderMobile: auth.user.phone,
            objectType: data.objectType.value,
            priorityLevelCode: data.priorityLevelCode.value,
            priorityLevelName: data.priorityLevelCode.text,
            model: data.model.value,
            placeReceive: data.placeReceive.value,
            cashOptimizatioDetailModelList: data.cashOptimizatioDetailModelList.map(item => ({
                type: item.type.value,
                currencyType: item.currencyType.value,
                goldType: item.goldType.value,
                quanlity: item.quanlity,
                attribute: item.attribute.value,
            })),
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestEditing(url: string, data, auth) {
    console.log('========================');
    console.log(data.cashOptimizatioDetailModelList);
    console.log(data.cashOptimizatioDetailModelList.map(item => ({
        type: item.type.value,
        currencyType: item.currencyType.value,
        goldType: item.goldType.value,
        quanlity: item.quanlity,
        attribute: item.attribute.value,
    })),);
    const postData = {
        data: {
            id: data.id,
            orgsRequestId: data.orgsRequestId,
            orgsCode: auth.user.orgsCode,
            orgsName: auth.user.orgsName,
            orgsHolderCode: auth.user.code,
            orgsHolderName: auth.user.fullname,
            orgsHolderMobile: data.orgsHolderMobile,
            objectType: data.objectType.value,
            priorityLevelCode: data.priorityLevelCode.value,
            priorityLevelName: data.priorityLevelCode.text,
            model: data.model.value,
            placeReceive: data.placeReceive.value,
            cashOptimizatioDetailModelList: data.cashOptimizatioDetailModelList.map(item => ({
                type: item.type.value,
                currencyType: item.currencyType.value,
                goldType: item.goldType.value,
                quanlity: item.quanlity,
                attribute: item.attribute.value,
            })),
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestOrgsSearching(url: string, data, auth) {
    const postData = {
        data: {
            id: data.id,
            orgsRequestId: data.orgsRequestId,
            orgsCode: auth.user.orgsCode,
            orgsName: auth.user.orgsName,
            orgsHolderCode: auth.user.code,
            orgsHolderName: auth.user.fullname,
            orgsHolderMobile: data.orgsHolderMobile,
            objectType: data.objectType.value,
            priorityLevelCode: data.priorityLevelCode.value,
            priorityLevelName: data.priorityLevelCode.text,
            model: data.model.value,
            placeReceive: data.placeReceive.value,
            cashOptimizatioDetailModelList: data.cashOptimizatioDetailModelList.map(item => ({
                type: item.type.value,
                currencyType: item.currencyType.value,
                goldType: item.goldType.value,
                quanlity: item.quanlity,
                attribute: item.attribute.value,
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
            id: data.id,
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
            id: data.id,
            cashOptimizationReasonType: "",
            cashOptimizationReasonDesc: ""
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}


export default saga;