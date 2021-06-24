const root = 'registration_'
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
export const INPUT_DATE_FROM = root + 'INPUT_DATE_FROM';
export const INPUT_DATE_TO = root + 'INPUT_DATE_TO';
export const INPUT_DATE_FROM_CREATING = root + 'INPUT_DATE_FROM_CREATING';
export const INPUT_DATE_TO_CREATING = root + 'INPUT_DATE_TO_CREATING';
export const INPUT_DATE_FROM_EDITING = root + 'INPUT_DATE_FROM_EDITING';
export const INPUT_DATE_TO_EDITING = root + 'INPUT_DATE_TO_EDITING';
export const SEARCH_PERS = root + 'SEARCH_PERS';
export const SELECT_AUTHORITY_CONTENT_ROW = root + 'SELECT_AUTHORITY_CONTENT_ROW';
export const SET_POPUP_TYPE = root + 'SET_POPUP_TYPE';

export const HANDLE_DUALTABLE_MOVE = 'HANDLE_DUALTABLE_MOVE';
export const HANDLE_APPROVE_ACTION = root + 'HANDLE_APPROVE_ACTION';
export const HANDLE_REJECT_ACTION = root + 'HANDLE_REJECT_ACTION';

export const HANDLE_DELETE_ACTION = root + 'HANDLE_DELETE_ACTION';

export const RESET_FILTER_REGISTRATION = root + 'RESET_FILTER_REGISTRATION';
export const RESET_FILTER_APPROVAL = root + 'RESET_FILTER_APPROVAL';

export const HANDLE_CONTINUE_ACTION = root + 'HANDLE_CONTINUE_ACTION';


export type State = {
    history: any,
    filters: {
        radio: string,
        dateFrom:string,
        dateTo:string,
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

    searchPersType:number,
    popupType:number,
    
    selectedItem: any,
    creatingPopup: {
        isShown: boolean,

        orgsId:string,
        orgsName:string,

        dateFrom:string,
        dateTo:string,

        sendId: string,
        sendCode: string,
        sendName: string,
        sendCmnd: string,
        sendTitle: string,

        recvId: string,
        recvCode: string,
        recvName: string,
        recvCmnd: string,
        recvCmndyear: string,
        recvCmndPlace: string,
        recvTitle: string,
        recvPhone: string,

        authorityContent1: any,
        authorityContent2: any,

        authorityStatus: string,
        
        rejectReason: string,

        updatedbyCode:string,
        updatedbyName:string,
    },
    editingPopup: {
        isShown: boolean,
        dateFrom:string,
        dateTo:string,

        sendId: string,
        sendName: string,
        sendCmnd: string,
        sendTitle: string,

        recvId: string,
        recvName: string,
        recvTitle: string,
        recvCmnd: string,
        recvCmndyear: string,
        recvCmndPlace: string,
        recvPhone: string,

        authorityStatus: string,

        authorityContent1: any,
        authorityContent2: any,
        
        rejectReason: string,

        createdbyName:string,

        updatedbyCode:string,
        updatedbyName:string,
        updateddate:string,
    },
    historyPopup: {
        isShown: boolean,
    },
    queryResult: any,
    authorityContents:any,
}


