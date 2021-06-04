export const SUBMIT = 'submit';
export const RESET = 'reset';
export const CREATE = 'create';
export const EDIT = 'edit';
export const FETCH_DATA = 'fetch_data';
export const REQUEST_QUERY = 'request_query';
export const SHOW_DATA = 'show_data';
export const SELECT_UNITNAME = 'select_unitname';
export const SELECT_ATMCDMSTATUS = 'select_atmcdmstatus';
export const REQUEST_RESET = 'request_reset';

export type State = {
    isLoading: boolean,
    filters: {
        managementUnitName: {
            text: string,
            value: string,
        },
        atmCdmStatus: {
            text: string,
            value: string,
        },
    },
    queryResult: any,
}

