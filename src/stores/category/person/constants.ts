const root = 'person_'
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
export const SELECT_TITLE_CREATING = root + 'SELECT_TITLE_CREATING';
export const SELECT_TITLE_EDITING = root + 'SELECT_TITLE_EDITING';
export const SELECT_STATUS_CREATING = root + 'SELECT_STATUS_CREATING';
export const SELECT_STATUS_EDITING = root + 'SELECT_STATUS_EDITING';
export const CHANGE_CODE_FILTER = root + 'CHANGE_CODE_FILTER';
export const SELECT_ROW = root + 'SELECT_ROW';

export type State = {
    history: any,
    filters: {
        orgsId: {
            text: string,
            value: string,
        },
        persCode: string,
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
        persFullname?: string,
        persTitleSelected: {
            text: string,
            value: string,
        }
        persMobile?: string,
        persCmndCccd?: string,
        persCmndCccdYear?: string,
        persCmndCccdPlace?: string,
        orgsSelected: {
            text: string,
            value: string,
        }
        persEmail?: string,
        persStatusSelected: {
            text: string,
            value: string,
        }
    },
    editingPopup: {
        isShown: boolean,
        persTitleSelected: {
            text: string,
            value: string,
        }
        orgsSelected: {
            text: string,
            value: string,
        }
        persStatusSelected: {
            text: string,
            value: string,
        }
    },
    historyPopup: {
        isShown: boolean,
    },
    queryResult: any,
}


