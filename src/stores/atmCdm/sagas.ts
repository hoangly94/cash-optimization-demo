import axios from 'axios';
import { select, all, call, put, take, takeLatest } from 'redux-saga/effects';
import { FETCH_DATA, REQUEST_QUERY, SHOW_DATA } from './constants';
import * as Base from '~/_settings';


function getData(url: string, postData) {
    return axios.get(url)
        .catch(error => console.log(error));
}

function* fetchDataSaga() {
    yield put({ type: FETCH_DATA });

    const state = yield select();
    console.log(state)

    // const data = yield call(getData, 'https://your-server.com/get-data', filters);
    const data = yield testData();

    yield put({ type: SHOW_DATA, queryResult: data });
}

function* saga() {
    yield takeLatest(REQUEST_QUERY, fetchDataSaga);
}

export default saga;



const tableData_$rows_$cells_title = {
    whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}
function testData() {
    return {
        $cells: [
            {
                children: 'bbbb1',
            },
            {
                children: 'bbbb2',
            },
            {
                children: 'bbbb3qwe',
            }
        ],
    }
}