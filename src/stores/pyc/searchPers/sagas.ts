import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn } from 'redux-saga/effects';
import { REQUEST_QUERY, UPDATE_DATA, } from './constants';

function* saga() {
    // yield takeLatest(FETCH_HISTORY, fetchHistorySaga);
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
}
function* fetchDataSaga(action?) {
    const state = yield select();
    const responseData = yield call(getData, state.searchPers.filters, action);

    yield put({ type: UPDATE_DATA, data: responseData.data, sort: action?.sort, page:action?.page });
}

function getData(filters, action) {
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {};const url = process.env.PATH + '/api/cashoptimization/authority/searchPers';
    const dataValue = filters.type.value === 'id'
        ? { persCode: filters.value ? filters.value : 0 }
        : (filters.type.value === 'name')
            ? { persFullname: filters.value ? filters.value : null }
            : { persCmndCccd: filters.value ? filters.value : null };
    const postData = {
        data: {
            ...dataValue,
            sort: sort,
            page: page,
            size: +(process.env.NUMBER_ITEMS_PER_PAGE || 0),
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

export default saga;