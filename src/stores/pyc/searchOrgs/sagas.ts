import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { REQUEST_QUERY, UPDATE_DATA, } from './constants';

function* saga() {
    // yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
}
function* fetchDataSaga(action?) {
    const state = yield select();
    const responseData = yield call(getData, state.pycSearchOrgs.filters, action);
    yield put({ type: UPDATE_DATA, data: responseData.data, sort: action?.sort, page:action?.page });
}

function getData(filters, action) {
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {};const url = process.env.PATH + '/api/cashoptimization/authority/searchOrgs';

    const locationDataValue = filters.locationType.value === 'area'
        ? { areaId: filters.areaType.value ? filters.areaType.value : 0 }
        : { regionId: filters.regionType.value ? filters.regionType.value : 0 };
    const orgsDataValue = filters.orgsType.value === 'name'
        ? { orgsName: filters.orgsValue ? filters.orgsValue : null }
        : { orgsCode: filters.orgsValue ? (parseInt(filters.orgsValue) ? filters.orgsValue : -1) : 0 };

    const postData = {
        data: {
            ...locationDataValue,
            ...orgsDataValue,
            sort: sort,
            page: page,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

export default saga;