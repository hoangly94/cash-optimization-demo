const root = 'routeTracking_'
export const FETCH_DATA = root + 'FETCH_DATA';
export const UPDATE_DATA = root + 'UPDATE_DATA';
export const CHANGE_CODE_FILTER = root + 'CHANGE_CODE_FILTER';

export const REQUEST_ROUTE_START = root + 'REQUEST_ROUTE_START';
export const REQUEST_ROUTE_CONFIRM_1 = root + 'REQUEST_ROUTE_CONFIRM_1';
export const REQUEST_ROUTE_CONFIRM_2 = root + 'REQUEST_ROUTE_CONFIRM_2';
export const REQUEST_ROUTE_CONFIRM_3 = root + 'REQUEST_ROUTE_CONFIRM_3';

export const REQUEST_ROUTE_START_KCD = root + 'REQUEST_ROUTE_START_KCD';
export const REQUEST_ROUTE_CONFIRM_1_KCD = root + 'REQUEST_ROUTE_CONFIRM_1_KCD';
export const REQUEST_ROUTE_CONFIRM_2_KCD = root + 'REQUEST_ROUTE_CONFIRM_2_KCD';
export const REQUEST_ROUTE_CONFIRM_3_KCD = root + 'REQUEST_ROUTE_CONFIRM_3_KCD';

export const FETCH_MAP = root + 'FETCH_MAP';
export const UPDATE_MAP = root + 'UPDATE_MAP';

export type State = {
    filters: {
        id: string,
    },
    route: {
    },
}


