import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn, takeEvery, delay } from 'redux-saga/effects';
import { SELECT_ROUTE_ROW, DONE_CREATING, FETCH_DATA, FETCH_HISTORY, FETCH_ORGSSEARCHING_DISTANCE, FETCH_ORGS_CHILDREN, FETCH_PYC, GET_EXCEL, GET_HISTORY_EXCEL, REQUEST_UPDATE_CONTINUE, HANDLE_ORGSSEARCHING_CONTINUE, HANDLE_ORGSSEARCHING_UPDATE, HANDLE_REJECT_ACTION, HANDLE_SPECIAL_ADD, HANDLE_VALIDATE_APPROVE1, HANDLE_VALIDATE_APPROVE2, HANDLE_VALIDATE_APPROVE3, HANDLE_VALIDATE_CANCEL_APPROVE1, HANDLE_VALIDATE_CANCEL_APPROVE2, HANDLE_VALIDATE_CANCEL_APPROVE3, HANDLE_VALIDATE_CANCEL_REJECT1, HANDLE_VALIDATE_CANCEL_REJECT2, HANDLE_VALIDATE_CANCEL_REJECT3, HANDLE_VALIDATE_REJECT1, HANDLE_VALIDATE_REJECT2, HANDLE_VALIDATE_REJECT3, REQUEST_CREATING, REQUEST_DELETE, REQUEST_EDITING, REQUEST_QUERY, UPDATE_DATA, UPDATE_HISTORY, UPDATE_ORGSSEARCHING_DISTANCE, UPDATE_ORGS_CHILDREN, UPDATE_PYC, UPDATE_SPECIAL_DATA, REQUEST_VEHICLE, REQUEST_PERS, UPDATE_VEHICLE_DATA, UPDATE_PERS_DATA, REQUEST_SEACHVEHICLEPERS_CONTINUE, REQUEST_SEACHVEHICLEPERS_UPDATE, REQUEST_SEACHVEHICLEPERS_BACK, REQUEST_ORGANIZING, REQUEST_ORGANIZING_CHECK_STOP_POINT, REQUEST_ORGANIZING_SEARCH_DESTINATION, REQUEST_ORGANIZING_SEARCH_DESTINATION_SELECT, REQUEST_ORGANIZING_ADD_HDB, REQUEST_ORGANIZING_INSERT, REQUEST_ORGANIZING_CHECK_BALANCE_HDB, REQUEST_ORGANIZING_UPDATE_ORDER, REQUEST_ORGANIZING_GET_KC, UPDATE_ORGANIZING, UPDATE_ORGANIZING_STOP_POINT, REQUEST_ORGANIZING_UPDATE, REQUEST_ORGANIZING_CONTINUE, REQUEST_ORGANIZING_BACK, REQUEST_ORGANIZING_URGENT_UPDATE, UPDATE_ORGANIZING_INSERT, SELECT_DESTINATION_POINT, HANDLE_SPECIAL_DELETE, UPDATE_ORGANIZING_DISTANCE, FETCH_MAP, UPDATE_MAP, FETCH_BALANCE_SPECIAL, UPDATE_BALANCE_SPECIAL, REQUEST_CREATING_PYC_BS, REQUEST_ORGANIZE_URGENT_CHECKBYID, UPDATE_ORGANIZE_URGENT_CHECKBYID, FETCH_BALANCE_SPECIAL_TOTAL, UPDATE_BALANCE_SPECIAL_TOTAL, REQUEST_ORGANIZE_GET_HDB_DETAIL, UPDATE_ORGANIZE_GET_HDB_DETAIL, CHECK_VEHICLE, CHECK_PERS, SELECT_DUALTABLE_CONTENT_ROW, } from './constants';

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
    yield takeLatest(HANDLE_SPECIAL_ADD, specialAddSaga);
    yield takeLatest(HANDLE_SPECIAL_DELETE, specialDeleteSaga);
    yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(FETCH_ORGS_CHILDREN, fetchOrgsChildrenSaga);
    yield takeLatest(GET_EXCEL, getExcelSaga);
    yield takeLatest(GET_HISTORY_EXCEL, getHistoryExcelSaga);
    yield takeLatest(FETCH_PYC, fetchPycSaga);
    yield takeLatest(REQUEST_VEHICLE, fetchVehicleSaga);
    yield takeLatest(REQUEST_PERS, fetchPersSaga);
    yield takeLatest(REQUEST_SEACHVEHICLEPERS_UPDATE, searchVehiclePersUpdateSaga);
    yield takeLatest(REQUEST_SEACHVEHICLEPERS_CONTINUE, searchVehiclePersContinueSaga);
    yield takeLatest(REQUEST_SEACHVEHICLEPERS_BACK, searchVehiclePersBackSaga);
    yield takeLatest(REQUEST_ORGANIZING, requestOrganizingSaga);
    yield takeLatest(REQUEST_ORGANIZING_CHECK_STOP_POINT, requestOrganizingCheckStopPointSaga);
    yield takeLatest(REQUEST_ORGANIZING_SEARCH_DESTINATION, requestOrganizingSearchDestinationSaga);
    yield takeLatest(REQUEST_ORGANIZING_SEARCH_DESTINATION_SELECT, requestOrganizingSearchDestinationSelectSaga);
    yield takeLatest(REQUEST_ORGANIZING_INSERT, requestOrganizingInsertSaga);
    yield takeLatest(REQUEST_ORGANIZING_CHECK_BALANCE_HDB, requestOrganizingCheckBalanceHdbSaga);
    yield takeLatest(REQUEST_ORGANIZING_UPDATE_ORDER, requestOrganizingUpdateOrderSaga);
    yield takeLatest(REQUEST_ORGANIZING_GET_KC, requestOrganizingGetKcSaga);

    yield takeLatest(REQUEST_ORGANIZING_UPDATE, requestOrganizingUpdateSaga);
    yield takeLatest(REQUEST_ORGANIZING_CONTINUE, requestOrganizingContinueSaga);
    yield takeLatest(REQUEST_ORGANIZING_BACK, requestOrganizingBackSaga);
    yield takeLatest(REQUEST_ORGANIZING_URGENT_UPDATE, requestOrganizingUrgentUpdateSaga);
    yield takeLatest(REQUEST_CREATING_PYC_BS, createPYCBSDataSaga);

    yield takeLatest(FETCH_MAP, fetchMapSaga);
    yield takeLatest(FETCH_BALANCE_SPECIAL, fetchBalanceSpecialSaga);
    yield takeLatest(FETCH_BALANCE_SPECIAL_TOTAL, fetchBalanceSpecialTotalSaga);

    yield takeLatest(REQUEST_ORGANIZE_URGENT_CHECKBYID, requestOrganizeUrgentCheckByIdSaga);

    yield takeLatest(CHECK_VEHICLE, checkVehicleSaga);
    yield takeLatest(CHECK_PERS, checkPersSaga);

    yield takeLatest(REQUEST_ORGANIZE_GET_HDB_DETAIL, requestOrganizeGetHdbDetailSaga);
}


