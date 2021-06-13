const root = 'root';

export const FETCH_CONFIG = 'FETCH_CONFIG';
export const FETCH_REGIONS = 'FETCH_REGIONS';
export const FETCH_AREAS = 'FETCH_AREAS';
export const FETCH_ORGS = 'FETCH_ORGS';
export const FETCH_ATMCDMS = 'FETCH_ATMCDMS';
export const FETCH_FUNCTIONS = 'FETCH_FUNCTIONS';
export const FETCH_PERS = 'FETCH_PERS';
export const FETCH_TITLES = 'FETCH_TITLES';

export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export const UPDATE_REGIONS = 'UPDATE_REGIONS';
export const UPDATE_ORGS = 'UPDATE_ORGS';
export const UPDATE_AREAS = 'UPDATE_AREAS';
export const UPDATE_ATMCDMS = 'UPDATE_ATMCDMS';
export const UPDATE_FUNCTIONS = 'UPDATE_FUNCTIONS';
export const UPDATE_PERS = 'UPDATE_PERS';
export const UPDATE_TITLES = 'UPDATE_TITLES';

export type State = {
    regions: [],
    areas: [],
    orgs: [],
    atmcdms: [],
    atmcdmStatuses: [],
    nhnnTctdTypes: [],
    vehicleStatuses: [],
    functions: [],
    pers: [],
    titles: [],
    persStatuses: [],
    authorityStatuses: [],
    authorityContents: [],
}


