import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { REQUEST_QUERY, UPDATE_DATA, } from './constants';
import Config from '@config';
import { addNoti } from '_/stores/_base/sagas';

function* saga() {
    // yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
}
function* fetchDataSaga(action?) {
    const state = yield select();
    const responseData = yield call(getData, state.searchOrgs.filters, action);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    if (!responseData.data?.data) {
        yield spawn(addNoti, 'error', 'Không tìm thấy kết quả');
    }

    yield put({ type: UPDATE_DATA, data: responseData.data, sort: action?.sort, page:action?.page });
}

function getData(filters, action) {
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {};const url = Config.url + '/api/cashoptimization/authority/searchOrgs';

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
            size: Config.numberOfItemsPerPage,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

export default saga;