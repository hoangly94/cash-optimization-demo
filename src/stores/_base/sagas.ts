import axios from '~utils/axios';
import { all, call, delay, put, spawn, takeEvery } from 'redux-saga/effects';
import { ADD_NOTI, ADD_NOTI_ERROR, ADD_NOTI_SUCCESS, REMOVE_LAST_NOTI } from './constants';

function* saga() {
    yield takeEvery(ADD_NOTI, addNotiDirect);
}

export function* addNoti(type, message?: string) {
    if (type == 'success') {
        yield spawn(removeLastNoti);
        return yield put({ type: ADD_NOTI_SUCCESS, data: message });
    }
    if (type == 'error') {
        yield spawn(removeLastNoti);
        yield put({ type: ADD_NOTI_ERROR, data: message });
    }
}

export function* addNotiDirect(data) {
    const {
        type,
        message,
    } = data.noti;
    if (type == 'success') {
        yield spawn(removeLastNoti);
        return yield put({ type: ADD_NOTI_SUCCESS, data: message });
    }
    if (type == 'error') {
        yield spawn(removeLastNoti);
        yield put({ type: ADD_NOTI_ERROR, data: message });
    }
}

function* removeLastNoti() {
    yield delay(1 * 3000)
    yield put({ type: REMOVE_LAST_NOTI });
}
export default saga;