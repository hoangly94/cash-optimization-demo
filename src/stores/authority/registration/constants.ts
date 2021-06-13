const root = 'register_'
export const FETCH_HISTORY = root + 'FETCH_HISTORY';
export const UPDATE_HISTORY = root + 'UPDATE_HISTORY';
export const REQUEST_CREATING = root + 'REQUEST_CREATING';
export const REQUEST_CREATING_CANCEL = root + 'REQUEST_CREATING_CANCEL';
export const DONE_CREATING = root + 'DONE_CREATING';
export const REQUEST_EDITING = root + 'REQUEST_EDITING';
export const REQUEST_EDITING_CANCEL = root + 'REQUEST_EDITING_CANCEL';
export const FETCH_DATA = root + 'FETCH_DATA';
export const REQUEST_QUERY = root + 'REQUEST_QUERY';
export const UPDATE_DATA = root + 'UPDATE_DATA';
export const SELECT_ORGS_FILTER = root + 'SELECT_ORGS_FILTER';
export const SELECT_NHNNTCTD_TYPE = root + 'SELECT_NHNNTCTD_TYPE';
export const REQUEST_RESET = root + 'REQUEST_RESET';
export const CHANGE_CREATING_INPUT = root + 'CHANGE_CREATING_INPUT';
export const CHANGE_EDITING_INPUT = root + 'CHANGE_EDITING_INPUT';
export const CHANGE_CODE_FILTER = root + 'CHANGE_CODE_FILTER';
export const SELECT_REGION_CREATING = root + 'SELECT_REGION_CREATING';
export const SELECT_REGION_EDITING = root + 'SELECT_REGION_EDITING';
export const SELECT_ROW = root + 'SELECT_ROW';
export const CHANGE_RADIO_FILTER = root + 'CHANGE_RADIO_FILTER';
export const SELECT_STATUS_FILTER = root + 'SELECT_STATUS_FILTER';

export type State = {
    history: any,
    filters: {
        radio: string,
        date:{
            from: string,
            to: string,
            type: string,
        },
        orgs: {
            text: string,
            value: string,
        },
        status: {
            text: string,
            value: string,
        },
        id: string,
        queryButton: {
            isLoading: boolean,
        }
    },
    editingButton: {
        isDisabled: boolean,
    },
    selectedItem: any,

    creatingPopup: {
        isShown: boolean,
        areaCode?: number,
        areaName?: string,
        regionSelected:{
            text: string,
            value: string,
        }
    },
    editingPopup: {
        isShown: boolean,
        regionSelected:{
            text: string,
            value: string,
        },
    },
    historyPopup: {
        isShown: boolean,
    },
    queryResult: any,
}


