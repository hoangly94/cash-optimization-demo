import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn, takeEvery, delay } from 'redux-saga/effects';
import { DONE_CREATING, FETCH_DATA, FETCH_HISTORY, FETCH_ORGSSEARCHING_DISTANCE, FETCH_ORGS_CHILDREN, FETCH_PYC, GET_EXCEL, GET_HISTORY_EXCEL, REQUEST_UPDATE_CONTINUE, HANDLE_ORGSSEARCHING_CONTINUE, HANDLE_ORGSSEARCHING_UPDATE, HANDLE_REJECT_ACTION, HANDLE_SPECIAL_ADD, HANDLE_VALIDATE_APPROVE1, HANDLE_VALIDATE_APPROVE2, HANDLE_VALIDATE_APPROVE3, HANDLE_VALIDATE_CANCEL_APPROVE1, HANDLE_VALIDATE_CANCEL_APPROVE2, HANDLE_VALIDATE_CANCEL_APPROVE3, HANDLE_VALIDATE_CANCEL_REJECT1, HANDLE_VALIDATE_CANCEL_REJECT2, HANDLE_VALIDATE_CANCEL_REJECT3, HANDLE_VALIDATE_REJECT1, HANDLE_VALIDATE_REJECT2, HANDLE_VALIDATE_REJECT3, REQUEST_CREATING, REQUEST_DELETE, REQUEST_EDITING, REQUEST_QUERY, UPDATE_DATA, UPDATE_HISTORY, UPDATE_ORGSSEARCHING_DISTANCE, UPDATE_ORGS_CHILDREN, UPDATE_PYC, UPDATE_SPECIAL_DATA, } from './constants';
import Config from '@config';
import { addNoti } from '~stores/_base/sagas';
import { HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import { _Date, getCurrentDate } from '@utils';
import _ from 'lodash';
import FileSaver from 'file-saver';
import moment from 'moment';

function* saga() {
    // yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, updateDataSaga);
    yield takeLatest(REQUEST_DELETE, deleteDataSaga);
    yield takeLatest(REQUEST_UPDATE_CONTINUE, updateContinueSaga);
    yield takeLatest(FETCH_ORGSSEARCHING_DISTANCE, fectchOrgsSearchingSaga);
    yield takeLatest(HANDLE_ORGSSEARCHING_UPDATE, orgsSearchingUpdateSaga);
    yield takeLatest(HANDLE_ORGSSEARCHING_CONTINUE, orgsSearchingContinueSaga);
    yield takeLatest(HANDLE_VALIDATE_APPROVE1, validateSaga, 1, 1, 1);
    yield takeLatest(HANDLE_VALIDATE_APPROVE2, validateSaga, 1, 1, 2);
    yield takeLatest(HANDLE_VALIDATE_APPROVE3, validateSaga, 1, 1, 3);
    yield takeLatest(HANDLE_VALIDATE_REJECT1, validateSaga, 1, 2, 1);
    yield takeLatest(HANDLE_VALIDATE_REJECT2, validateSaga, 1, 2, 2);
    yield takeLatest(HANDLE_VALIDATE_REJECT3, validateSaga, 1, 2, 3);
    yield takeLatest(HANDLE_VALIDATE_CANCEL_APPROVE1, validateSaga, 2, 1, 1);
    yield takeLatest(HANDLE_VALIDATE_CANCEL_APPROVE2, validateSaga, 2, 1, 2);
    yield takeLatest(HANDLE_VALIDATE_CANCEL_APPROVE3, validateSaga, 2, 1, 3);
    yield takeLatest(HANDLE_VALIDATE_CANCEL_REJECT1, validateSaga, 2, 2, 1);
    yield takeLatest(HANDLE_VALIDATE_CANCEL_REJECT2, validateSaga, 2, 2, 2);
    yield takeLatest(HANDLE_VALIDATE_CANCEL_REJECT3, validateSaga, 2, 2, 3);
    yield takeLatest(HANDLE_SPECIAL_ADD, specialAddSaga);
    yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(FETCH_ORGS_CHILDREN, fetchOrgsChildrenSaga);
    yield takeLatest(GET_EXCEL, getExcelSaga);
    yield takeLatest(GET_HISTORY_EXCEL, getHistoryExcelSaga);
    yield takeLatest(FETCH_PYC, fetchPycSaga);
}

// function* fetchHistorySaga(action?) {
//     const responseData = yield call(getHistory, action);
//     yield put({ type: UPDATE_HISTORY, data: responseData.data });
// }

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.routeManagement.filters, state.auth, action);
    yield put({ type: UPDATE_DATA, data: responseData.data });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}

function* getExcelSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    yield call(getExcel, state.routeManagement.filters, state.auth, action);
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/cashoptimization/route/create', state.routeManagement.creatingPopup, state.auth);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success', `Create success ID ${responseData.data.data.id}`);
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'create', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'specialDeleteCreating', 'isDisabled'], value: true });
}

