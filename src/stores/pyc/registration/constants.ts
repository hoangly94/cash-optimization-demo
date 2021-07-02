const root = 'pycRegistration_'
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

export const HANDLE_DUALTABLE_MOVE = root + 'HANDLE_DUALTABLE_MOVE';
export const HANDLE_APPROVE_ACTION = root + 'HANDLE_APPROVE_ACTION';
export const HANDLE_REJECT_ACTION = root + 'HANDLE_REJECT_ACTION';

export const HANDLE_DELETE_ACTION = root + 'HANDLE_DELETE_ACTION';

export const RESET_FILTER_REGISTRATION = root + 'RESET_FILTER_REGISTRATION';
export const RESET_FILTER_APPROVAL = root + 'RESET_FILTER_APPROVAL';

export const HANDLE_CONTINUE_ACTION = root + 'HANDLE_CONTINUE_ACTION';

export const SELECT_COMBOX_FILTER = root + 'SELECT_COMBOX_FILTER';
export const SELECT_COMBOX = root + 'SELECT_COMBOX';

export const HANDLE_SPECIAL_DELETE = root + 'HANDLE_SPECIAL_DELETE';
export const HANDLE_SPECIAL_ADD = root + 'HANDLE_SPECIAL_ADD';
export const SELECT_SPECIAL_ROW = root + 'SELECT_SPECIAL_ROW';

export const UPDATE_SPECIAL_DATA = root + 'UPDATE_SPECIAL_DATA';

export const HANDLE_ORGSSEARCHING_UPDATE = root + 'HANDLE_ORGSSEARCHING_UPDATE';
export const HANDLE_ORGSSEARCHING_CONTINUE = root + 'HANDLE_ORGSSEARCHING_CONTINUE';

export const HANDLE_VALIDATE_APPROVE1 = root + 'HANDLE_VALIDATE_APPROVE1';
export const HANDLE_VALIDATE_APPROVE2 = root + 'HANDLE_VALIDATE_APPROVE2';
export const HANDLE_VALIDATE_APPROVE3 = root + 'HANDLE_VALIDATE_APPROVE3';
export const HANDLE_VALIDATE_REJECT1 = root + 'HANDLE_VALIDATE_REJECT1';
export const HANDLE_VALIDATE_REJECT2 = root + 'HANDLE_VALIDATE_REJECT2';
export const HANDLE_VALIDATE_REJECT3 = root + 'HANDLE_VALIDATE_REJECT3';

// export const HANDLE_VALIDATE_CANCEL_APPROVE1 = root + 'HANDLE_VALIDATE_CANCEL_APPROVE1';
// export const HANDLE_VALIDATE_CANCEL_APPROVE2 = root + 'HANDLE_VALIDATE_CANCEL_APPROVE2';
// export const HANDLE_VALIDATE_CANCEL_APPROVE3 = root + 'HANDLE_VALIDATE_CANCEL_APPROVE3';
// export const HANDLE_VALIDATE_CANCEL_REJECT1 = root + 'HANDLE_VALIDATE_CANCEL_REJECT1';
// export const HANDLE_VALIDATE_CANCEL_REJECT2 = root + 'HANDLE_VALIDATE_CANCEL_REJECT2';
// export const HANDLE_VALIDATE_CANCEL_REJECT3 = root + 'HANDLE_VALIDATE_CANCEL_REJECT3';

export type State = {
    history: any,

    filters: {
        radio: string,
        dateFrom: string,
        dateTo: string,
        orgsRole: {
            text: string,
            value: string,
        },
        orgs: {
            text: string,
            value: string,
        },
        objectType: {
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

    searchPersType: number,
    popupType: number,

    selectedItem: any,
    creatingPopup: {
        isShown: boolean,
        orgsRequestId: string,
        orgsCode: string,
        orgsName: string,
        orgsHolderCode: string,
        orgsHolderName: string,
        orgsHolderMobile: string,
        objectType: {
            text: string,
            value: string,
        },
        type: {
            text: string,
            value: string,
        },
        currencyType: {
            text: string,
            value: string,
        },
        goldType: {
            text: string,
            value: string,
        },
        quanlity: string,
        attribute: {
            text: string,
            value: string,
        },
        cashOptimizatioDetailModelList: {
            type: string,
            currencyType: string,
            goldType: string,
            quanlity: string,
            attribute: string,
        }[],
        priorityLevelCode: {
            text: string,
            value: string,
        },
        model: {
            text: string,
            value: string,
        },
        placeReceive: {
            text: string,
            value: string,
        },
        isDisabledGoldTypes: boolean,
    },
    editingPopup: {
        isShown: boolean,

        orgsRequestId: string,
        orgsCode: string,
        orgsName: string,
        orgsHolderCode: string,
        orgsHolderName: string,
        orgsHolderMobile: string,
        objectType: {
            text: string,
            value: string,
        },
        type: {
            text: string,
            value: string,
        },
        currencyType: {
            text: string,
            value: string,
        },
        goldType: {
            text: string,
            value: string,
        },
        quanlity: string,
        attribute: {
            text: string,
            value: string,
        },
        cashOptimizatioDetailModelList: {
            type: {
                text: string,
                value: string,
            },
            currencyType: {
                text: string,
                value: string,
            },
            goldType: {
                text: string,
                value: string,
            },
            quanlity: string,
            attribute: {
                text: string,
                value: string,
            },
        }[],
        priorityLevelCode: {
            text: string,
            value: string,
        },
        model: {
            text: string,
            value: string,
        },
        placeReceive: {
            text: string,
            value: string,
        },
        rejectReason:string,
        isDisabledGoldTypes: boolean,
    },
    orgsSearchingPopup:{
        isShown:boolean,
        atmCdm: {
            text: string,
            value: string,
        },
        nhnnTctd: {
            text: string,
            value: string,
        },
    },
    historyPopup: {
        isShown: boolean,
    },
    queryResult: any,
    authorityContents: any,
    
    objectTypes: any[],
    pycTypes: [],
    pycModels: any[],
    pycPlaceReceives: any[],
}

