import { State, UPDATE_CONFIG, UPDATE_AREAS, UPDATE_ATMCDMS, UPDATE_ORGS, UPDATE_REGIONS } from './constants'

const initState: State = {
    regions: [],
    areas: [],
    orgs: [],
    atmcdms: [],
    atmcdmStatuses: [],
}

export default (state: State = initState, action) => {
    switch (action.type) {
        case UPDATE_CONFIG:
            const atmcdmStatuses = action.data.filter(item => item.type === 'ATMCDM_STATUS');
            return {
                ...state,
                atmcdmStatuses: atmcdmStatuses,
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
        default:
            return state
    }
}
