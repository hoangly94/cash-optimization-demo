import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn, takeEvery, delay } from 'redux-saga/effects';
import { DONE_CREATING, FETCH_DATA, FETCH_HISTORY, FETCH_ORGSSEARCHING_DISTANCE, FETCH_ORGS_CHILDREN, GET_PYC_EXCEL, GET_PYC_HISTORY_EXCEL, HANDLE_CONTINUE_ACTION, HANDLE_ORGSSEARCHING_CONTINUE, HANDLE_ORGSSEARCHING_UPDATE, HANDLE_REJECT_ACTION, HANDLE_SPECIAL_ADD, HANDLE_VALIDATE_APPROVE1, HANDLE_VALIDATE_APPROVE2, HANDLE_VALIDATE_APPROVE3, HANDLE_VALIDATE_CANCEL_APPROVE1, HANDLE_VALIDATE_CANCEL_APPROVE2, HANDLE_VALIDATE_CANCEL_APPROVE3, HANDLE_VALIDATE_CANCEL_REJECT1, HANDLE_VALIDATE_CANCEL_REJECT2, HANDLE_VALIDATE_CANCEL_REJECT3, HANDLE_VALIDATE_REJECT1, HANDLE_VALIDATE_REJECT2, HANDLE_VALIDATE_REJECT3, REQUEST_CREATING, REQUEST_DELETE, REQUEST_EDITING, REQUEST_QUERY, UPDATE_DATA, UPDATE_HISTORY, UPDATE_ORGSSEARCHING_DISTANCE, UPDATE_ORGS_CHILDREN, UPDATE_SPECIAL_DATA, } from './constants';
import Config from '@config';
import { addNoti } from '~stores/_base/sagas';
import { HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import { _Date, getCurrentDate } from '@utils';
import _ from 'lodash';
import FileSaver from 'file-saver';

function* saga() {
    // yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, updateDataSaga);
    yield takeLatest(REQUEST_DELETE, deleteDataSaga);
    yield takeLatest(HANDLE_CONTINUE_ACTION, continueSaga);
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
    yield takeLatest(GET_PYC_EXCEL, getPycExcelSaga);
    yield takeLatest(GET_PYC_HISTORY_EXCEL, getPycHistoryExcelSaga);
}



// function* fetchHistorySaga(action?) {
//     const responseData = yield call(getHistory, action);
//     yield put({ type: UPDATE_HISTORY, data: responseData.data });
// }

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.pycRegistration.filters, state.auth, action);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    if (!responseData.data?.data) {
        yield spawn(addNoti, 'error', 'Không tìm thấy kết quả');
    }

    yield put({ type: UPDATE_DATA, data: responseData.data, page:action?.page });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'delete', 'isDisabled'], value: true });
}

function* getPycExcelSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    yield call(getPycExcel, state.pycRegistration.filters, state.auth, action);
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/cashoptimization/pyc_add', state.pycRegistration.creatingPopup, state.auth);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success', `Tạo thành công ID ${responseData?.data?.data.id}`);
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
    yield put({ type: HANDLE_BUTTON, keys: ['pycRegistration', 'orgsSearching', 'isDisabled'], value: false });
    yield put({ type: HANDLE_POPUP, keys: ['pycRegistration', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_POPUP, keys: ['pycRegistration', 'orgsSearching', 'isShown'], value: true });

}

function* fectchOrgsSearchingSaga() {
    const state = yield select();
    const responseData = yield call(requestOrgsSearching, Config.url + '/api/cashoptimization/pyc_orgs_find', state.pycRegistration, state.pycRegistration.orgsSearchingPopup, state.auth);

    yield put({ type: UPDATE_ORGSSEARCHING_DISTANCE, data: responseData.data });
}

function* orgsSearchingUpdateSaga() {
    const state = yield select();
    const responseData = yield call(requestOrgsSearching, Config.url + '/api/cashoptimization/pyc_orgs_update', state.pycRegistration, state.pycRegistration.orgsSearchingPopup, state.auth);

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
    const responseData = yield call(requestOrgsSearching, Config.url + '/api/cashoptimization/pyc_orgs_continue', state.pycRegistration, state.pycRegistration.orgsSearchingPopup, state.auth, 'continue');

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
        quanlity: state.pycRegistration[popupType].quanlity?.toString().replaceAll(',', ''),
        attribute: state.pycRegistration[popupType].attribute,
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

    const responseData = yield call(requestApproval, url, state.pycRegistration.editingPopup, state.auth, statusType, validateType, urlType);

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

function* fetchHistorySaga(action?) {
    const state = yield select();
    const responseData = yield call(getHistory, state.pycRegistration.editingPopup, action);
    yield put({ type: UPDATE_HISTORY, data: responseData.data });
}

function* getPycHistoryExcelSaga(action?) {
    const state = yield select();
    yield call(getPycHistoryExcel, state.pycRegistration.editingPopup);
}

function* fetchOrgsChildrenSaga(action?) {
    const state = yield select();
    const responseData = yield call(getOrgsChildren, state.auth.user);
    yield put({ type: UPDATE_ORGS_CHILDREN, data: responseData.data, user: state.auth.user });
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

function getPycHistoryExcel(data) {
    const url = Config.url + '/api/cashoptimization/pyc_history_excel';
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
    } = action ?? {};const url = Config.url + '/api/cashoptimization/pycsearch';
    const data = filters.radio === '1'
        ? {
            pers_code: auth.user?.code,
            orgs_code: filters.orgs?.value,
            from_date: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateFrom)+' 00:00:00',
            to_date: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateTo)+' 23:59:59.00',
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
            status: ''
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

function getPycExcel(filters, auth, action) {
    const {
        page = 0,
        sort = '',
    } = action ?? {};const url = Config.url + '/api/cashoptimization/pyc_excel';
    const data = filters.radio === '1'
        ? {
            pers_code: auth.user?.code,
            orgs_code: filters.orgs?.value,
            from_date: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateFrom)+' 00:00:00',
            to_date: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateTo)+' 23:59:59.00',
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
            status: ''
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
                quanlity: item.quanlity?.toString().replaceAll(',', ''),
                attribute: item.attribute,
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
                quanlity: item.quanlity?.toString().replaceAll(',', ''),
                attribute: item.attribute,
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
                quanlity: item.quanlity?.toString().replaceAll(',', ''),
                attribute: item.attribute,
            })),
            ...rejectReason,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestOrgsSearching(url: string, pycRegistration, data, auth, type?) {
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
                quanlity: item.quanlity?.toString().replaceAll(',', ''),
                attribute: item.attribute,
            })),
            cashOptimizationOrgsDetailModel: {
                atmCdmName: data.atmCdm.text,
                atmCdmCode: data.atmCdm.value,
                nnhnTctdName: data.nhnnTctd.text,
                nnhnTctdCode: data.nhnnTctd.value,
                orgsDestCode: data.orgsDestCode,
                orgsDestName: data.orgsDestName,
                distanceOrgsToOrgsRequest: pycRegistration.distanceOrgsToOrgsRequest,
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