const root = 'auth_'
export const CHANGE_LOGIN_INPUT = root + 'CHANGE_LOGIN_INPUT';
export const CHANGE_REGISTER_INPUT = root + 'CHANGE_REGISTER_INPUT';
export const CHANGE_CHANGE_PASS_INPUT = root + 'CHANGE_CHANGE_PASS_INPUT';
export const CHANGE_FORGOT_INPUT = root + 'CHANGE_FORGOT_INPUT';
export const CHANGE_ASSIGN_ROLE_INPUT = root + 'CHANGE_ASSIGN_ROLE_INPUT';

export const FETCH_ROLES = root + 'FETCH_ROLES';
export const UPDATE_ROLES = root + 'UPDATE_ROLES';

export const FETCH_USER = root + 'FETCH_USER';
export const UPDATE_USER = root + 'UPDATE_USER';
export const UPDATE_USER2 = root + 'UPDATE_USER2';
export const UPDATE_USER_ROLE = root + 'UPDATE_USER_ROLE';

export const UPDATE_ASSIGN_ROLE = root + 'UPDATE_ASSIGN_ROLE';

export const REQUEST_LOGIN = root + 'REQUEST_LOGIN';
export const UPDATE_LOGIN = root + 'UPDATE_LOGIN';

export const REQUEST_REGISTER = root + 'REQUEST_REGISTER';
export const REQUEST_FORGOT = root + 'REQUEST_FORGOT';
export const REQUEST_CHANGE_PASSWORD = root + 'REQUEST_CHANGE_PASSWORD';

export const REQUEST_RESET_PASSWORD = root + 'REQUEST_RESET_PASSWORD';
export const SELECT_ROLE_CONTENT_ROW = root + 'SELECT_ROLE_CONTENT_ROW';

export const REQUEST_ASSIGN_ROLE_QUERY = root + 'REQUEST_ASSIGN_ROLE_QUERY';
export const REQUEST_ASSIGN_ROLE = root + 'REQUEST_ASSIGN_ROLE';

export const HANDLE_DUALTABLE_MOVE = 'HANDLE_DUALTABLE_MOVE';

export type State = {
    roles: any[],
    user: {
        accessToken: string,
        csrfToken: string,
        id: string,
        code: string,
        username: string,
        persid: string,
        persCode: string,
        email: string,
        phone: string,
        fullname: string,
        orgsId: string,
        orgsCode: string,
        orgsName: string,
        authorities: string[],
        active: boolean,
        userRole: Object,
    },
    isAuthenticated: boolean,
    login: {
        loginType: string,
        username: string,
        password: string,
    },
    register: {
        username: string,
        password: string,
        rePassword: string,
    },
    forgot: {
        username: string,
    },
    changePassword: {
        currentPassword: string,
        newPassword: string,
        reNewPassword: string,
    },
    assignRole: {
        filters: {
            username: string,
        },
        id: string,
        username: string,
        roleContent1: any[],
        roleContent2: any[],
    },
}


