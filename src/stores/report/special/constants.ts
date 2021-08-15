const root = 'report_special_'
export const REQUEST_QUERY = root + 'REQUEST_QUERY';
export const SELECT_COMBOX = root + 'SELECT_COMBOX';
export const SELECT_COMBOX_FILTER = root + 'SELECT_COMBOX_FILTER';
export const EXPORT_EXCEL = root + 'EXPORT_EXCEL';
export const UPDATE_DATA = root + 'UPDATE_DATA';
export const RESET_FILTER = root + 'RESET_FILTER';

export const CHANGE_CODE_FILTER = root + 'CHANGE_CODE_FILTER';
export const CHANGE_RADIO_FILTER = root + 'CHANGE_RADIO_FILTER';
export const INPUT_DATE_FROM = root + 'INPUT_DATE_FROM';
export const INPUT_DATE_TO = root + 'INPUT_DATE_TO';
export const FETCH_ORGS_CHILDREN = root + 'FETCH_ORGS_CHILDREN';
export const UPDATE_ORGS_CHILDREN = root + 'UPDATE_ORGS_CHILDREN';

export const FETCH_PERS = root + 'FETCH_PERS';
export const UPDATE_PERS= root + 'UPDATE_PERS';

export const SELECT_ORGS_TYPE_FILTER= root + 'SELECT_ORGS_TYPE_FILTER';
export const INPUT_ORGS_VALUE_FILTER= root + 'INPUT_ORGS_VALUE_FILTER';

export const SELECT_ROW= root + 'SELECT_ROW';

export type State = {
    filters: {
        dateFrom: string,
        dateTo: string,
        orgCodeList: any[],
        orgsType: {},
        orgsValue: string,
    },
    queryResult: {
        total: number,
    },
    orgsTypes: any[],
}


