import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn, takeEvery, delay } from 'redux-saga/effects';
import { FETCH_DATA, FETCH_MAP, REQUEST_ROUTE_CONFIRM_1, REQUEST_ROUTE_CONFIRM_1_KCD, REQUEST_ROUTE_CONFIRM_2, REQUEST_ROUTE_CONFIRM_2_KCD, REQUEST_ROUTE_CONFIRM_3, REQUEST_ROUTE_CONFIRM_3_KCD, REQUEST_ROUTE_START, REQUEST_ROUTE_START_KCD, SEARCH_TQUY, UPDATE_DATA, UPDATE_MAP } from './constants';
import Config from '@config';
import { _Date, getCurrentDate } from '@utils';
import _ from 'lodash';
import { addNoti } from '../_base/sagas';

function* saga() {
    // yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(FETCH_DATA, fetchDataSaga);
    yield takeLatest(FETCH_MAP, fetchMapSaga);
    yield takeLatest(REQUEST_ROUTE_START, requestRouteStartSaga);
    yield takeLatest(REQUEST_ROUTE_CONFIRM_1, requestRouteConfirm1Saga);
    yield takeLatest(REQUEST_ROUTE_CONFIRM_2, requestRouteConfirm2Saga);
    yield takeLatest(REQUEST_ROUTE_CONFIRM_3, requestRouteConfirm3Saga);
    yield takeLatest(REQUEST_ROUTE_START_KCD, requestRouteStartKCDSaga);
    yield takeLatest(REQUEST_ROUTE_CONFIRM_2_KCD, requestRouteConfirm2KCDSaga);
    yield takeLatest(REQUEST_ROUTE_CONFIRM_3_KCD, requestRouteConfirm3KCDSaga);
    yield takeLatest(SEARCH_TQUY, searchTquySaga);
}
function* searchTquySaga(action?) {
    const state = yield select();
    const responseData = yield call(searchTquy, state.routeManagement.organizingPopup, action);
    console.log('=================');
    console.log(state.routeManagement.organizingPopup);
    // if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
    //     return yield spawn(addNoti, 'error', responseData?.data?.message);
    // }
    // yield put({ type: UPDATE_ORGANIZE_URGENT_CHECKBYID, data: responseData.data, page: action?.page });
}

function searchTquy(data, action) {
    // const url = Config.url + '/api/cashoptimization/route/searchTQUY';

    // const postData = {
    //     data: {
    //         routeId: '' + data.id,
    //     },
    // }
    // return axios.post(url, postData)
    //     .catch(error => console.log(error));
}


function* fetchDataSaga(action?) {
    const state = yield select();
    const responseData = yield call(getData, state.routeTracking.filters);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    if (!responseData.data?.data) {
        yield spawn(addNoti, 'error', 'Không tìm thấy kết quả');
    }
    
    yield put({ type: UPDATE_DATA, data: responseData.data, page:action?.page });
    yield put({ type: SEARCH_TQUY});
}

function getData(filters) {
    const url = Config.url + '/api/cashoptimization/route/searchById';
    const postData = {
        data: {
            routeId: filters.id,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function* fetchMapSaga(action?) {
    const state = yield select();
    const responseData = yield call(getMap, state.routeTracking.route);
    yield put({ type: UPDATE_MAP, data: responseData.data });
}

function getMap(data) {
    const url = Config.url + '/api/cashoptimization/route/getRouteMap?routeId=' + data.id;

    return axios.get(url)
        .catch(error => console.log(error));
}


function* requestRouteStartSaga(action?) {
    const state = yield select();
    const api = 'routeStart';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'Success', 'Success');
    yield put({ type: FETCH_DATA });
}
function* requestRouteConfirm1Saga(action?) {
    const state = yield select();
    const api = 'routeConfirm1';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'Success', 'Success');
    yield put({ type: FETCH_DATA });
}
function* requestRouteConfirm2Saga(action?) {
    const state = yield select();
    const api = 'routeConfirm2';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'Success', 'Success');
    yield put({ type: FETCH_DATA });
}
function* requestRouteConfirm3Saga(action?) {
    const state = yield select();
    const api = 'routeConfirm3';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'Success', 'Success');
    yield put({ type: FETCH_DATA });
}


function* requestRouteStartKCDSaga(action?) {
    const state = yield select();
    const api = 'routeStart_KCD';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'Success', 'Success');
    yield put({ type: FETCH_DATA });
}
function* requestRouteConfirm2KCDSaga(action?) {
    const state = yield select();
    const api = 'routeConfirm2_KCD';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'Success', 'Success');
    yield put({ type: FETCH_DATA });
}
function* requestRouteConfirm3KCDSaga(action?) {
    const state = yield select();
    const api = 'routeConfirm3_KCD';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'Success', 'Success');
    yield put({ type: FETCH_DATA });
}

function requestRouteSubmit(api, data, order) {
    const url = Config.url + '/api/cashoptimization/route/' + api;
    const postData = {
        data: {
            routeId: data.id,
            order,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}


export default saga;