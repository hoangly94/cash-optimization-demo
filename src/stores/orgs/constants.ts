const root = 'orgs';

export const FETCH_HISTORY = root+'FETCH_HISTORY';
export const UPDATE_HISTORY = root+'UPDATE_HISTORY';
export const REQUEST_CREATING = root+'request_creating';
export const REQUEST_CREATING_CANCEL = root+'request_creating_cancel';
export const DONE_CREATING = root+'done_creating';
export const REQUEST_EDITING = root+'request_editing';
export const REQUEST_EDITING_CANCEL = root+'request_editing_cancel';
export const FETCH_DATA = root+'fetch_data';
export const REQUEST_QUERY = root+'request_query';
export const UPDATE_DATA = root+'update_data';
export const SELECT_AREA_FILTER = root+'select_area_filter';
export const SELECT_ATMCDMSTATUS = root+'select_atmcdmstatus';
export const REQUEST_RESET = root+'request_reset';
export const CHANGE_CREATING_INPUT = root+'change_creating_input';
export const CHANGE_EDITING_INPUT = root+'change_editing_input';
export const SELECT_AREA_CREATING = root+'select_area_creating';
export const SELECT_AREA_EDITING = root+'select_area_editing';
export const SELECT_ORGS_PARENT_CREATING = root+'select_orgs_parent_creating';
export const SELECT_ORGS_PARENT_EDITING = root+'select_orgs_parent_edtiting';
export const SELECT_ROW = root+'select_row';
export const CHANGE_ORGS_CODE_FILTER = root+'change_orgs_code_filter';

export type State = {
    history:[],
    filters: {
        orgsCode: number,
        area: {
            text: string,
            value: number,
        },
        queryButton:{
            isLoading: boolean,
        }
    },
    selectedItem:any,
    creatingPopup:{
        isShown: boolean,
        orgsCode?: number,
        orgsName?: string,
        orgsAddress?: string,
        // atmStatus?: string,
        areaSelected:{
            text: string,
            value: string,
        }
        orgsParentSelected:{
            text: string,
            value: string,
        },
        dvqlKc?: string,
    },
    editingPopup:{
        isShown: boolean,
        areaSelected:{
            text: string,
            value: string,
        }
        orgsParentSelected:{
            text: string,
            value: string,
        }
    },
    historyPopup:{
        isShown: boolean,
    },
    queryResult: any,
}


