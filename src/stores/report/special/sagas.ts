import axios from '~utils/axios';
import { select, all, call, put, take, takeLatest, spawn, takeEvery, delay } from 'redux-saga/effects';
import { SELECT_COMBOX_FILTER, REQUEST_QUERY, FETCH_PERS, UPDATE_PERS, UPDATE_DATA, FETCH_ORGS_CHILDREN, UPDATE_ORGS_CHILDREN, EXPORT_EXCEL } from './constants';
import Config from '@config';
import { _Date, getCurrentDate } from '@utils';
import _ from 'lodash';
import { addNoti } from '../../_base/sagas';
import { HANDLE_BUTTON } from '../../_base/constants';
import FileSaver from 'file-saver';

function* saga() {
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
    yield takeLatest(FETCH_ORGS_CHILDREN, fetchOrgsChildrenSaga);
    yield takeLatest(EXPORT_EXCEL, exportExcelSaga);
}

function* fetchDataSaga(action?) {
    const state = yield select();
    const responseData = yield call(getData, state.reportSpecial.filters, action);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    if (!responseData.data?.data) {
        yield spawn(addNoti, 'error', 'Không tìm thấy kết quả');
    }

    yield put({ type: UPDATE_DATA, data: responseData.data, sort: action?.sort, page: action?.page });
}

function getData(filters, action) {
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {};
    const url = Config.url + '/api/cashoptimization/report/reportHDB';
    const orgsSearch = filters.orgsValue ? {
        searchType: filters.orgsType?.value,
        searchValue: filters.orgsValue,
    } : null;
    const postData = {
        data: {
            fromDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateFrom) + ' 00:00:00',
            toDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateTo) + ' 23:59:59.00',
            orgCodeList: filters.orgCodeList?.map(item => item.value).join(',') ?? '',
            ...orgsSearch,
            sort: sort,
            page: page,
            size: Config.numberOfItemsPerPage,
        },
    }
    return axios.post(url, postData)
        .catch(error => console.log(error));
}

function* fetchOrgsChildrenSaga(action?) {
    const state = yield select();
    const url = Config.url + '/api/cashoptimization/findChildOrgsByCode';
    const postData = {
        data: {
            orgs_code: state.auth.user.orgsCode,
        }
    }
    const responseData = yield axios.post(url, postData)
        .catch(error => console.log(error));

    yield put({ type: UPDATE_ORGS_CHILDREN, data: responseData.data, user: state.auth.user });
}
function* exportExcelSaga(action?) {
    const state = yield select();
    const filters = state.reportSpecial.filters;
    const {
        page = 0,
        sort = filters.sort ?? '',
    } = action ?? {};
    const url = Config.url + '/api/cashoptimization/report/reportHDBExcel';
    const orgsSearch = filters.orgsValue ? {
        searchType: filters.orgsType?.value,
        searchValue: filters.orgsValue,
    } : null;
    const postData = {
        data: {
            fromDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateFrom) + ' 00:00:00',
            toDate: _Date.convertDateTimeDDMMYYYtoYYYYMMDD(filters.dateTo) + ' 23:59:59.00',
            orgCodeList: filters.orgCodeList?.map(item => item.value).join(',') ?? '',
            ...orgsSearch,
            sort: sort,
            page: page,
            size: Config.numberOfItemsPerPage,
        },
    }

    return axios.post(url, postData, { responseType: 'arraybuffer' })
        .then((response) => {
            var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            FileSaver.saveAs(blob, 'Báo cáo sổ theo dõi vận chuyển hàng đặc biệt.xlsx');
        });
}

export default saga;