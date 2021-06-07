const root = 'root';

export const FETCH_CONFIG = 'FETCH_CONFIG';
export const FETCH_REGIONS = 'FETCH_REGIONS';
export const FETCH_AREAS = 'FETCH_AREAS';
export const FETCH_ORGS = 'FETCH_ORGS';
export const FETCH_ATMCDMS = 'FETCH_ATMCDMS';

export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export const UPDATE_REGIONS = 'UPDATE_REGIONS';
export const UPDATE_ORGS = 'UPDATE_ORGS';
export const UPDATE_AREAS = 'UPDATE_AREAS';
export const UPDATE_ATMCDMS = 'UPDATE_ATMCDMS';

export type State = {
    regions: [],
    areas: [],
    orgs: [],
    atmcdms: [],
    atmcdmStatuses: [],
}


