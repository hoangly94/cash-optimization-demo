const root = 'vehicle_'
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
export const SELECT_FUNCTIONS_CREATING = root + 'SELECT_FUNCTIONS_CREATING';
export const SELECT_FUNCTIONS_EDITING = root + 'SELECT_FUNCTIONS_EDITING';
export const SELECT_STATUS_CREATING = root + 'SELECT_STATUS_CREATING';
export const SELECT_STATUS_EDITING = root + 'SELECT_STATUS_EDITING';
export const SELECT_PERS_CREATING = root + 'SELECT_PERS_CREATING';
export const SELECT_PERS_EDITING = root + 'SELECT_PERS_EDITING';
export const CHANGE_CODE_FILTER = root + 'CHANGE_CODE_FILTER';
export const SELECT_ROW = root + 'SELECT_ROW';

export type State = {
    history: any,
    filters: {
        orgsId: {
            text: string,
            value: string,
        },
        vehicleCode: string,
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
        vehicleCode?: number,
        vehicleType?: string,
        vehicleFunctionSelected: {
            text: string,
            value: string,
        }
        vehicleYearManufactureSelected?: string,
        orgsSelected: {
            text: string,
            value: string,
        }
        region?: string,
        vehicleStatusSelected: {
            text: string,
            value: string,
        }
        driverCodeSelected: {
            text: string,
            value: string,
        }
    },
    editingPopup: {
        isShown: boolean,
        vehicleFunctionSelected: {
            text: string,
            value: string,
        }
        orgsSelected: {
            text: string,
            value: string,
        }
        vehicleStatusSelected: {
            text: string,
            value: string,
        }
        driverCodeSelected: {
            text: string,
            value: string,
        }
    },
    historyPopup: {
        isShown: boolean,
    },
    queryResult: any,
}


