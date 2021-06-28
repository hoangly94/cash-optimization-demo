import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING, FETCH_HISTORY, UPDATE_HISTORY } from './constants';
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
    const responseData = yield call(getHistory, action?.page);
    yield put({ type: UPDATE_HISTORY, data: responseData.data });
}

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.title.filters, action?.page);

    yield put({ type: UPDATE_DATA, data: responseData.data });
}

function* createDataSaga() {
    const state = yield select();
    const responseData = yield call(requestCreating, Config.url + '/api/cashoptimization/createCategoryTitle', state.title.creatingPopup);
    
    if(!responseData || !responseData.data || responseData.data.resultCode != 0){
        return yield spawn(addNoti, 'error');
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP,  keys: ['title', 'create', 'isShown'], value:false});
}

function* editDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, Config.url + '/api/cashoptimization/updateCategoryTitle', state.title.selectedItem);
    
    if(!responseData || !responseData.data || responseData.data.resultCode != 0){
        return yield spawn(addNoti, 'error');
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
    yield fetchDataSaga();
    yield put({ type: HANDLE_POPUP,  keys: ['title', 'edit', 'isShown'], value:false});
}
function getHistory(page:number = 0) {
    const url = Config.url + '/api/cashoptimization/historyCategoryTitle';
    const postData = {
        data: {
            page: page,
            size: Config.numberOfItemsPerPage,
        }
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function getData(filters, page:number = 0) {
    const url = Config.url + '/api/cashoptimization/findCategoryTitle';
    const titleCode = parseInt(filters.titleCode);
    const postData = {
        data: {
            titleCode: titleCode ? ''+titleCode : 0,
            page:page,
            size: Config.numberOfItemsPerPage,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function requestCreating(url: string, data) {
    const postData = {
        data: {
            titleCode: data.titleCode,
            titleName: data.titleName,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestEditing(url: string, data) {
    const postData = {
        data: {
            id: parseInt(data.id),
            titleCode: data.titleCode,
            titleName: data.titleName,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}



export default saga;