// function* fetchHistorySaga(action?) {
//     const responseData = yield call(getHistory, action);
//     yield put({ type: UPDATE_HISTORY, data: responseData.data });
// }

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.routeManagement.filters, state.auth, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_DATA, data: responseData.data, sort: action?.sort, page: action?.page });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'searchVehiclePersPopup', 'isDisabled'], value: true });
}
function* requestOrganizeUrgentCheckByIdSaga(action?) {
    const state = yield select();
    const responseData = yield call(requestOrganizeUrgentCheckById, state.routeManagement.selectedItem, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_ORGANIZE_URGENT_CHECKBYID, data: responseData.data, page: action?.page });
}
function* requestOrganizeGetHdbDetailSaga(action?) {
    const state = yield select();
    const responseData = yield call(requestOrganizeGetHdbDetail, state.routeManagement.selectedItem, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_ORGANIZE_GET_HDB_DETAIL, data: responseData.data, page: action?.page });
}
function* checkVehicleSaga(action?) {
    if (action.data?.categoryPers?.persStatus === 'AVAILABLE')
        return;
    const responseData = yield call(checkVehicle, action.data);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        yield spawn(addNoti, 'warning', responseData?.data?.message);
    }
    yield put({ ...action, type: SELECT_DUALTABLE_CONTENT_ROW });
}
function checkVehicle(data) {
    const url = process.env.PATH + '/api/cashoptimization/route/checkVehicle';

    const postData = {
        data: {
            vehicleCode: data.vehicleCode,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}
function* checkPersSaga(action?) {
    const responseData = yield call(checkPers, action.data);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        yield spawn(addNoti, 'warning', responseData?.data?.message);
    }
    yield put({ ...action, type: SELECT_DUALTABLE_CONTENT_ROW });
}
function checkPers(data) {
    const url = process.env.PATH + '/api/cashoptimization/route/checkPers';

    const postData = {
        data: {
            persCode: data.persCode,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function requestOrganizeGetHdbDetail(data, action) {
    const url = process.env.PATH + '/api/cashoptimization/route/route_organize_get_hdb_detail';

    const postData = {
        data: {
            routeId: data.id,
            routeDetailOganizeTempId: action?.data?.id,
            stopPointType: action?.data?.stopPointType,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}


function* fetchVehicleSaga(action?) {
    const state = yield select();
    const responseData = yield call(getVehicleData, state.routeManagement.vehiclePopup, state.routeManagement.selectedItem, action);
    yield put({ type: UPDATE_VEHICLE_DATA, data: responseData.data, sort: action?.sort, page: action?.page });
}

function* fetchPersSaga(action?) {
    const state = yield select();
    const responseData = yield call(getPersData, state.routeManagement.persPopup, state.routeManagement.selectedItem, action);
    yield put({ type: UPDATE_PERS_DATA, data: responseData.data, sort: action?.sort, page: action?.page });
}

function* getExcelSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    yield call(getExcel, state.routeManagement.filters, state.auth, action);
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, process.env.PATH + '/api/cashoptimization/route/create', state.routeManagement.creatingPopup, state.auth);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success', `Tạo thành công ID ${responseData?.data?.data.id}`);
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'create', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'specialDeleteCreating', 'isDisabled'], value: true });
}

function* createPYCBSDataSaga() {
    const state = yield select();
    const responseData = yield call(requestEditing, process.env.PATH + '/api/cashoptimization/route/dkPycBs', state.routeManagement.editingPopup, state.auth);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success', `Tạo thành công ID ${responseData?.data?.data.id}`);
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'create', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'specialDeleteCreating', 'isDisabled'], value: true });
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'create', 'isShown'], value: false });
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'organizingPopup', 'isShown'], value: true });
}

