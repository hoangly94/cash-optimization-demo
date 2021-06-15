const root = 'searchPers_'
export const SELECT_ROW = root + 'SELECT_ROW';
export const SELECT_TYPE_FILTER= root + 'SELECT_TYPE_FILTER';
export const INPUT_VALUE_FILTER = root + 'INPUT_VALUE_FILTER';
export const REQUEST_QUERY = root + 'REQUEST_QUERY';
export const UPDATE_DATA = root + 'UPDATE_DATA';

export type State = {
    filters: {
        type: {
            text: string,
            value: string,
        },
        types: any[],
        value: string,
        queryButton: {
            isLoading: boolean,
        }
    },
    queryResult: any,
}


