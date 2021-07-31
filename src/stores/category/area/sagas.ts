import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING, FETCH_HISTORY, UPDATE_HISTORY, FETCH_HISTORY_DETAIL, UPDATE_HISTORY_DETAIL } from './constants';
import Config from '@config';
import { addNoti } from '~stores/_base/sagas';
import { HANDLE_POPUP } from '~stores/_base/constants';

function* saga() {
    yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(FETCH_HISTORY_DETAIL, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, editDataSaga);
}

function* fetchHistorySaga(action?) {
    const state = yield select();
    const responseData = yield call(getHistory, action, state.area.selectedItem);
    yield put({ type: UPDATE_HISTORY, data: responseData.data});
}

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.area.filters, action);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    if (!responseData.data?.data) {
        yield spawn(addNoti, 'error', 'Không tìm thấy kết quả');
    }

    yield put({ type: UPDATE_DATA, data: responseData.data, page:action?.page });
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/cashoptimization/createCategoryArea', state.area.creatingPopup);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['area', 'create', 'isShown'], value: false });
}

function* editDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/updateCategoryArea', state.area.selectedItem);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
    yield fetchDataSaga();
    yield put({ type: HANDLE_POPUP, keys: ['area', 'edit', 'isShown'], value: false });
}
function getHistory(action, data) {
    const {
        page = 0,
        sort = '',
    } = action ?? {};
    const url = Config.url + '/api/cashoptimization/historyCategoryAreaByCode';
    const postData = {
        data: {
            sort: sort,
            page: page,
            areaCode: data.areaCode,
            size: Config.numberOfItemsPerPage,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getData(filters, action) {
    const {
        page = 0,
        sort = '',
    } = action ?? {};
    const url = Config.url + '/api/cashoptimization/findCategoryArea';
    const postData = {
        data: {
            areaName: filters.areaCode ?? null,
            sort: sort,
            page: page,
            size: Config.numberOfItemsPerPage,
            
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function requestCreating(url: string, data) {
    const postData = {
        data: {
            areaCode: data.areaCode,
            areaName: data.areaName,
            regionId: data.regionSelected.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestEditing(url: string, data) {
    const postData = {
        data: {
            id: parseInt(data.id),
            areaCode: data.areaCode,
            areaName: data.areaName,
            regionId: data.regionSelected.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}



export default saga;