function* updateDataSaga() {
    const state = yield select();
    const responseData = yield call(requestEditing, process.env.PATH + '/api/cashoptimization/route/update', state.routeManagement.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
    yield put({ type: REQUEST_QUERY });
}

function* updateContinueSaga(action?) {
    const state = yield select();
    const responseData = yield call(requestEditing, process.env.PATH + '/api/cashoptimization/route/continue', state.routeManagement.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'searchVehiclePersPopup', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'organizingPopup', 'isDisabled'], value: true });
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'edit', 'isShown'], value: false });
    if (action.popupType === 'normal')
        yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'searchVehiclePersPopup', 'isShown'], value: true });
    if (action.popupType === 'urgent')
        yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'organizingPopup', 'isShown'], value: true });
    yield put({ type: REQUEST_QUERY });
}

function* fectchOrgsSearchingSaga() {
    const state = yield select();
    const responseData = yield call(requestOrgsSearching, process.env.PATH + '/api/cashoptimization/pyc_orgs_find', state.routeManagement, state.routeManagement.orgsSearchingPopup, state.auth);

    yield put({ type: UPDATE_ORGSSEARCHING_DISTANCE, data: responseData.data });
}

function* orgsSearchingUpdateSaga() {
    const state = yield select();
    const responseData = yield call(requestOrgsSearching, process.env.PATH + '/api/cashoptimization/pyc_orgs_update', state.routeManagement, state.routeManagement.orgsSearchingPopup, state.auth);

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
    const responseData = yield call(requestOrgsSearching, process.env.PATH + '/api/cashoptimization/pyc_orgs_continue', state.routeManagement, state.routeManagement.orgsSearchingPopup, state.auth, 'continue');

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
    const responseData = yield call(requestDelete, process.env.PATH + '/api/cashoptimization/route/delete', state.routeManagement.editingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'continue', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'delete', 'isShown'], value: false });
    yield fetchDataSaga();
}

