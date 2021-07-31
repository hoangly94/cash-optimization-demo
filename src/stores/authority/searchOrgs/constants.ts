const root = 'searchOrgs_'
export const SELECT_ROW = root + 'SELECT_ROW';
export const SELECT_LOCATION_TYPE_FILTER= root + 'SELECT_LOCATION_TYPE_FILTER';
export const SELECT_ORGS_TYPE_FILTER= root + 'SELECT_ORGS_TYPE_FILTER';
export const INPUT_ORGS_VALUE_FILTER = root + 'INPUT_ORGS_VALUE_FILTER';
export const REQUEST_QUERY = root + 'REQUEST_QUERY';
export const UPDATE_DATA = root + 'UPDATE_DATA';
export const SELECT_REGION_TYPE_FILTER= root + 'SELECT_REGION_TYPE_FILTER';
export const SELECT_AREA_TYPE_FILTER= root + 'SELECT_AREA_TYPE_FILTER';
export const RESET_SEARCHORGS_FILTER= root + 'RESET_SEARCHORGS_FILTER';

export type State = {
    filters: {
        regionType: {
            text: string,
            value: string,
        },
        areaType: {
            text: string,
            value: string,
        },
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
    },
    queryResult: any,
}


