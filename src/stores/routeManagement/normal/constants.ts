const root = 'routeManagement_'
export const FETCH_HISTORY = root + 'FETCH_HISTORY';
export const UPDATE_HISTORY = root + 'UPDATE_HISTORY';
export const REQUEST_CREATING = root + 'REQUEST_CREATING';
export const REQUEST_CREATING_CANCEL = root + 'REQUEST_CREATING_CANCEL';
export const DONE_CREATING = root + 'DONE_CREATING';
export const REQUEST_EDITING = root + 'REQUEST_EDITING';
export const REQUEST_EDITING_CANCEL = root + 'REQUEST_EDITING_CANCEL';
export const REQUEST_DELETE = root + 'REQUEST_DELETE';
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
export const SELECT_DUALTABLE_CONTENT_ROW = root + 'SELECT_DUALTABLE_CONTENT_ROW';
export const SET_POPUP_TYPE = root + 'SET_POPUP_TYPE';

export const HANDLE_DUALTABLE_MOVE = root + 'HANDLE_DUALTABLE_MOVE';
export const HANDLE_APPROVE_ACTION = root + 'HANDLE_APPROVE_ACTION';
export const HANDLE_REJECT_ACTION = root + 'HANDLE_REJECT_ACTION';


export const RESET_FILTER = root + 'RESET_FILTER';

export const REQUEST_UPDATE_CONTINUE = root + 'REQUEST_UPDATE_CONTINUE';

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

export const HANDLE_VALIDATE_CANCEL_APPROVE1 = root + 'HANDLE_VALIDATE_CANCEL_APPROVE1';
export const HANDLE_VALIDATE_CANCEL_APPROVE2 = root + 'HANDLE_VALIDATE_CANCEL_APPROVE2';
export const HANDLE_VALIDATE_CANCEL_APPROVE3 = root + 'HANDLE_VALIDATE_CANCEL_APPROVE3';
export const HANDLE_VALIDATE_CANCEL_REJECT1 = root + 'HANDLE_VALIDATE_CANCEL_REJECT1';
export const HANDLE_VALIDATE_CANCEL_REJECT2 = root + 'HANDLE_VALIDATE_CANCEL_REJECT2';
export const HANDLE_VALIDATE_CANCEL_REJECT3 = root + 'HANDLE_VALIDATE_CANCEL_REJECT3';

export const FETCH_ORGS_CHILDREN = root + 'FETCH_ORGS_CHILDREN';
export const UPDATE_ORGS_CHILDREN = root + 'UPDATE_ORGS_CHILDREN';
export const GET_EXCEL = root + 'GET_EXCEL';
export const GET_HISTORY_EXCEL = root + 'GET_HISTORY_EXCEL';
export const SELECT_HISTORY_ROW = root + 'SELECT_HISTORY_ROW';
export const FETCH_HISTORY_DETAIL = root + 'FETCH_HISTORY_DETAIL';
export const UPDATE_HISTORY_DETAIL = root + 'UPDATE_HISTORY_DETAIL';

export const REQUEST_ORGSSEARCHING_CANCEL = root + 'REQUEST_ORGSSEARCHING_CANCEL';
export const SELECT_ORGSSEARCHING = root + 'SELECT_ORGSSEARCHING';
export const FETCH_ORGSSEARCHING_DISTANCE = root + 'FETCH_ORGSSEARCHING_DISTANCE';
export const UPDATE_ORGSSEARCHING_DISTANCE = root + 'UPDATE_ORGSSEARCHING_DISTANCE';
export const FETCH_PYC = root + 'FETCH_PYC';
export const UPDATE_PYC = root + 'UPDATE_PYC';

export const REQUEST_SEACHVEHICLEPERS = root + 'REQUEST_SEACHVEHICLEPERS';
export const REQUEST_SEACHVEHICLEPERS_CANCEL = root + 'REQUEST_SEACHVEHICLEPERS_CANCEL';
export const REQUEST_SEACHVEHICLEPERS_CONTINUE = root + 'REQUEST_SEACHVEHICLEPERS_CONTINUE';

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
        tableContent1: any[],
        tableContent2: any[],
        startTime: string,
    },
    editingPopup: {
        isShown: boolean,
        tableContent1: any[],
        tableContent2: any[],
        startTime: string,
    },
    orgsSearchingPopup: {
        isShown: boolean,
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
    detailPopup: {

    },
    queryResult: any,
    objectTypes: any[],
    pycTypes: [],
    pycModels: any[],
    pycPlaceReceives: any[],
    orgsChildren: any[],
    distanceOrgsToOrgsRequest: string,
    pyc: any[],
    searchVehiclePersPopup:{
        vehicles:any[],
        pers:any[],
    },
    organizeRoutePopup:{

    },
    view:{

    },
}


