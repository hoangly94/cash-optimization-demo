import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING, FETCH_HISTORY, UPDATE_HISTORY, FETCH_HISTORY_DETAIL, UPDATE_HISTORY_DETAIL, UPDATE_DATA_PERS, REQUEST_PERS, SELECT_ORGS_CODE_CREATING } from './constants';
import { addNoti } from '~stores/_base/sagas';
import { HANDLE_POPUP } from '~stores/_base/constants';

function* saga() {
    yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_PERS, fetchPersDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, editDataSaga);
    yield takeLatest(SELECT_ORGS_CODE_CREATING, selectOrgsCodeSaga);
}

function* selectOrgsCodeSaga(action?) {
    // yield put({ type: REQUEST_PERS});    
}
function* fetchHistorySaga(action?) {
    const state = yield select();
    const responseData = yield call(getHistory, action, state.vehicle.selectedItem);
    yield put({ type: UPDATE_HISTORY, data: responseData.data});
}

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.vehicle.filters, action);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    if (!responseData.data?.data) {
        yield spawn(addNoti, 'error', 'Không tìm thấy kết quả');
    }

    yield put({ type: UPDATE_DATA, data: responseData.data, sort: action?.sort, page:action?.page });
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, process.env.PATH + '/api/cashoptimization/createCategoryVehicle', state.vehicle.creatingPopup);
    if(!responseData || !responseData?.data || responseData.data.resultCode != 0){
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP,  keys: ['vehicle', 'create', 'isShown'], value:false});
}

function* editDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, process.env.PATH + '/api/cashoptimization/updateCategoryVehicle', state.vehicle.selectedItem);
    
    if(!responseData || !responseData.data || responseData.data.resultCode != 0){
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
    yield fetchDataSaga();
    yield put({ type: HANDLE_POPUP,  keys: ['vehicle', 'edit', 'isShown'], value:false});
}

function getHistory(action, data) {
    const {
        page = 0,
        sort = data.sort ?? '',
    } = action ?? {};
    const url = process.env.PATH + '/api/cashoptimization/historyCategoryVehicleByCode';
    const postData = {
        data: {
            sort: sort,
            page: page,
            vehicleCode: data?.vehicleCode,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}



function* fetchPersDataSaga(action?) {
    const state = yield select();
    const responseData = yield call(getPersData, action?.popupType === 2? state.vehicle.selectedItem: state.vehicle.creatingPopup, action);

    yield put({ type: UPDATE_DATA_PERS, data: responseData.data, page:action?.page });
}

function getPersData(data, action) {
    const url = process.env.PATH + '/api/cashoptimization/findCategoryPers';
    const postData = {
        data: {
            orgsId: data.orgsSelected?.value ? parseInt(data.orgsSelected.value) : 0,
            persCode: 0,
            persTitle: 'LXE',
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}
function getData(filters, action) {
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {};
    const url = process.env.PATH + '/api/cashoptimization/findCategoryVehicle';
    const vehicleCode = filters.vehicleCode;
    const postData = {
        data: {
            orgsId: filters.orgsId?.value ? parseInt(filters.orgsId.value) : 0,
            vehicleCode: vehicleCode || null,
            sort,
            page,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function requestCreating(url: string, data) {
    const postData = {
        data: {
            vehicleCode: data.vehicleCode,
            vehicleType: data.vehicleType,
            functionId: data.vehicleFunctionSelected?.value,
            vehicleYearManufacture: data.vehicleYearManufacture,
            orgsId: data.orgsSelected.value,
            region: data.region,
            vehicleStatus: data.vehicleStatusSelected.value,
            driverCode: data.driverCodeSelected?.value,
            driverName: data.driverCodeSelected?.text,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestEditing(url: string, data) {
    const postData = {
        data: {
            id: parseInt(data.id),
            vehicleCode: data.vehicleCode,
            vehicleType: data.vehicleType,
            functionId: data.vehicleFunctionSelected?.value,
            vehicleYearManufacture: data.vehicleYearManufacture,
            orgsId: data.orgsSelected.value,
            region: data.region,
            vehicleStatus: data.vehicleStatusSelected.value,
            driverCode: data.driverCodeSelected?.value,
            driverName: data.driverCodeSelected?.text,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}



export default saga;