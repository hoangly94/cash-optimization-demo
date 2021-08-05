const root = 'root';

export const FETCH_CONFIG = 'FETCH_CONFIG';
export const FETCH_REGIONS = 'FETCH_REGIONS';
export const FETCH_AREAS = 'FETCH_AREAS';
export const FETCH_ORGS = 'FETCH_ORGS';
export const FETCH_ATMCDMS = 'FETCH_ATMCDMS';
export const FETCH_NHNNTCTDS = 'FETCH_NHNNTCTDS';
export const FETCH_FUNCTIONS = 'FETCH_FUNCTIONS';
export const FETCH_PERS = 'FETCH_PERS';
export const FETCH_TITLES = 'FETCH_TITLES';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const FETCH_PRIORITIES = 'FETCH_PRIORITIES';

export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export const UPDATE_REGIONS = 'UPDATE_REGIONS';
export const UPDATE_ORGS = 'UPDATE_ORGS';
export const UPDATE_AREAS = 'UPDATE_AREAS';
export const UPDATE_ATMCDMS = 'UPDATE_ATMCDMS';
export const UPDATE_NHNNTCTDS = 'UPDATE_NHNNTCTDS';
export const UPDATE_FUNCTIONS = 'UPDATE_FUNCTIONS';
export const UPDATE_PERS = 'UPDATE_PERS';
export const UPDATE_TITLES = 'UPDATE_TITLES';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';
export const UPDATE_PRIORITIES = 'UPDATE_PRIORITIES';

export const REPORT_PRINT = 'REPORT_PRINT';

export type State = {
    regions: any[],
    areas: any[],
    orgs: any[],
    atmCdms: any[],
    nhnnTctds: any[],
    currencies: any[],
    priorities: any[],
    atmcdmStatuses: any[],
    nhnnTctdTypes: any[],
    vehicleStatuses: any[],
    functions: any[],
    pers: any[],
    titles: any[],
    persStatuses: any[],
    authorityStatuses: any[],
    authorityContents: any[],
    pycOrgsRoles: any[],
    pycTypes: any[],
    pycObjectTypes: any[],
    pycStatuses: any[],
    goldTypes: any[],
    pycAttributes: any[],
    pycModels: any[],
    pycReceivingPlaces: any[],
    reasonTypes: any[],
    routeStatuses: any[],
    routeTransportTypes: any[],
    stopPointTypes: any[],
}


