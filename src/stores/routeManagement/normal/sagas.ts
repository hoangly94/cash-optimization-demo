import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn, takeEvery, delay } from 'redux-saga/effects';
import { DONE_CREATING, FETCH_DATA, FETCH_HISTORY, FETCH_ORGSSEARCHING_DISTANCE, FETCH_ORGS_CHILDREN, FETCH_PYC, GET_EXCEL, GET_HISTORY_EXCEL, REQUEST_UPDATE_CONTINUE, HANDLE_ORGSSEARCHING_CONTINUE, HANDLE_ORGSSEARCHING_UPDATE, HANDLE_REJECT_ACTION, HANDLE_SPECIAL_ADD, HANDLE_VALIDATE_APPROVE1, HANDLE_VALIDATE_APPROVE2, HANDLE_VALIDATE_APPROVE3, HANDLE_VALIDATE_CANCEL_APPROVE1, HANDLE_VALIDATE_CANCEL_APPROVE2, HANDLE_VALIDATE_CANCEL_APPROVE3, HANDLE_VALIDATE_CANCEL_REJECT1, HANDLE_VALIDATE_CANCEL_REJECT2, HANDLE_VALIDATE_CANCEL_REJECT3, HANDLE_VALIDATE_REJECT1, HANDLE_VALIDATE_REJECT2, HANDLE_VALIDATE_REJECT3, REQUEST_CREATING, REQUEST_DELETE, REQUEST_EDITING, REQUEST_QUERY, UPDATE_DATA, UPDATE_HISTORY, UPDATE_ORGSSEARCHING_DISTANCE, UPDATE_ORGS_CHILDREN, UPDATE_PYC, UPDATE_SPECIAL_DATA, REQUEST_VEHICLE, REQUEST_PERS, UPDATE_VEHICLE_DATA, UPDATE_PERS_DATA, REQUEST_SEACHVEHICLEPERS_CONTINUE, REQUEST_SEACHVEHICLEPERS_UPDATE, REQUEST_SEACHVEHICLEPERS_BACK, REQUEST_ORGANIZING, REQUEST_ORGANIZING_CHECK_STOP_POINT, REQUEST_ORGANIZING_SEARCH_DESTINATION, REQUEST_ORGANIZING_SEARCH_DESTINATION_SELECT, REQUEST_ORGANIZING_ADD_HDB, REQUEST_ORGANIZING_INSERT, REQUEST_ORGANIZING_CHECK_BALANCE_HDB, REQUEST_ORGANIZING_UPDATE_ORDER, REQUEST_ORGANIZING_GET_KC, UPDATE_ORGANIZING, UPDATE_ORGANIZING_STOP_POINT, REQUEST_ORGANIZING_UPDATE, REQUEST_ORGANIZING_CONTINUE, REQUEST_ORGANIZING_BACK, REQUEST_ORGANIZING_URGENT_UPDATE, UPDATE_ORGANIZING_INSERT, } from './constants';
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
    yield takeLatest(HANDLE_SPECIAL_ADD, specialAddSaga);
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
    yield takeLatest(REQUEST_ORGANIZING_ADD_HDB, requestOrganizingAddHdbSaga);
    yield takeLatest(REQUEST_ORGANIZING_INSERT, requestOrganizingInsertSaga);
    yield takeLatest(REQUEST_ORGANIZING_CHECK_BALANCE_HDB, requestOrganizingCheckBalanceHdbSaga);
    yield takeLatest(REQUEST_ORGANIZING_UPDATE_ORDER, requestOrganizingUpdateOrderSaga);
    yield takeLatest(REQUEST_ORGANIZING_GET_KC, requestOrganizingGetKcSaga);

    yield takeLatest(REQUEST_ORGANIZING_UPDATE, requestOrganizingUpdateSaga);
    yield takeLatest(REQUEST_ORGANIZING_CONTINUE, requestOrganizingContinueSaga);
    yield takeLatest(REQUEST_ORGANIZING_BACK, requestOrganizingBackSaga);
    yield takeLatest(REQUEST_ORGANIZING_URGENT_UPDATE, requestOrganizingUrgentUpdateSaga);
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

function* fetchVehicleSaga(action?) {
    const state = yield select();
    const responseData = yield call(getVehicleData, state.routeManagement.vehiclePopup, state.auth, action);
    yield put({ type: UPDATE_VEHICLE_DATA, data: responseData.data });
}

