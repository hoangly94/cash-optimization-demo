import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn, takeEvery, delay } from 'redux-saga/effects';
import { FETCH_DATA, FETCH_MAP, FETCH_MAP_DRIVER, REQUEST_ROUTE_CONFIRM_1, REQUEST_ROUTE_CONFIRM_1_KCD, REQUEST_ROUTE_CONFIRM_2, REQUEST_ROUTE_CONFIRM_2_KCD, REQUEST_ROUTE_CONFIRM_3, REQUEST_ROUTE_CONFIRM_3_KCD, REQUEST_ROUTE_START, REQUEST_ROUTE_START_KCD, SEARCH_TQUY, UPDATE_DATA, UPDATE_MAP, UPDATE_TQUY } from './constants';
import Config from '@config';
import { _Date, getCurrentDate } from '@utils';
import _ from 'lodash';
import { addNoti } from '../_base/sagas';
import { HANDLE_BUTTON } from '../_base/constants';

function* saga() {
    // yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(FETCH_DATA, fetchDataSaga);
    yield takeLatest(FETCH_MAP, fetchMapSaga, 'getRouteMap');
    yield takeLatest(FETCH_MAP_DRIVER, fetchMapSaga, 'getRouteMapForDriver');
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
    
    const responseData1 = action?.routeDetailOganize?.destinationPointName ? yield call(searchTquy, _.uniq(action.route?.routeDetailOganize?.map(item => item.destinationPointName)).join(',')) : undefined;
    if (!responseData1 || !responseData1.data || responseData1.data.resultCode != 0) {
    }
    const destinationPointName = action.route?.routeDetailOganize?.filter(item => item.routeDetailOganizeStatus === 'PRO')[0]?.destinationPointName;
    const responseData2 = destinationPointName ? yield call(searchTquy, destinationPointName) : undefined;
    if (!responseData2 || !responseData2.data || responseData2.data.resultCode != 0) {
    }
    yield put({ type: UPDATE_TQUY, data1: responseData1?.data, data2: responseData2?.data });
}

function searchTquy(data) {
    const url = Config.url + '/api/cashoptimization/route/searchTQUY';

    const postData = {
        data: {
            orgsName: data,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
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
    const routeDetailOganize = responseData.data?.data?.routeDetailOganize?.filter(item => item.routeDetailOganizeStatus === 'PRO')[0];

    yield put({ type: SEARCH_TQUY, routeDetailOganize, route: responseData.data?.data });
    yield put({ type: UPDATE_DATA, data: responseData.data, sort: action?.sort, page: action?.page });

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

function* fetchMapSaga(apiPath) {
    const state = yield select();
    if (state.routeTracking?.route?.id) {
        const url = Config.url + `/api/cashoptimization/route/${apiPath}?routeId=${state.routeTracking?.route.id}`;
        const responseData = yield call(getMap, url, state.routeTracking?.route);
        yield put({ type: UPDATE_MAP, data: responseData.data });
    }
    // const responseData = yield call(getMap, state.routeTracking.route);
    // const responseData = yield call(getMap, action);
    // yield put({ type: UPDATE_MAP, data: responseData.data });
}
function getMap(url, data) {
    // const url = data.id ? Config.url + '/api/cashoptimization/route/getRouteMap?routeId=' + data.id : Config.url + '/api/cashoptimization/route/getRouteMap?routeId=16';

    return axios.get(url)
        .catch(error => console.log(error));
}


function* requestRouteStartSaga(action?) {
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: true });
    const state = yield select();
    const api = 'routeStart';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: false });
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'success', 'Bạn đã cập nhật thành công');

    yield put({ type: FETCH_DATA });
}
function* requestRouteConfirm1Saga(action?) {
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: true });
    const state = yield select();
    const api = 'routeConfirm1';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: false });
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'success', 'Bạn đã cập nhật thành công');

    yield put({ type: FETCH_DATA });
}
function* requestRouteConfirm2Saga(action?) {
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: true });
    const state = yield select();
    const api = 'routeConfirm2';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: false });
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'success', 'Bạn đã cập nhật thành công');

    yield put({ type: FETCH_DATA });
}
function* requestRouteConfirm3Saga(action?) {
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: true });
    const state = yield select();
    const api = 'routeConfirm3';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: false });
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'success', 'Bạn đã cập nhật thành công');

    yield put({ type: FETCH_DATA });
}


function* requestRouteStartKCDSaga(action?) {
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: true });
    const state = yield select();
    const api = 'routeStart_KCD';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: false });
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'success', 'Bạn đã cập nhật thành công');

    yield put({ type: FETCH_DATA });
}
function* requestRouteConfirm2KCDSaga(action?) {
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: true });
    const state = yield select();
    const api = 'routeConfirm2_KCD';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: false });
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'success', 'Bạn đã cập nhật thành công');

    yield put({ type: FETCH_DATA });
}
function* requestRouteConfirm3KCDSaga(action?) {
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: true });
    const state = yield select();
    const api = 'routeConfirm3_KCD';
    const responseData = yield call(requestRouteSubmit, api, state.routeTracking.route, action?.order);
    yield put({ type: HANDLE_BUTTON, keys: ['routeTracking', 'confirm', 'isLoading'], value: false });
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield spawn(addNoti, 'success', 'Bạn đã cập nhật thành công');

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