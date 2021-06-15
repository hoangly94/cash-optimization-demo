const root = 'searchOrgs_'
export const SELECT_ROW = root + 'SELECT_ROW';
export const SELECT_TYPE_FILTER= root + 'SELECT_TYPE_FILTER';
export const INPUT_VALUE_FILTER = root + 'INPUT_VALUE_FILTER';
export const REQUEST_QUERY = root + 'REQUEST_QUERY';
export const UPDATE_DATA = root + 'UPDATE_DATA';

export type State = {
    filters: {
        locationType: {
            text: string,
            value: string,
        },
        orgsType: {
            text: string,
            value: string,
        },
        locationTypes: any[],
        orgsTypes: any[],
        locationValue: string,
        orgsValue: string,
        queryButton: {
            isLoading: boolean,
        }
    },
    queryResult: any,
}


