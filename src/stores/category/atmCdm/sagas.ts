import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { FETCH_MAP, UPDATE_MAP, FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING, FETCH_HISTORY, UPDATE_HISTORY, FETCH_HISTORY_DETAIL, UPDATE_HISTORY_DETAIL } from './constants';
import { addNoti } from '~stores/_base/sagas';
import { HANDLE_POPUP } from '~stores/_base/constants';

function* saga() {
    yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, editDataSaga);
    yield takeLatest(FETCH_MAP, fetchMapSaga);
}

function* fetchHistorySaga(action?) {
    const state = yield select();
    const responseData = yield call(getHistory, action, state.atmCdm.selectedItem);

    yield put({ type: UPDATE_HISTORY, data: responseData.data});
}

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.atmCdm.filters, action);
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
    const responseData = yield call(requestCreating, process.env.PATH + '/api/cashoptimization/createATMCDM', state.atmCdm.creatingPopup);
    
    if(!responseData || !responseData.data || responseData.data.resultCode != 0){
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP,  keys: ['atmCdm', 'create', 'isShown'], value:false});
}

function* editDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, process.env.PATH + '/api/cashoptimization/updateATMCDM', state.atmCdm.selectedItem);
    
    if(!responseData || !responseData.data || responseData.data.resultCode != 0){
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
    yield fetchDataSaga();
    yield put({ type: HANDLE_POPUP,  keys: ['atmCdm', 'edit', 'isShown'], value:false});
}
function getHistory(action, data) {
    const {
        page = 0,
        sort = data.sort ?? '',
    } = action ?? {};
    const url = process.env.PATH + '/api/cashoptimization/historyCategoryATMCDMByCode';
    const postData = {
        data: {
            sort: sort,
            page: page,
            atmCdmCode: data?.atmCdmCode,
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
    } = action ?? {};
    const url = process.env.PATH + '/api/cashoptimization/findCategoryATMCDM';
    const postData = {
        data: {
            atmStatus: filters.atmCdmStatus?.value ? filters.atmCdmStatus.value : null,
            orgsId: filters.orgs?.value ? filters.orgs.value : 0,
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
            atmCdmCode: parseInt(data.atmCdmCode),
            atmCdmName: data.atmCdmName,
            atmCdmType: data.atmCdmType,
            atmAddress: data.atmAddress,
            atmStatus: data.atmCdmSelected.value,
            orgsId: data.orgsSelected.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestEditing(url: string, data) {
    const postData = {
        data: {
            id: parseInt(data.id),
            atmCdmCode: parseInt(data.atmCdmCode),
            atmCdmName: data.atmCdmName,
            atmCdmType: data.atmCdmType,
            atmAddress: data.atmAddress,
            atmStatus: data.atmCdmSelected.value,
            orgsId: data.orgsSelected.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function* fetchMapSaga(action?) {
    const state = yield select();
    const popupType = state.base.popups.atmCdm.create.isShown ? 'creatingPopup' : state.base.popups.atmCdm.edit.isShown ? 'editingPopup' : undefined;
    if(popupType){
        const url = process.env.PATH + `/api/cashoptimization/route/getRouteMapForAddress?address=${state.atmCdm[popupType].atmAddress}`;
        const responseData = yield axios.get(url).catch(error => console.log(error));
        yield put({ type: UPDATE_MAP, data: responseData.data });
    }
}


export default saga;