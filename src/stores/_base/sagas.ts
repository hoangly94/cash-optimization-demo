import axios from '~utils/axios';
import { all, call, delay, put, spawn } from 'redux-saga/effects';
import { ADD_NOTI_ERROR, ADD_NOTI_SUCCESS, REMOVE_LAST_NOTI } from './constants';

function* saga() {

}

export function* addNoti(type, message?:string){
    if(type == 'success'){
        yield spawn(removeLastNoti);
        return yield put({ type: ADD_NOTI_SUCCESS, data:message});
    }
    if(type == 'error'){
        yield spawn(removeLastNoti);
        yield put({ type: ADD_NOTI_ERROR, data:message});
    }
}

function* removeLastNoti(){
    yield delay(1 * 3000)
    yield put({ type: REMOVE_LAST_NOTI});
}
export default saga;