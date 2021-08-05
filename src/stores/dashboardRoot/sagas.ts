import axios from '~utils/axios';
import Axios from 'axios';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { FETCH_CONFIG, UPDATE_CONFIG, FETCH_AREAS, FETCH_ORGS, UPDATE_AREAS, UPDATE_ORGS, FETCH_FUNCTIONS, FETCH_PERS, UPDATE_PERS, UPDATE_FUNCTIONS, FETCH_REGIONS, UPDATE_REGIONS, UPDATE_TITLES, FETCH_TITLES, FETCH_CURRENCIES, FETCH_PRIORITIES, UPDATE_CURRENCIES, UPDATE_PRIORITIES, FETCH_ATMCDMS, FETCH_NHNNTCTDS, UPDATE_ATMCDMS, UPDATE_NHNNTCTDS, REPORT_PRINT } from './constants';
import Config from '@config';
import FileSaver from 'file-saver';

function* saga() {
    yield all([
        takeEvery(FETCH_CONFIG, fetchConfig),
        takeEvery(FETCH_AREAS, fetchAreas),
        takeEvery(FETCH_ORGS, fetchOrgs),
        takeEvery(FETCH_ATMCDMS, fetchAtmCdms),
        takeEvery(FETCH_NHNNTCTDS, fetchNhnnTctds),
        takeEvery(FETCH_FUNCTIONS, fetchFunctions),
        takeEvery(FETCH_PERS, fetchPers),
        takeEvery(FETCH_TITLES, fetchTitle),
        takeEvery(FETCH_REGIONS, fetchRegion),
        takeEvery(FETCH_CURRENCIES, fetchCurrencies),
        takeEvery(FETCH_PRIORITIES, fetchPriorities),
        takeEvery(REPORT_PRINT, reportPrintSaga),
    ]);
}

function* fetchConfig() {
    const path = '/api/cashoptimization/findConfig';
    const postData = {
        size: 0,
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_CONFIG, data: responseData?.data?.data });
}


function* fetchAreas() {
    const path = '/api/cashoptimization/findCategoryArea';
    const postData = {
        data: {
            areaCode: 0,
            size: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_AREAS, data: responseData?.data?.data });
}

function* fetchOrgs() {
    const path = '/api/cashoptimization/findCategoryOrgs';
    const postData = {
        data: {
            areaCode: 0,
            orgsCode: 0,
            size: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_ORGS, data: responseData?.data?.data });
}

function* fetchAtmCdms() {
    const path = '/api/cashoptimization/findCategoryATMCDM';
    const postData = {
        data: {
            orgsId: 0,
            size: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_ATMCDMS, data: responseData?.data?.data });
}


function* fetchNhnnTctds() {
    const path = '/api/cashoptimization/findCategoryNHNNTCTD';
    const postData = {
        data: {
            nnhnTctdCode: 0,
            orgsId: 0,
            size: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_NHNNTCTDS, data: responseData?.data?.data });
}

function* fetchFunctions() {
    const path = '/api/cashoptimization/findCategoryFunction';
    const postData = {
        data: {
            functionCode: 0,
            size: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_FUNCTIONS, data: responseData?.data?.data });
}

function* fetchPers() {
    const path = '/api/cashoptimization/findCategoryPers';
    const postData = {
        data: {
            persCode: 0,
            orgsId: 0,
            size: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_PERS, data: responseData?.data?.data });
}

function* fetchTitle() {
    const path = '/api/cashoptimization/findCategoryTitle';
    const postData = {
        data: {
            atmStatus: '',
            orgsId: 0,
            size: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_TITLES, data: responseData?.data?.data });
}

function* fetchRegion() {
    const path = '/api/cashoptimization/findCategoryRegion';
    const postData = {
        data: {
            atmStatus: '',
            orgsId: 0,
            size: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_REGIONS, data: responseData?.data?.data });
}


function* fetchCurrencies() {
    const path = '/api/cashoptimization/findCategoryCurrency';
    const postData = {
        data: {
            size: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_CURRENCIES, data: responseData?.data?.data });
}
function* fetchPriorities() {
    const path = '/api/cashoptimization/findCategoryPriorityLevel';
    const postData = {
        data: {
            size: 0,
        },
    }
    const responseData = yield call(callApi, path, postData);
    yield put({ type: UPDATE_PRIORITIES, data: responseData?.data?.data });
}

const callApi = (path, postData?) => {
    return axios.post(Config.url + path, postData)
        .catch(error => console.log(error));
}


function* reportPrintSaga(action?) {
    const state = yield select();
        const data = action?.reportName === 'authority' ?
        state.registration.selectedItem : state.pycRegistration.selectedItem;
    const fileName = action?.reportName === 'authority' ?
        'Giay_YC_DieuQuy' : 'Lenh_DC_HDB';
    yield call(reportPrint, data, fileName, action?.reportName, action?.form);
}

function reportPrint(data, fileName, reportName, form) {
    const postData = {
        data: {
            id: data.id,
            reportName,
            form,
            type: "pdf",
        }
    }
    return Axios.post(Config.url + '/api/cashoptimization/report/print', postData, { responseType: 'arraybuffer' })
        .then((response) => {
            var blob = new Blob([response.data], { type: 'application/pdf' });
            FileSaver.saveAs(blob, fileName+'.pdf');
        });
}

export default saga;