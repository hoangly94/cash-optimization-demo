import { State, UPDATE_CONFIG, UPDATE_AREAS, UPDATE_ATMCDMS, UPDATE_ORGS, UPDATE_REGIONS, UPDATE_FUNCTIONS, UPDATE_PERS, UPDATE_TITLES, UPDATE_CURRENCIES, UPDATE_PRIORITIES, UPDATE_NHNNTCTDS } from './constants'

const initState: State = {
    regions: [],
    areas: [],
    orgs: [],
    atmCdms: [],
    nhnnTctds: [],
    currencies: [],
    priorities: [],
    atmcdmStatuses: [],
    nhnnTctdTypes: [],
    vehicleStatuses: [],
    persStatuses: [],
    functions: [],
    pers: [],
    titles: [],
    authorityStatuses: [],
    authorityContents: [],
    pycOrgsRoles: [],
    pycTypes: [],
    pycObjectTypes: [],
    pycStatuses: [],
    goldTypes: [],
    pycAttributes: [],
    pycModels: [],
    pycReceivingPlaces: [],
    reasonTypes: [],
    routeStatuses: [],
    routeTransportTypes: [],
}

export default (state: State = initState, action) => {
    switch (action.type) {
        case UPDATE_CONFIG:
            if (action.data) {
                const atmcdmStatuses = action.data.filter(item => item.type === 'ATMCDM_STATUS');
                const nhnnTctdTypes = action.data.filter(item => item.type === 'NHNNTCTD_TYPE');
                const vehicleStatuses = action.data.filter(item => item.type === 'VEHICLE_STATUS');
                const persStatuses = action.data.filter(item => item.type === 'PERS_STATUS');
                const authorityStatuses = action.data.filter(item => item.type === 'AUTHORIY_STATUS');
                const authorityContents = action.data.filter(item => item.type === 'AUTHORIY_CONTENT');
                const pycOrgsRoles = action.data.filter(item => item.type === 'CASH_OPTIMIZATION_ORGS_ROLE');
                const pycTypes = action.data.filter(item => item.type === 'CASH_OPTIMIZATION_TYPE');
                const pycObjectTypes = action.data.filter(item => item.type === 'CASH_OPTIMIZATION_OBJECT_TYPE');
                const pycStatuses = action.data.filter(item => item.type === 'CASH_OPTIMIZATION_STATUS');
                const goldTypes = action.data.filter(item => item.type === 'CASH_OPTIMIZATION_GOLD_TYPE');
                const pycAttributes = action.data.filter(item => item.type === 'CASH_OPTIMIZATION_ATTRIBUTE');
                const pycModels = action.data.filter(item => item.type === 'CASH_OPTIMIZATION_MODEL');
                const pycReceivingPlaces = action.data.filter(item => item.type === 'CASH_OPTIMIZATION_PLACE_RECEIVE');
                const reasonTypes = action.data.filter(item => item.type === 'CASH_OPTIMIZATION_REASON_TYPE');
                const routeStatuses = action.data.filter(item => item.type === 'ROUTE_STATUS');
                const routeTransportTypes = action.data.filter(item => item.type === 'ROUTE_TRANSPORT_TYPE');
                
                return {
                    ...state,
                    atmcdmStatuses,
                    nhnnTctdTypes,
                    vehicleStatuses,
                    persStatuses,
                    authorityStatuses,
                    authorityContents,
                    pycOrgsRoles,
                    pycTypes,
                    pycObjectTypes,
                    pycStatuses,
                    goldTypes,
                    pycAttributes,
                    pycModels,
                    pycReceivingPlaces,
                    reasonTypes,
                    routeStatuses,
                    routeTransportTypes,
                }
            }
            return state;
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
                atmCdms: action.data,
            }
        case UPDATE_NHNNTCTDS:
            return {
                ...state,
                nhnnTctds: action.data,
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
        case UPDATE_CURRENCIES:
            return {
                ...state,
                currencies: action.data,
            }
        case UPDATE_PRIORITIES:
            return {
                ...state,
                priorities: action.data,
            }
        default:
            return state
    }
}
