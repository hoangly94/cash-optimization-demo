export const FETCH_HISTORY = 'FETCH_HISTORY';
export const UPDATE_HISTORY = 'UPDATE_HISTORY';
export const REQUEST_CREATING = 'request_creating';
export const REQUEST_CREATING_CANCEL = 'request_creating_cancel';
export const DONE_CREATING = 'done_creating';
export const REQUEST_EDITING = 'request_editing';
export const REQUEST_EDITING_CANCEL = 'request_editing_cancel';
export const FETCH_DATA = 'fetch_data';
export const REQUEST_QUERY = 'request_query';
export const UPDATE_DATA = 'update_data';
export const SELECT_UNITNAME = 'select_unitname';
export const SELECT_ATMCDMSTATUS = 'select_atmcdmstatus';
export const REQUEST_RESET = 'request_reset';
export const CHANGE_CREATING_INPUT = 'change_creating_input';
export const CHANGE_EDITING_INPUT = 'change_editing_input';
export const SELECT_ORGS_CODE_CREATING = 'select_orgs_code_creating';
export const SELECT_ORGS_CODE_EDITING = 'select_orgs_code_editing';
export const SELECT_ATMCDM_STATUS_CREATING = 'select_atmcdm_status_creating';
export const SELECT_ATMCDM_STATUS_EDITING = 'select_atmcdm_status_edtiting';
export const SELECT_ROW = 'select_row';

export type State = {
    history: any,
    filters: {
        managementUnitName: {
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
    selectedItem:any,
    creatingPopup:{
        isShown: boolean,
        atmCdmCode?: number,
        atmCdmName?: string,
        atmCdmType?: string,
        atmAddress?: string,
        // atmStatus?: string,
        orgsCodeSelected:{
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
        orgsCodeSelected:{
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