function* specialAddSaga() {
    const state = yield select();
    const routeDetailHdbTemp2 = state.routeManagement.organizingPopup?.routeDetailHdbTemp2;
    const organizingPopup = state.routeManagement.organizingPopup;
    const newItem = {
        type: state.routeManagement.organizingPopup?.type,
        currencyType: state.routeManagement.organizingPopup?.currencyType,
        goldType: state.routeManagement.organizingPopup?.goldType,
        quanlity: +state.routeManagement.organizingPopup?.quanlity?.toString().replaceAll(',', ''),
        attribute: state.routeManagement.organizingPopup?.attribute,
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
    if (_.isEmpty(routeDetailHdbTemp2?.filter(filterSameSpecialData(newItem)))) {
        const data = [
            ...routeDetailHdbTemp2,
            {
                key: routeDetailHdbTemp2.length ? routeDetailHdbTemp2[routeDetailHdbTemp2.length - 1]['key'] + 1 : 1,
                type: organizingPopup?.type?.value,
                currencyType: organizingPopup?.currencyType?.value,
                goldType: organizingPopup?.goldType?.value,
                quanlity: +organizingPopup?.quanlity?.toString().replaceAll(',', ''),
                attribute: organizingPopup?.attribute?.value,
            },
        ];
        const responseData = yield call(requestOrganizingAddHdb, organizingPopup, data);
        if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
            return yield spawn(addNoti, 'error', responseData?.data?.message);
        }
        yield put({ type: UPDATE_SPECIAL_DATA, data });
        return yield put({ type: REQUEST_ORGANIZING });
    }
    return yield spawn(addNoti, 'error', 'Yêu cầu điều quỹ đã tồn tại');
}
function* specialDeleteSaga() {
    const state = yield select();
    const organizingPopup = state.routeManagement.organizingPopup;
    const routeDetailHdbTemp2 = organizingPopup.routeDetailHdbTemp2;

    const data = routeDetailHdbTemp2.filter(item => !item['isSelected']);
    const responseData = yield call(requestOrganizingAddHdb, organizingPopup, data);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_SPECIAL_DATA, data });
    yield put({ type: REQUEST_ORGANIZING });
}
function requestOrganizingAddHdb(data, routeDetailHdbTemp) {
    const url = process.env.PATH + '/api/cashoptimization/route/organize_add_hdb';
    const postData = {
        data: {
            routeId: data.id,
            stopPointType: data.stopPointType?.value,
            routeDetailHdbModel: routeDetailHdbTemp,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}
function* fetchHistorySaga(action?) {
    const state = yield select();
    const responseData = yield call(getHistory, state.routeManagement.editingPopup, action);
    yield put({ type: UPDATE_HISTORY, data: responseData.data, page: action?.page });
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
    yield put({ type: UPDATE_PYC, data: responseData.data, page: action?.page });
}


function* searchVehiclePersUpdateSaga() {
    const state = yield select();
    const responseData = yield call(requestSearchVehiclePersUpdate, process.env.PATH + '/api/cashoptimization/route/findVehicleAndPersForRouteUpdate', state.routeManagement.searchVehiclePersPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'searchVehiclePersPopup', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'searchVehiclePersPopup', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}
function* searchVehiclePersContinueSaga() {
    const state = yield select();
    const responseData = yield call(requestSearchVehiclePersUpdate, process.env.PATH + '/api/cashoptimization/route/findVehicleAndPersForRouteContinue', state.routeManagement.searchVehiclePersPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'searchVehiclePersPopup', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'searchVehiclePersPopup', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}
function* searchVehiclePersBackSaga() {
    const state = yield select();
    const responseData = yield call(requestSearchVehiclePersUpdate, process.env.PATH + '/api/cashoptimization/route/findVehicleAndPersForRouteBack', state.routeManagement.searchVehiclePersPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'searchVehiclePersPopup', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'searchVehiclePersPopup', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}


function* requestOrganizingSaga(action?) {
    // yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestOrganizing, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_ORGANIZING, data: responseData.data });
    yield put({ type: REQUEST_ORGANIZING_SEARCH_DESTINATION });

}
function requestOrganizing(data, action) {
    const url = process.env.PATH + '/api/cashoptimization/route/oganize_find_by_id';
    const postData = {
        data: {
            routeId: data.id,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function* requestOrganizingCheckStopPointSaga(action?) {
    const state = yield select();
    if (!state.routeManagement.organizingPopup?.stopPointType?.value)
        return;
    const responseData = yield call(requestOrganizingCheckStopPoint, state.routeManagement.organizingPopup, action);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_ORGANIZING_STOP_POINT, data: responseData.data });
    // yield put({ type: REQUEST_ORGANIZING });
}
function requestOrganizingCheckStopPoint(data, action) {
    const url = process.env.PATH + '/api/cashoptimization/route/route_organize_check_stop_point';
    const postData = {
        data: {
            routeId: data.id,
            stopPointType: data.stopPointType?.value,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function* requestOrganizingSearchDestinationSaga(action?) {
    const state = yield select();
    const responseData = yield call(requestOrganizingSearchDestination, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_ORGANIZING, data: responseData.data, page: action?.page });
}
function requestOrganizingSearchDestination(data, action) {
    const url = process.env.PATH + '/api/cashoptimization/route/oganize_search_destination';
    const postData = {
        data: {
            routeId: data.id,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function* requestOrganizingSearchDestinationSelectSaga(action?) {
    const state = yield select();
    const responseData = yield call(requestOrganizingSearchDestinationSelect, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: SELECT_DESTINATION_POINT });
}
function requestOrganizingSearchDestinationSelect(data, action) {
    const url = process.env.PATH + '/api/cashoptimization/route/oganize_search_destination_select';

    const selectedData = (() => {
        if (data.selectedItem.tableType === 1) {
            return {
                routeDetailVehicle: [
                    { vehicleCode: data.selectedItem.selectedData.vehicleCode },
                ],
            }
        }
        if (data.selectedItem.tableType === 2) {
            return {
                routeDetailPers: [
                    { persCode: data.selectedItem.selectedData.persCode },
                ],
            }
        }
        if (data.selectedItem.tableType === 3) {
            return {
                routeCashOptimization: [
                    { cashOptimizationId: data.selectedItem.selectedData.cashOptimizationId },
                ],
            }
        }
        if (data.selectedItem.tableType === 4) {
            return { orgsCode: data.selectedItem.selectedData.orgsCode }
        }
    })();
    const postData = {
        data: {
            id: data.id,
            ...selectedData,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}


function* requestOrganizingCheckBalanceHdbSaga(action?) {
    const state = yield select();
    const responseData = yield call(requestOrganizingCheckBalanceHdb, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_DATA, data: responseData.data, sort: action?.sort, page: action?.page });
}
function requestOrganizingCheckBalanceHdb(data, action) {
    const url = process.env.PATH + '/api/cashoptimization/route/organize_check_balance_hdb';
    const postData = {
        data: {
            routeId: data.id,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}


function* requestOrganizingInsertSaga(action?) {
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'routeDetailOganizeInsert', 'isLoading'], value: true });
    const state = yield select();
    const organizingPopup = state.routeManagement.organizingPopup;
    const routeDetailOganizeItem = {
        order: organizingPopup?.routeDetailOganizeTemp?.length + 1 || 1,
        routeStatus: organizingPopup.routeStatus,
        stopPointType: organizingPopup.stopPointType?.text ?? organizingPopup.stopPointType,
        departurePointName: organizingPopup.departurePointName,
        departurePointAddress: organizingPopup.departurePointAddress,
        destinationPointName: organizingPopup.destinationPointName,
        destinationPointAddress: organizingPopup.destinationPointAddress,
        kcDepartureToDestination: organizingPopup.kcDepartureToDestination,
        model: organizingPopup.routeCashOptimization[0]?.cashOptimization.model,
        cashOptimizationId: organizingPopup.cashOptimizationId,
        ...organizingPopup.selectedAttr,
    };
    const responseData = yield call(requestOrganizingInsert, state.routeManagement.organizingPopup, routeDetailOganizeItem);
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'routeDetailOganizeInsert', 'isLoading'], value: false });
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: REQUEST_ORGANIZING });
    // const data = [
    //     ...organizingPopup?.routeDetailOganize ?? [],
    //     {
    //         ...routeDetailOganizeItem,
    //         id: responseData?.data?.data?.id,
    //     },
    // ];
    // yield put({ type: UPDATE_ORGANIZING_INSERT, data });
}
function requestOrganizingInsert(data, routeDetailOganizeItem) {
    const url = process.env.PATH + '/api/cashoptimization/route/organize_insert';
    const postData = {
        data: {
            routeId: data.id,
            ...routeDetailOganizeItem
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function* requestOrganizingUpdateOrderSaga(action) {
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'routeDetailOganizeInsert', 'isLoading'], value: true });
    const state = yield select();
    const organizingPopup = state.routeManagement.organizingPopup;
    const data = (() => {
        if (action.buttonType === 'DELETE') {
            return organizingPopup?.routeDetailOganizeTemp?.filter(item => !item['isSelected']);
        }
        if (action.buttonType === 'UP') {
            const order = organizingPopup?.selectedRouteDetailOganize?.order - 1;
            if (order > 0) {
                const t = organizingPopup.routeDetailOganizeTemp[order];
                organizingPopup.routeDetailOganizeTemp[order] = organizingPopup.routeDetailOganizeTemp[order - 1];
                organizingPopup.routeDetailOganizeTemp[order - 1] = t;
            }
            return organizingPopup.routeDetailOganizeTemp;
        }
        if (action.buttonType === 'DOWN') {
            const order = organizingPopup?.selectedRouteDetailOganize?.order - 1;
            if (order + 1 < organizingPopup?.routeDetailOganizeTemp?.length) {
                const t = organizingPopup.routeDetailOganizeTemp[order];
                organizingPopup.routeDetailOganizeTemp[order] = organizingPopup.routeDetailOganizeTemp[order + 1];
                organizingPopup.routeDetailOganizeTemp[order + 1] = t;
            }

            return organizingPopup.routeDetailOganizeTemp;
        }
    })()?.map((item, index) => ({ ...item, order: index + 1 }));

    const responseData = yield call(requestOrganizingUpdateOrder, state.routeManagement.organizingPopup, data, action.buttonType);
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'routeDetailOganizeInsert', 'isLoading'], value: false });

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    // yield put({ type: UPDATE_ORGANIZING_INSERT, organizingPopup, data, buttonType:action.buttonType });
    yield put({ type: REQUEST_ORGANIZING, data });
}
function requestOrganizingUpdateOrder(data, routeDetailOganize, buttonType) {
    const url = process.env.PATH + '/api/cashoptimization/route/organize_update_order';
    const selectedRouteDetailOganizeTemp = data?.routeDetailOganizeTemp?.filter(item => item['isSelected'])[0];
    const postData = {
        data: {
            routeId: data.id,
            action: buttonType,
            routeDetailOganizeTemp: routeDetailOganize,
            cashOptimizationId: buttonType === 'DELETE' ? selectedRouteDetailOganizeTemp.cashOptimizationId : undefined,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}


function* requestOrganizingGetKcSaga(action?) {
    const state = yield select();
    const responseData = yield call(requestOrganizingGetKc, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: UPDATE_ORGANIZING_DISTANCE, data: responseData.data });
}
function requestOrganizingGetKc(data, action) {
    const url = process.env.PATH + '/api/cashoptimization/route/organize_get_kc';
    const postData = {
        data: {
            departureAddress: data.departurePointAddress,
            destinationAddress: data.destinationPointAddress,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function* requestOrganizingUpdateSaga() {
    const state = yield select();
    const responseData = yield call(requestOrganizingUpdate, process.env.PATH + '/api/cashoptimization/route/organize_update', state.routeManagement.organizingPopup, state.auth);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'organizingPopup', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}


function* requestOrganizingContinueSaga() {
    const state = yield select();
    const responseData = yield call(requestOrganizingUpdate, process.env.PATH + '/api/cashoptimization/route/organize_continue', state.routeManagement.organizingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'organizingPopup', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}


function* requestOrganizingBackSaga(action?) {
    const state = yield select();
    const responseData = yield call(requestOrganizingUpdate, process.env.PATH + '/api/cashoptimization/route/organize_back', state.routeManagement.organizingPopup, state.auth, action);

    if (action?.noti) return;
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'organizingPopup', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}


function* requestOrganizingUrgentUpdateSaga() {
    const state = yield select();
    const responseData = yield call(requestOrganizingUpdate, process.env.PATH + '/api/cashoptimization/route/organize_urgent_update', state.routeManagement.organizingPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'organizingPopup', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}

function requestOrganizingUpdate(url: string, data, auth, action?) {
    const postData = {
        data: {
            routeId: data.id,
            action: action?.confirm,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}


function getHistory(data, action) {
    const {
        page = 0,
        sort = data.sort ?? '',
    } = action ?? {}; const url = process.env.PATH + '/api/cashoptimization/route/history';
    const postData = {
        data: {
            routeId: data.id,
            sort: sort,
            page: page,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getHistoryExcel(data) {
    const url = process.env.PATH + '/api/cashoptimization/route/exportExcelHistory';
    const postData = {
        data: {
            routeId: data.id,
        }
    }
    return axios.post(url, postData, { responseType: 'arraybuffer' })
        .then((response) => {
            var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            FileSaver.saveAs(blob, `Lịch sử Lộ trình số ${data.id}.xlsx`);
        });
}

function getOrgsChildren(user) {
    const url = process.env.PATH + '/api/cashoptimization/findChildOrgsByCode';
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
        sort = filters.sort ?? '',
    } = action ?? {}; const url = process.env.PATH + '/api/cashoptimization/route/search';
    const data = filters.radio === '1'
        ? {
            orgsCode: filters.orgs?.value,
            routeFromDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateFrom) + ' 00:00:00',
            routeToDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateTo) + ' 23:59:59.00',
            routeStatus: filters.status?.value,
        }
        : {
            routeId: '' + filters.id,
        };
    const postData = {
        data: {
            ...data,
            sort: sort,
            page: page,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function requestOrganizeUrgentCheckById(data, action) {
    const url = process.env.PATH + '/api/cashoptimization/route/organize_urgent_checkById';

    const postData = {
        data: {
            routeId: '' + data.id,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function
    getVehicleData(filters, selectedItem, action) {
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {}; const url = process.env.PATH + '/api/cashoptimization/route/searchVehicle';

    const postData = {
        data: {
            routeId: selectedItem.id,
            searchType: filters.searchType?.value,
            searchValue: filters.searchValue,
            sort: sort,
            page: page,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getPersData(filters, selectedItem, action) {
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {}; const url = process.env.PATH + '/api/cashoptimization/route/searchPers';

    const postData = {
        data: {
            routeId: selectedItem.id,
            searchType: filters.searchType?.value,
            searchValue: filters.searchValue,
            sort: sort,
            page: page,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getPyc(filters, auth, action) {
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {}; const url = process.env.PATH + '/api/cashoptimization/route/searchPyc';
    const postData = {
        data: {
            orgsCode: auth.user.orgsCode,
            page: page,
            sort: sort,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}
function getExcel(filters, auth, action) {
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {};
    const url = process.env.PATH + '/api/cashoptimization/route/exportExcel';
    const data = filters.radio === '1'
        ? {
            orgsCode: filters.orgs?.value,
            routeFromDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateFrom) + ' 00:00:00',
            routeToDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateTo) + ' 23:59:59.00',
            routeStatus: filters.status?.value,
        }
        : {
            routeId: '' + filters.id,
        };
    const postData = {
        data: {
            ...data,
            sort: sort,
            page: page,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        },
    }
    return axios.post(url, postData, { responseType: 'arraybuffer' })
        .then((response) => {
            var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            FileSaver.saveAs(blob, 'Danh sách Lộ trình.xlsx');
        });
}

function requestCreating(url: string, data, auth) {
    const postData = {
        data: {
            orgsCode: auth.orgsCode,
            orgsName: auth.orgsName,
            startTime: moment(data.startTime, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
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
            startTime: moment(data.startTime, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            routeCashOptimization: data.tableContent2.map(item => ({
                cashOptimizationId: item.id,
            })),
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}


function requestSearchVehiclePersUpdate(url: string, data, auth) {
    const postData = {
        data: {
            id: data.id,
            transportType: data.transportType?.value,
            routeDetailPers: data.pers?.map(item => ({
                persCode: item.persCode,
                persName: item.persFullname,
            })) ?? [],
        },
    }

    if (data.transportType?.value === 'XE CHUYÊN DÙNG')
        postData.data['routeDetailVehicle'] = data.vehicles?.map(item => ({
            vehicleCode: item.vehicleCode,
        })) ?? [];
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
            routeId: data.id,
            routeReasonType: data.reasonType?.text,
            routeReasonDesc: data.reasonType?.text == 'KHÁC' ? data.rejectReason : data.reasonType?.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}


function* fetchMapSaga(action?) {
    const state = yield select();
    const responseData = yield call(getMap, state.routeManagement.organizingPopup);
    yield put({ type: UPDATE_MAP, data: responseData.data });
}

function getMap(data) {
    const url = process.env.PATH + '/api/cashoptimization/route/getRouteMap?routeId=' + data.id;

    return axios.get(url)
        .catch(error => console.log(error));
}
function* fetchBalanceSpecialSaga(action?) {
    const state = yield select();
    const responseData = yield call(getBalanceSpecial, state.routeManagement.organizingPopup, action.routeDetailOganizeId);
    yield put({ type: UPDATE_BALANCE_SPECIAL, data: responseData.data });
}
function* fetchBalanceSpecialTotalSaga(action?) {
    const state = yield select();
    const responseData = yield call(getBalanceSpecialTotal, state.routeManagement.organizingPopup);
    yield put({ type: UPDATE_BALANCE_SPECIAL_TOTAL, data: responseData.data });
}

function getBalanceSpecial(data, routeDetailOganizeId) {
    const url = process.env.PATH + '/api/cashoptimization/route/organize_check_balance_hdb';
    const routeDetailOganize = data.routeDetailOganizeTemp;
    const postData = {
        data: {
            routeId: data.id,
            routeDetailOganizeId: routeDetailOganizeId || routeDetailOganize[routeDetailOganize.length - 1]?.id,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getBalanceSpecialTotal(data) {
    const url = process.env.PATH + '/api/cashoptimization/route/organize_check_hdb_v1';
    const postData = {
        data: {
            routeId: data.id,
            cashOptimizeId: data.cashOptimizationId || 0,
            stopPointType: data.stopPointType?.value,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

export default saga;