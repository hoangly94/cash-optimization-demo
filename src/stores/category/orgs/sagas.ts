import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { FETCH_MAP, UPDATE_MAP, FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING, FETCH_HISTORY, UPDATE_HISTORY, FETCH_HISTORY_DETAIL, UPDATE_HISTORY_DETAIL } from './constants';
import { HANDLE_POPUP } from '~stores/_base/constants';
import { addNoti } from '~stores/_base/sagas';

function* saga() {
    yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, editDataSaga);
    yield takeLatest(FETCH_MAP, fetchMapSaga);
}

function* fetchHistorySaga(action?) {
    const state = yield select();
    const responseData = yield call(getHistory, action, state.orgs.selectedItem);
    yield put({ type: UPDATE_HISTORY, data: responseData.data });
}


function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.orgs.filters, action);

    if (state.orgs.filters.orgsCode && parseInt(state.orgs.filters.orgsCode) != state.orgs.filters.orgsCode) {
        yield spawn(addNoti, 'error', 'Không tìm thấy kết quả');
        return yield put({ type: UPDATE_DATA, data: { data: [] }, sort: action?.sort, page: action?.page });
    }

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    if (!responseData.data?.data) {
        yield spawn(addNoti, 'error', 'Không tìm thấy kết quả');
    }

    yield put({ type: UPDATE_DATA, data: responseData.data, sort: action?.sort, page: action?.page });
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, process.env.PATH + '/api/cashoptimization/createCategoryOrgs', state.orgs.creatingPopup);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['orgs', 'create', 'isShown'], value: false });
}

function* editDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, process.env.PATH + '/api/cashoptimization/updateCategoryOrgs', state.orgs.selectedItem);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['orgs', 'edit', 'isShown'], value: false });
}

function getHistory(action, data) {
    const {
        page = 0,
        sort = data.sort ?? '',
    } = action ?? {};
    const url = process.env.PATH + '/api/cashoptimization/historyCategoryOrgsByCode';
    const postData = {
        data: {
            sort: sort,
            page: page,
            orgsCode: data?.orgsCode,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getData(filters, action) {
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {}; const url = process.env.PATH + '/api/cashoptimization/findCategoryOrgs';
    const orgsCode = parseInt(filters.orgsCode);
    const postData = {
        data: {
            areaCode: filters.area?.value ? parseInt(filters.area.value) : 0,
            orgsCode: orgsCode ? orgsCode : 0,
            sort,
            page,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        },
    }
    return axios.post(url, postData)
        .catch(error => error.response);
}

function requestCreating(url: string, data) {
    const dvqlKc = data.dvqlKc?.toString().replaceAll(',', '');
    const postData = {
        data: {
            orgsCode: parseInt(data.orgsCode),
            orgsName: data.orgsName,
            orgsAddress: data.orgsAddress,
            areaId: data.areaSelected.value,
            areaCode: data.areaSelected.value,
            areaName: data.areaSelected.text,
            orgsParentId: data.orgsParentSelected.value,
            dvqlKc: (dvqlKc && Math.trunc(parseFloat(dvqlKc) * 100) / 100) || 0,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestEditing(url: string, data) {
    const dvqlKc = data.dvqlKc?.toString().replaceAll(',', '');
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
            dvqlKc: (dvqlKc && Math.trunc(parseFloat(dvqlKc) * 100) / 100) || 0,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}


function* fetchMapSaga(action?) {
    const state = yield select();
    const popupType = state.base.popups.orgs.create.isShown ? 'creatingPopup' : state.base.popups.orgs.edit.isShown ? 'editingPopup' : undefined;
    if(popupType){
        const url = process.env.PATH + `/api/cashoptimization/route/getRouteMapForAddress?address=${state.orgs[popupType].orgsAddress}`;
        const responseData = yield axios.get(url).catch(error => console.log(error));
        yield put({ type: UPDATE_MAP, data: responseData.data });
    }
}


export default saga;