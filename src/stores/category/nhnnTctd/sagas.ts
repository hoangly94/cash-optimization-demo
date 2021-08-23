import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING, FETCH_HISTORY, UPDATE_HISTORY, FETCH_HISTORY_DETAIL, UPDATE_HISTORY_DETAIL } from './constants';
import Config from '@config';
import { addNoti } from '~stores/_base/sagas';
import { HANDLE_POPUP } from '~stores/_base/constants';

function* saga() {
    yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, editDataSaga);
}

function* fetchHistorySaga(action?) {
    const state = yield select();
    const responseData = yield call(getHistory, action, state.nhnnTctd.selectedItem);
    yield put({ type: UPDATE_HISTORY, data: responseData.data});
}

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.nhnnTctd.filters, action);
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
    const responseData = yield call(requestCreating, Config.url + '/api/cashoptimization/createCategoryNHNNTCTD', state.nhnnTctd.creatingPopup);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['nhnnTctd', 'create', 'isShown'], value: false });
}

function* editDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/updateCategoryNHNNTCTD', state.nhnnTctd.selectedItem);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
    yield fetchDataSaga();
    yield put({ type: HANDLE_POPUP, keys: ['nhnnTctd', 'edit', 'isShown'], value: false });
}
function getHistory(action, data) {
    const {
        page = 0,
        sort = data.sort ?? '',
    } = action ?? {};
    const url = Config.url + '/api/cashoptimization/historyCategoryNHNNTCTDByCode';
    const postData = {
        data: {
            sort: sort,
            page: page,
            nnhnTctdCode: data?.nnhnTctdCode,
            size: Config.numberOfItemsPerPage,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getData(filters, action) {
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {};const url = Config.url + '/api/cashoptimization/findCategoryNHNNTCTD';
    const postData = {
        data: {
            orgsId: filters.orgsId?.value ? parseInt(filters.orgsId.value) : 0,
            nnhnTctdCode: filters.nnhnTctdCode ? filters.nnhnTctdCode : 0,
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
            nnhnTctdCode: data.nnhnTctdCode,
            nnhnTctdName: data.nnhnTctdName,
            nnhnTctdAddress: data.nnhnTctdAddress,
            nnhnTctdType: data.nnhnTctdTypeSelected.value,
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
            nnhnTctdCode: data.nnhnTctdCode,
            nnhnTctdName: data.nnhnTctdName,
            nnhnTctdAddress: data.nnhnTctdAddress,
            nnhnTctdType: data.nnhnTctdTypeSelected.value,
            orgsId: data.orgsSelected.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}



export default saga;