function* updateDataSaga() {
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/route/update', state.routeManagement.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}

function* updateContinueSaga() {
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/route/continue', state.routeManagement.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'searchVehiclePersPopup', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'organizeRoutePopup', 'isDisabled'], value: true });
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'edit', 'isShown'], value: false });

}

function* fectchOrgsSearchingSaga() {
    const state = yield select();
    const responseData = yield call(requestOrgsSearching, Config.url + '/api/cashoptimization/pyc_orgs_find', state.routeManagement, state.routeManagement.orgsSearchingPopup, state.auth);

    yield put({ type: UPDATE_ORGSSEARCHING_DISTANCE, data: responseData.data });
}

function* orgsSearchingUpdateSaga() {
    const state = yield select();
    const responseData = yield call(requestOrgsSearching, Config.url + '/api/cashoptimization/pyc_orgs_update', state.routeManagement, state.routeManagement.orgsSearchingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}

function* orgsSearchingContinueSaga() {
    const state = yield select();
    const responseData = yield call(requestOrgsSearching, Config.url + '/api/cashoptimization/pyc_orgs_continue', state.routeManagement, state.routeManagement.orgsSearchingPopup, state.auth, 'continue');

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}


function* deleteDataSaga() {
    const state = yield select();
    const responseData = yield call(requestDelete, Config.url + '/api/cashoptimization/pyc_delete', state.routeManagement.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}

function* specialAddSaga() {
    const state = yield select();
    const popupType = { 1: 'creatingPopup', 2: 'editingPopup', }[state.routeManagement.popupType];
    const cashOptimizatioDetailModelList = state.routeManagement[popupType].cashOptimizatioDetailModelList;

    const newItem = {
        type: state.routeManagement[popupType].type,
        currencyType: state.routeManagement[popupType].currencyType,
        goldType: state.routeManagement[popupType].goldType,
        quanlity: state.routeManagement[popupType].quanlity,
        attribute: state.routeManagement[popupType].attribute,
    }
    const filterSameSpecialData = (newItem) => (item) => {
        if (
            item.type == newItem.type.value
            && item.currencyType == newItem.currencyType.value
            && (!item.goldType || (item.goldType && item.goldType == newItem.goldType.value))
            && item.attribute == newItem.attribute.value
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
        if (statusType === 1) {
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
        }
        if (statusType === 2) {
            if (validateType === 1) {
                if (urlType === 1)
                    return '/api/cashoptimization/pyc_cpd_cancel';
                if (urlType === 2)
                    return '/api/cashoptimization/pyc_dvdq_check_cancel';
                if (urlType === 3)
                    return '/api/cashoptimization/pyc_cpd_dvdq_cancel';
            }
            if (validateType === 2) {
                if (urlType === 1)
                    return '/api/cashoptimization/pyc_cpd_cancel_reject';
                if (urlType === 2)
                    return '/api/cashoptimization/pyc_dvdq_check_cancel_reject';
                if (urlType === 3)
                    return '/api/cashoptimization/pyc_cpd_dvdq_cancel_reject';
            }
        }
    })();

    const responseData = yield call(requestApproval, url, state.routeManagement.editingPopup, state.auth, statusType, validateType, urlType);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}

function* fetchHistorySaga(action?) {
    const state = yield select();
    const responseData = yield call(getHistory, state.routeManagement.editingPopup, action);
    yield put({ type: UPDATE_HISTORY, data: responseData.data });
}

function* getHistoryExcelSaga(action?) {
    const state = yield select();
    yield call(getHistoryExcel, state.routeManagement.editingPopup);
}

function* fetchOrgsChildrenSaga(action?) {
    const state = yield select();
    const responseData = yield call(getOrgsChildren, state.auth.user);
    yield put({ type: UPDATE_ORGS_CHILDREN, data: responseData.data, user: state.auth.user });
}


function* fetchPycSaga(action?) {
    const state = yield select();
    const responseData = yield call(getPyc, state.routeManagement.filters, state.auth, action);
    yield put({ type: UPDATE_PYC, data: responseData.data });
}

function getHistory(data, action) {
    const {
        page = 0,
        sort = '',
    } = action ?? {};const url = Config.url + '/api/cashoptimization/pyc_history';
    const postData = {
        data: {
            cash_optimization_id: data.id,
            sort: sort,
            page: page,
            size: Config.numberOfItemsPerPage,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getHistoryExcel(data) {
    const url = Config.url + '/api/cashoptimization/route/exportExcelHistory';
    const postData = {
        data: {
            cash_optimization_id: data.id,
        }
    }
    return axios.post(url, postData, { responseType: 'arraybuffer' })
        .then((response) => {
            var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            FileSaver.saveAs(blob, `Lịch sử số PYC HT ${data.id}.xlsx`);
        });
}

function getOrgsChildren(user) {
    const url = Config.url + '/api/cashoptimization/findChildOrgsByCode';
    const postData = {
        data: {
            orgs_code: user.orgsCode,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getData(filters, auth, action) {
    const {
        page = 0,
        sort = '',
    } = action ?? {};const url = Config.url + '/api/cashoptimization/route/search';
    const data = filters.radio === '1'
        ? {
            orgsCode: filters.orgs?.value,
            routeFromDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateFrom),
            routeToDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateTo),
            routeStatus: filters.status?.value,
        }
        : {
            routeId: ''+filters.id,
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

function getPyc(filters, auth, action) {
    const {
        page = 0,
        sort = '',
    } = action ?? {};const url = Config.url + '/api/cashoptimization/route/searchPyc';
    const postData = {
        data: {
            orgsCode: auth.user.orgsCode,
            sort: sort,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}
function getExcel(filters, auth, action) {
    const {
        page = 0,
        sort = '',
    } = action ?? {};const url = Config.url + '/api/cashoptimization/route/exportExcel';
    const data = filters.radio === '1'
        ? {
            pers_code: auth.user?.code,
            orgs_code: filters.orgs?.value,
            from_date: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateFrom),
            to_date: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateTo),
            orgs_role: filters.orgsRole?.value,
            object_type: filters.objectType?.value,
            status: filters.status?.value,
        }
        : {
            id: filters.id,
            pers_code: '0',
            orgs_code: '0',
            orgs_role: '',
            object_type: '',
            status: '',
        };
    const postData = {
        data: {
            ...data,
            sort: sort,
            page: page,
            size: Config.numberOfItemsPerPage,
        },
    }
    return axios.post(url, postData, { responseType: 'arraybuffer' })
        .then((response) => {
            var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            FileSaver.saveAs(blob, 'Danh sách PYC ĐQ.xlsx');
        });
}

function requestCreating(url: string, data, auth) {
    const postData = {
        data: {
            orgsCode: auth.orgsCode,
            orgsName: auth.orgsName,
            startTime: moment(data.startTime, 'DD/MM/YYYY hh:mm:ss A').format('YYYY-MM-DD HH:mm:ss'),
            routeCashOptimization: data.tableContent2.map(item => ({
                cashOptimizationId: item.id,
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
            orgsCode: auth.orgsCode,
            orgsName: auth.orgsName,
            startTime: moment(data.startTime, 'DD/MM/YYYY hh:mm:ss A').format('YYYY-MM-DD HH:mm:ss'),
            routeCashOptimization: data.tableContent2.map(item => ({
                cashOptimizationId: item.id,
            })),
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestApproval(url: string, data, auth, statusType, validateType, urlType) {
    // const rejectReason = (function () {
    //     if (statusType === 1) {
    //         if (validateType === 2) {
    //             if (urlType === 1)
    //                 return {cpdDvycdqReason:data.rejectReason};
    //             if (urlType === 2)
    //             return {:data.rejectReason};
    //             if (urlType === 3)
    //             return {:data.rejectReason};
    //         }
    //     }
    //     if (statusType === 2) {
    //         if (validateType === 2) {
    //             if (urlType === 1)
    //             return {:data.rejectReason};
    //             if (urlType === 2)
    //             return {:data.rejectReason};
    //             if (urlType === 3)
    //             return {:data.rejectReason};
    //         }
    //     }
    //     return null;
    // })();
    const rejectReason = {
        cpdDvycdqReason: data.rejectReason,
        cpdDvycdqCancelReason: data.rejectReason,
        cashOptimizationOrgsDetailModel: {
            tqDvdqCheckReason: data.rejectReason,
            tqDvdqCheckCancelReason: data.rejectReason,
            cpdDvdqReason: data.rejectReason,
            cpdDvdqCancelReason: data.rejectReason,
        }
    }


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
                type: item.type,
                currencyType: item.currencyType,
                goldType: item.goldType,
                quanlity: item.quanlity,
                attribute: item.attribute,
            })),
            ...rejectReason,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestOrgsSearching(url: string, routeManagement, data, auth, type?) {
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
                type: item.type,
                currencyType: item.currencyType,
                goldType: item.goldType,
                quanlity: item.quanlity,
                attribute: item.attribute,
            })),
            cashOptimizationOrgsDetailModel: {
                atmCdmName: data.atmCdm.text,
                atmCdmCode: data.atmCdm.value,
                nnhnTctdName: data.nhnnTctd.text,
                nnhnTctdCode: data.nhnnTctd.value,
                orgsDestCode: data.orgsDestCode,
                orgsDestName: data.orgsDestName,
                distanceOrgsToOrgsRequest: routeManagement.distanceOrgsToOrgsRequest,
            },
            orgsDestCode: data.orgsDestCode,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function requestDelete(url: string, data, auth) {
    const postData = {
        data: {
            id: data.id,
            cashOptimizationReasonType: data.reasonType.text,
            cashOptimizationReasonDesc: data.reasonType.text == 'KHÁC' ? data.rejectReason : data.reasonType.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}


export default saga;