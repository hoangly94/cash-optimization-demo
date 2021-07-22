import { select, call, put, takeLatest, spawn } from 'redux-saga/effects';
import { FETCH_ROLES, FETCH_USER, REQUEST_ASSIGN_ROLE, REQUEST_ASSIGN_ROLE_QUERY, REQUEST_CHANGE_PASSWORD, REQUEST_LOGIN, REQUEST_REGISTER, REQUEST_RESET_PASSWORD, UPDATE_ASSIGN_ROLE, UPDATE_LOGIN, UPDATE_ROLES, UPDATE_USER, UPDATE_USER_ROLE } from './constants';
import { addNoti } from '~stores/_base/sagas';
import Config from '@config';
// import axios from '~utils/axios';
import axios from '~utils/axios';
import { push } from 'react-router-redux';
import { useCooke } from '@hooks';

function* saga() {
    yield takeLatest(FETCH_ROLES, fetchRolesSaga);
    yield takeLatest(FETCH_USER, fetchUserSaga);
    yield takeLatest(REQUEST_LOGIN, loginSaga);
    yield takeLatest(REQUEST_REGISTER, registerSaga);
    yield takeLatest(REQUEST_CHANGE_PASSWORD, changePasswordSaga);
    yield takeLatest(REQUEST_RESET_PASSWORD, resetPasswordSaga);
    yield takeLatest(REQUEST_ASSIGN_ROLE_QUERY, queryAssignRoleSaga);
    yield takeLatest(REQUEST_ASSIGN_ROLE, requestAssignRoleSaga);
}

function* fetchRolesSaga() {
    const responseData = yield call(getUser, Config.url + '/api/cashoptimization/role/getAllRole');
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return;
    }
    yield put({ type: UPDATE_ROLES, data: responseData.data.data });
}

function* fetchUserSaga() {
    // yield put({ type: FETCH_USER });
    const responseData = yield call(getUser, Config.url + '/api/cashoptimization/user/getInfoAccount');
    // console.log(responseData);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        // return yield spawn(addNoti, 'error', responseData?.data?.message);
        return ;
    }
    yield put({ type: UPDATE_USER, data: responseData.data.data });

    // const state = yield select();
    // const responseData2 = yield call(getUser2, Config.url + '/api/cashoptimization/user/getUserByUsername', state.auth.user);
    // if (!responseData2 || !responseData2.data || responseData2.data.resultCode != 0) {
    //     return yield spawn(addNoti, 'error', responseData2?.data?.message);
    // }
    // yield put({ type: UPDATE_USER, data: responseData2.data.data });

    // const responseData3 = yield call(getUser3, Config.url + '/api/cashoptimization/role/getRoleById', state.auth.user);
    // if (!responseData3 || !responseData3.data || responseData3.data.resultCode != 0) {
    //     return yield spawn(addNoti, 'error', responseData3?.data?.message);
    // }
    // yield put({ type: UPDATE_USER_ROLE, data: responseData3.data.data });
}

function* queryAssignRoleSaga() {
    const state = yield select();
    const responseData = yield call(getUser2, Config.url + '/api/cashoptimization/user/getUserByUsername', state.auth.assignRole);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    yield put({ type: UPDATE_ASSIGN_ROLE, data: responseData.data.data });
}

function* requestAssignRoleSaga() {
    const state = yield select();
    const responseData = yield call(requestAssignRole, Config.url + '/api/cashoptimization/user/assignRoles', state.auth.assignRole);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData.data.message);
    }
    yield spawn(addNoti, 'success');
    yield put({ type: FETCH_USER });
}

function* loginSaga() {
    const state = yield select();
    const responseData = yield call(requestLogin, Config.url + '/api/authentication/user/login', state.auth.login);

    const d = new Date();
    d.setTime(d.getTime() + (responseData?.data?.data?.expires_in) || 0);
    const expires = d ? 'expires=' + d.toUTCString() : '';

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        if (responseData?.data?.resultCode == 1) {
            document.cookie = `accessToken=${responseData.data.accessToken};path=/;`;
            yield put({ type: UPDATE_LOGIN, data: responseData.data });
            return yield window.location.href = '/change-password';
        }
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    document.cookie = `accessToken=${responseData.data.data.access_token};${expires};path=/;`;
    yield put({ type: UPDATE_LOGIN, data: responseData.data });
    yield put({ type: FETCH_USER });

    yield window.location.href = '/';
}

function* changePasswordSaga() {
    const state = yield select();
    const responseData = yield call(requestChangePassword, Config.url + '/api/authentication/user/changePassword', state.auth.changePassword);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData.data.message);
    }

    yield put({ type: FETCH_USER });
    yield window.location.href = '/';
}

function* resetPasswordSaga() {
    const state = yield select();
    const responseData = yield call(requestResetPassword, Config.url + '/api/authentication/user/resetPassword', state.auth.forgot);
    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData?.data?.message);
    }
    return yield spawn(addNoti, 'success');
}

function* registerSaga() {
    const state = yield select();
    const responseData = yield call(requestRegister, Config.url + '/api/cashoptimization/user/create', state.auth.register);

    if (!responseData || !responseData.data || responseData.data.resultCode != 0) {
        return yield spawn(addNoti, 'error', responseData.data.message);
    }

    yield window.location.href = '/';
}

function getUser(url) {
    const { cookie: accessToken } = useCooke('accessToken');
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    return axios.post(url, null, config)
        .catch(error => console.log(error));
}

function getUser2(url: string, data) {
    const postData = {
        data: {
            userName: data.filters.username,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function getUser3(url: string, data) {
    const postData = {
        data: {
            id: data.persid,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestLogin(url: string, data) {
    const postData = {
        data: {
            username: data.username,
            password: data.password,
        },
    }
    return axios.post(url, postData);
}

function requestRegister(url: string, data) {
    const postData = {
        data: {
            username: data.username,
            password: data.password,
            email: null,
            phone: null,
            persid: null,
            status: null
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestAssignRole(url: string, data) {
    const postData = {
        data: {
            username: data.username,
            userRole: data.roleContent2.map(item => ({
                userId: data.id,
                roleId: item.id,
            })),
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestChangePassword(url: string, data) {
    const postData = {
        data: {
            oldPassword: data.currentPassword,
            newPassword: data.newPassword,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}

function requestResetPassword(url: string, data) {
    const postData = {
        data: {
            userName: data.username,
        },
    }
    return axios.post(url, { ...postData })
        .catch(error => console.log(error));
}



export default saga;