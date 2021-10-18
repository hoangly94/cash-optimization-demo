const root = 'orgs';

export const FETCH_HISTORY = root + 'FETCH_HISTORY';
export const UPDATE_HISTORY = root + 'UPDATE_HISTORY';
export const REQUEST_CREATING = root + 'request_creating';
export const REQUEST_CREATING_CANCEL = root + 'request_creating_cancel';
export const DONE_CREATING = root + 'done_creating';
export const REQUEST_EDITING = root + 'request_editing';
export const REQUEST_EDITING_CANCEL = root + 'request_editing_cancel';
export const FETCH_DATA = root + 'fetch_data';
export const REQUEST_QUERY = root + 'request_query';
export const UPDATE_DATA = root + 'update_data';
export const SELECT_AREA_FILTER = root + 'select_area_filter';
export const SELECT_ATMCDMSTATUS = root + 'select_atmcdmstatus';
export const REQUEST_RESET = root + 'request_reset';
export const CHANGE_CREATING_INPUT = root + 'change_creating_input';
export const CHANGE_EDITING_INPUT = root + 'change_editing_input';
export const SELECT_AREA_CREATING = root + 'select_area_creating';
export const SELECT_AREA_EDITING = root + 'select_area_editing';
export const SELECT_ORGS_PARENT_CREATING = root + 'select_orgs_parent_creating';
export const SELECT_ORGS_PARENT_EDITING = root + 'select_orgs_parent_edtiting';
export const SELECT_ROW = root + 'SELECT_ROW';
export const SELECT_HISTORY_ROW = root + 'SELECT_HISTORY_ROW';
export const FETCH_HISTORY_DETAIL = root + 'FETCH_HISTORY_DETAIL';
export const UPDATE_HISTORY_DETAIL = root + 'UPDATE_HISTORY_DETAIL';
export const CHANGE_ORGS_CODE_FILTER = root + 'CHANGE_ORGS_CODE_FILTER';
export const SEARCHORGS_SELECT_UPDATE = root + 'SEARCHORGS_SELECT_UPDATE';
export const FETCH_MAP = root + 'FETCH_MAP';
export const UPDATE_MAP = root + 'UPDATE_MAP';

export type State = {
    history: any,
    detailPopup: any,
    filters: {
        orgsCode: string,
        area: {
            text: string,
            value: number,
        },
        queryButton: {
            isLoading: boolean,
        }
    },
    selectedItem: any,
    editingButton: {
        isDisabled: boolean,
    },
    creatingPopup: {
        isShown: boolean,
        orgsCode?: string,
        orgsName?: string,
        orgsAddress?: string,
        // atmStatus?: string,
        areaSelected: {
            text: string,
            value: string,
        }
        orgsParentSelected: {
            text: string,
            value: string,
        },
        dvqlKc?: string,
    },
    editingPopup: {
        isShown: boolean,
        areaSelected: {
            text: string,
            value: string,
        }
        orgsParentSelected: {
            text: string,
            value: string,
        }
    },
    historyPopup: {
        isShown: boolean,
    },
    queryResult: any,
}


