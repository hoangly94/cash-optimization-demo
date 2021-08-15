const root = 'BASE_';

export const HANDLE_BUTTON = root + 'HANDLE_BUTTON';
export const HANDLE_POPUP = 'HANDLE_POPUP';
export const ADD_NOTI = root + 'ADD_NOTI';
export const ADD_NOTI_ERROR = root + 'ADD_NOTI_ERROR';
export const ADD_NOTI_SUCCESS = root + 'ADD_NOTI_SUCCESS';
export const ADD_NOTI_WARNING = root + 'ADD_NOTI_WARNING';
export const REMOVE_LAST_NOTI = root + 'REMOVE_LAST_NOTI';
export const REQUEST_NEW_BREACURMBS = root + 'REQUEST_NEW_BREACURMBS';

export type State = {
    buttons: {},
    popups: {},
    notis: [],
    breadcrumbs: [],
}


