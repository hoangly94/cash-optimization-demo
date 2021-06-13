const root = 'title_'
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
export const SELECT_ROW = root + 'SELECT_ROW';

export type State = {
    history: any,
    filters: {
        titleCode: string,
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
        persCode?: number,
        titleName?: string,
    },
    editingPopup: {
        isShown: boolean,
    },
    historyPopup: {
        isShown: boolean,
    },
    queryResult: any,
}


