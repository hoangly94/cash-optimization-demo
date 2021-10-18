const root = 'nhnnTctd_'
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
export const SELECT_ORGS_CODE_CREATING = root + 'SELECT_ORGS_CODE_CREATING';
export const SELECT_ORGS_CODE_EDITING = root + 'SELECT_ORGS_CODE_EDITING';
export const SELECT_NHNNTCTD_TYPE_CREATING = root + 'SELECT_NHNNTCTD_TYPE_CREATING';
export const SELECT_NHNNTCTD_TYPE_EDITING = root + 'SELECT_NHNNTCTD_TYPE_EDITING';
export const CHANGE_TYPE_FILTER = root + 'CHANGE_TYPE_FILTER';
export const SELECT_ROW = root + 'SELECT_ROW';
export const SELECT_HISTORY_ROW = root + 'SELECT_HISTORY_ROW';
export const FETCH_HISTORY_DETAIL = root + 'FETCH_HISTORY_DETAIL';
export const UPDATE_HISTORY_DETAIL = root + 'UPDATE_HISTORY_DETAIL';
export const FETCH_MAP = root + 'FETCH_MAP';
export const UPDATE_MAP = root + 'UPDATE_MAP';

export type State = {
    history: any,
    detailPopup: any,
    filters: {
        orgsId: {
            text: string,
            value: string,
        },
        nnhnTctdCode: string,
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
        nnhnTctdCode?: number,
        nnhnTctdName?: string,
        nnhnTctdAddress?: string,
        nnhnTctdTypeSelected: {
            text: string,
            value: string,
        }
        orgsSelected: {
            text: string,
            value: string,
        }
    },
    editingPopup: {
        isShown: boolean,
        nnhnTctdTypeSelected: {
            text: string,
            value: string,
        }
        orgsSelected: {
            text: string,
            value: string,
        }
    },
    historyPopup: {
        isShown: boolean,
    },
    queryResult: any,
}