function* fetchPersSaga(action?) {
    const state = yield select();
    const responseData = yield call(getPersData, state.routeManagement.persPopup, state.auth, action);
    yield put({ type: UPDATE_PERS_DATA, data: responseData.data });
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
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'searchVehiclePersPopup', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'organizingPopup', 'isDisabled'], value: true });
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
    const responseData = yield call(requestDelete, Config.url + '/api/cashoptimization/route/delete', state.routeManagement.editingPopup, state.auth);

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

    const cashOptimizatioDetailModelList = state.routeManagement.organizingPopup?.cashOptimizatioDetailModelList;
    const newItem = {
        type: state.routeManagement.organizingPopup?.type,
        currencyType: state.routeManagement.organizingPopup?.currencyType,
        goldType: state.routeManagement.organizingPopup?.goldType,
        quanlity: state.routeManagement.organizingPopup?.quanlity,
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
    if (_.isEmpty(cashOptimizatioDetailModelList?.filter(filterSameSpecialData(newItem)))) {
        return yield put({ type: UPDATE_SPECIAL_DATA });
    }
    return yield spawn(addNoti, 'error', 'Yêu cầu điều quỹ đã tồn tại');
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


function* searchVehiclePersUpdateSaga() {
    const state = yield select();
    console.log(state.routeManagement);
    const responseData = yield call(requestSearchVehiclePersUpdate, Config.url + '/api/cashoptimization/route/findVehicleAndPersForRouteUpdate', state.routeManagement.searchVehiclePersPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}
function* searchVehiclePersContinueSaga() {
    const state = yield select();
    const responseData = yield call(requestSearchVehiclePersUpdate, Config.url + '/api/cashoptimization/route/findVehicleAndPersForRouteContinue', state.routeManagement.searchVehiclePersPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}
function* searchVehiclePersBackSaga() {
    const state = yield select();
    const responseData = yield call(requestSearchVehiclePersUpdate, Config.url + '/api/cashoptimization/route/findVehicleAndPersForRouteBack', state.routeManagement.searchVehiclePersPopup, state.auth);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['routeManagement', 'edit', 'isShown'], value: false });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'edit', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'detail', 'isDisabled'], value: true });
    yield put({ type: HANDLE_BUTTON, keys: ['routeManagement', 'delete', 'isDisabled'], value: true });
}


function* requestOrganizingSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestOrganizing, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_ORGANIZING, data: responseData.data });
}
function requestOrganizing(data, action) {
    const url = Config.url + '/api/cashoptimization/route/oganize_find_by_id';
    const postData = {
        data: {
            routeId: data.id,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function* requestOrganizingCheckStopPointSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestOrganizingCheckStopPoint, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_ORGANIZING_STOP_POINT, data: responseData.data });
}
function requestOrganizingCheckStopPoint(data, action) {
    const url = Config.url + '/api/cashoptimization/route/route_organize_check_stop_point';
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
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestOrganizingSearchDestination, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_DATA, data: responseData.data });
}
function requestOrganizingSearchDestination(data, action) {
    const url = Config.url + '/api/cashoptimization/route/oganize_search_destination';
    const postData = {
        data: {
            routeId: data.id,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function* requestOrganizingSearchDestinationSelectSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestOrganizingSearchDestinationSelect, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_DATA, data: responseData.data });
}
function requestOrganizingSearchDestinationSelect(data, action) {
    const url = Config.url + '/api/cashoptimization/route/oganize_search_destination_select';
    const postData = {
        data: {
            routeId: data.id,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function* requestOrganizingAddHdbSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestOrganizingAddHdb, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ ...action, type: HANDLE_SPECIAL_ADD });
}
function requestOrganizingAddHdb(data, action) {
    const url = Config.url + '/api/cashoptimization/route/organize_add_hdb';
    console.log(action);
    console.log(data);
    const postData = {
        data: {
            routeId: data.id,
            stopPointType: data.stopPointType?.value,
            routeDetailHdbModel: [
                {
                    type: "THU QUỸ KPP",
                    currencyType: "VND",
                    goldType: "Ngoại bảng",
                    quanlity: 0,
                    attribute: "HĐB đủ tiêu chuẩn"
                }
            ]
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}


function* requestOrganizingInsertSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestOrganizingInsert, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: UPDATE_ORGANIZING_INSERT, data: responseData.data });
}
function requestOrganizingInsert(data, action) {
    const url = Config.url + '/api/cashoptimization/route/organize_insert';
    const postData = {
        data: {
            routeId: data.id,
            stopPointType: data.stopPointType?.value,
            departurePointName: data.departurePointName,
            departurePointAddress: data.departurePointAddress,
            destinationPointName: data.destinationPointName,
            destinationPointAddress: data.destinationPointAddress,
            cashOptimizationId: data.cashOptimizationId,
            kcDepartureToDestination: data.kcDepartureToDestination || 0,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}


function* requestOrganizingCheckBalanceHdbSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestOrganizingCheckBalanceHdb, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_DATA, data: responseData.data });
}
function requestOrganizingCheckBalanceHdb(data, action) {
    const url = Config.url + '/api/cashoptimization/route/organize_check_balance_hdb';
    const postData = {
        data: {
            routeId: data.id,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}


function* requestOrganizingUpdateOrderSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestOrganizingUpdateOrder, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_DATA, data: responseData.data });
}
function requestOrganizingUpdateOrder(data, action) {
    const url = Config.url + '/api/cashoptimization/route/organize_update_order';
    const postData = {
        data: {
            routeId: data.id,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}


function* requestOrganizingGetKcSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestOrganizingGetKc, state.routeManagement.organizingPopup, action);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: UPDATE_DATA, data: responseData.data });
}
function requestOrganizingGetKc(data, action) {
    const url = Config.url + '/api/cashoptimization/route/organize_get_kc';
    const postData = {
        data: {
            routeId: data.id,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function* requestOrganizingUpdateSaga() {
    const state = yield select();
    const responseData = yield call(requestOrganizingUpdate, Config.url + '/api/cashoptimization/route/organize_update', state.routeManagement.organizingPopup, state.auth);

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
    const responseData = yield call(requestOrganizingUpdate, Config.url + '/api/cashoptimization/route/organize_continue', state.routeManagement.organizingPopup, state.auth);

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


function* requestOrganizingBackSaga() {
    const state = yield select();
    const responseData = yield call(requestOrganizingUpdate, Config.url + '/api/cashoptimization/route/organize_back', state.routeManagement.organizingPopup, state.auth);

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
    const responseData = yield call(requestOrganizingUpdate, Config.url + '/api/cashoptimization/route/organize_urgent_update', state.routeManagement.organizingPopup, state.auth);

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

function requestOrganizingUpdate(url: string, data, auth) {
    const postData = {
        data: {
            routeId: data.id,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}


function getHistory(data, action) {
    const {
        page = 0,
        sort = '',
    } = action ?? {}; const url = Config.url + '/api/cashoptimization/route/history';
    const postData = {
        data: {
            routeId: data.id,
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
    } = action ?? {}; const url = Config.url + '/api/cashoptimization/route/search';
    const data = filters.radio === '1'
        ? {
            orgsCode: filters.orgs?.value,
            routeFromDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateFrom),
            routeToDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateTo),
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
            size: Config.numberOfItemsPerPage,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getVehicleData(filters, auth, action) {
    const {
        page = 0,
        sort = '',
    } = action ?? {}; const url = Config.url + '/api/cashoptimization/route/searchVehicle';

    const postData = {
        data: {
            routeId: filters.routeId,
            searchType: filters.searchType?.value,
            searchValue: filters.searchValue,
            sort: sort,
            page: page,
            size: Config.numberOfItemsPerPage,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getPersData(filters, auth, action) {
    const {
        page = 0,
        sort = '',
    } = action ?? {}; const url = Config.url + '/api/cashoptimization/route/searchPers';

    const postData = {
        data: {
            routeId: filters.routeId,
            searchType: filters.searchType?.value,
            searchValue: filters.searchValue,
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
    } = action ?? {}; const url = Config.url + '/api/cashoptimization/route/searchPyc';
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
    } = action ?? {}; const url = Config.url + '/api/cashoptimization/route/exportExcel';
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


function requestSearchVehiclePersUpdate(url: string, data, auth) {
    console.log(data);
    const postData = {
        data: {
            id: data.id,
            transportType: data.transportType?.value,
            routeDetailVehicle: data.vehicles?.map(item => ({
                vehicleCode: item.vehicleCode,
            })) ?? [],
            routeDetailPers: data.pers?.map(item => ({
                persCode: item.persCode,
                persName: item.persFullname,
            })) ?? [],
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
            routeId: data.id,
            routeReasonType: data.reasonType?.text,
            routeReasonDesc: data.reasonType?.text == 'KHÁC' ? data.rejectReason : data.reasonType?.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}


export default saga;