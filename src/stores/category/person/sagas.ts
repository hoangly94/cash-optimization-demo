import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, UPDATE_DATA, REQUEST_CREATING, DONE_CREATING, REQUEST_EDITING, FETCH_HISTORY, UPDATE_HISTORY, FETCH_HISTORY_DETAIL, UPDATE_HISTORY_DETAIL } from './constants';
import { addNoti } from '~stores/_base/sagas';
import { HANDLE_POPUP } from '~stores/_base/constants';
import { convertDateDDMMYYYtoYYYYMMDD, convertDataToYYYY_MM_DD } from '~/utils';

function* saga() {
    yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(REQUEST_CREATING, createDataSaga);
    yield takeLatest(REQUEST_EDITING, editDataSaga);
}

function* fetchHistorySaga(action?) {
    const state = yield select();
    const responseData = yield call(getHistory, action, state.person.selectedItem);
    yield put({ type: UPDATE_HISTORY, data: responseData.data });
}

function* fetchDataSaga(action?) {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(getData, state.person.filters, action);

    if (state.person.filters.persCode && parseInt(state.person.filters.persCode) != state.person.filters.persCode) {
        yield spawn(addNoti, 'error', 'Không tìm thấy kết quả');
        return yield put({ type: UPDATE_DATA, data: {data:[]}, sort: action?.sort, page: action?.page });
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
    const responseData = yield call(requestCreating, process.env.PATH + '/api/cashoptimization/createCategoryPers', state.person.creatingPopup);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield fetchDataSaga();
    yield spawn(addNoti, 'success');
    yield put({ type: HANDLE_POPUP, keys: ['person', 'create', 'isShown'], value: false });
}

function* editDataSaga() {
    yield put({ type: FETCH_DATA });
    const state = yield select();
    const responseData = yield call(requestEditing, process.env.PATH + '/api/cashoptimization/updateCategoryPers', state.person.selectedItem);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }

    yield put({ type: DONE_CREATING });
    yield spawn(addNoti, 'success');
    yield fetchDataSaga();
    yield put({ type: HANDLE_POPUP, keys: ['person', 'edit', 'isShown'], value: false });
}
function getHistory(action, data) {
    const {
        page = 0,
        sort = data.sort ?? '',
    } = action ?? {};
    const url = process.env.PATH + '/api/cashoptimization/historyCategoryPersByCode';
    const postData = {
        data: {
            sort: sort,
            page: page,
            persCode: data?.persCode,
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
    const url = process.env.PATH + '/api/cashoptimization/findCategoryPers';
    const postData = {
        data: {
            orgsId: filters.orgsId?.value ? parseInt(filters.orgsId.value) : 0,
            persCode: filters.persCode ? '' + filters.persCode : 0,
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
            persCode: data.persCode,
            persFullname: data.persFullname,
            persTitle: data.persTitleSelected.value,
            persMobile: data.persMobile,
            persCmndCccd: data.persCmndCccd,
            persCmndCccdYear: convertDateDDMMYYYtoYYYYMMDD(data.persCmndCccdYear) + ' 00:00:00',
            persCmndCccdPlace: data.persCmndCccdPlace,
            orgsId: data.orgsSelected.value,
            persEmail: data.persEmail,
            persStatus: data.persStatusSelected.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestEditing(url: string, data) {
    const postData = {
        data: {
            id: parseInt(data.id),
            persCode: data.persCode,
            persFullname: data.persFullname,
            persTitle: data.persTitleSelected.value,
            persMobile: data.persMobile,
            persCmndCccd: data.persCmndCccd,
            persCmndCccdYear: convertDateDDMMYYYtoYYYYMMDD(data.persCmndCccdYear) + ' 00:00:00',
            persCmndCccdPlace: data.persCmndCccdPlace,
            orgsId: data.orgsSelected.value,
            persEmail: data.persEmail,
            persStatus: data.persStatusSelected.value,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}



export default saga;