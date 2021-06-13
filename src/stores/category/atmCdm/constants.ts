const root = 'atmCdm_'
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
export const SELECT_UNITNAME = root + 'select_unitname';
export const SELECT_ATMCDMSTATUS = root + 'select_atmcdmstatus';
export const REQUEST_RESET = root + 'request_reset';
export const CHANGE_CREATING_INPUT = root + 'change_creating_input';
export const CHANGE_EDITING_INPUT = root + 'change_editing_input';
export const SELECT_ORGS_CODE_CREATING = root + 'select_orgs_code_creating';
export const SELECT_ORGS_CODE_EDITING = root + 'select_orgs_code_editing';
export const SELECT_ATMCDM_STATUS_CREATING = root + 'select_atmcdm_status_creating';
export const SELECT_ATMCDM_STATUS_EDITING = root + 'select_atmcdm_status_edtiting';
export const SELECT_ROW = root + 'select_row';


export type State = {
    history: any,
    filters: {
        orgs: {
            text: string,
            value: string,
        },
        atmCdmStatus: {
            text: string,
            value: string,
        },
        queryButton:{
            isLoading: boolean,
        }
    },
    editingButton:{
        isDisabled: boolean,
    },
    selectedItem:any,
    creatingPopup:{
        isShown: boolean,
        atmCdmCode?: number,
        atmCdmName?: string,
        atmCdmType?: string,
        atmAddress?: string,
        // atmStatus?: string,
        orgsSelected:{
            text: string,
            value: string,
        }
        atmCdmSelected:{
            text: string,
            value: string,
        }
    },
    editingPopup:{
        isShown: boolean,
        orgsSelected:{
            text: string,
            value: string,
        }
        atmCdmSelected:{
            text: string,
            value: string,
        }
    },
    historyPopup:{
        isShown: boolean,
    },
    queryResult: any,
}


