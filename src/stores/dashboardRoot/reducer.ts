import { State, UPDATE_CONFIG, UPDATE_AREAS, UPDATE_ATMCDMS, UPDATE_ORGS, UPDATE_REGIONS, UPDATE_FUNCTIONS, UPDATE_PERS, UPDATE_TITLES } from './constants'

const initState: State = {
    regions: [],
    areas: [],
    orgs: [],
    atmcdms: [],
    atmcdmStatuses: [],
    nhnnTctdTypes: [],
    vehicleStatuses: [],
    persStatuses: [],
    functions: [],
    pers: [],
    titles: [],
    authorityStatuses: [],
    authorityContents: [],
}

export default (state: State = initState, action) => {
    switch (action.type) {
        case UPDATE_CONFIG:
            
    console.log(action);
            const atmcdmStatuses = action.data.filter(item => item.type === 'ATMCDM_STATUS');
            const nhnnTctdTypes = action.data.filter(item => item.type === 'NHNNTCTD_TYPE');
            const vehicleStatuses = action.data.filter(item => item.type === 'VEHICLE_STATUS');
            const persStatuses = action.data.filter(item => item.type === 'PERS_STATUS');
            const authorityStatuses = action.data.filter(item => item.type === 'AUTHORIY_STATUS');
            const authorityContents = action.data.filter(item => item.type === 'AUTHORIY_CONTENT');
            return {
                ...state,
                atmcdmStatuses: atmcdmStatuses,
                nhnnTctdTypes: nhnnTctdTypes,
                vehicleStatuses: vehicleStatuses,
                persStatuses: persStatuses,
                authorityStatuses: authorityStatuses,
                authorityContents: authorityContents,
            }
        case UPDATE_REGIONS:
            return {
                ...state,
                regions: action.data,
            }
        case UPDATE_AREAS:
            return {
                ...state,
                areas: action.data,
            }
        case UPDATE_ORGS:
            return {
                ...state,
                orgs: action.data,
            }
        case UPDATE_ATMCDMS:
            return {
                ...state,
                atmcdms: action.data,
            }
        case UPDATE_FUNCTIONS:
            return {
                ...state,
                functions: action.data,
            }
        case UPDATE_PERS:
            return {
                ...state,
                pers: action.data,
            }
        case UPDATE_TITLES:
            return {
                ...state,
                titles: action.data,
            }
        case UPDATE_REGIONS:
            return {
                ...state,
                regions: action.data,
            }
        default:
            return state
    }
}
