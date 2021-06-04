import { SUBMIT, RESET, CREATE, EDIT, REQUEST_QUERY,   FETCH_DATA, SHOW_DATA, SELECT_UNITNAME, SELECT_ATMCDMSTATUS, State } from './constants'
import * as Base from '~/_settings';

const initState: State = {
    isLoading: false,
    filters: {
        managementUnitName: {
            text: 'Tên đơn vị quản lý',
            value: '',
        },
        atmCdmStatus: {
            text: 'Trạng thái ATM/CDM',
            value: '',
        },
    },
    queryResult: {},
}

export default (state: State = initState, action) => {
    switch (action.type) {
        case SUBMIT:
            return {
                ...state,
            }
        case RESET:
            return {
                ...state,
            }
        case CREATE:
            return {
                ...state,
            }
        case EDIT:
            return {
                ...state,
            }
        case FETCH_DATA:
            return {
                ...state,
                isLoading: true,
            }
        case REQUEST_QUERY:
            return state
        case SHOW_DATA:
            return {
                ...state,
                isLoading: true,
                queryResult: { ...action.queryResult },
            }
        case SELECT_UNITNAME:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    managementUnitName: action.filter,
                },
                managementUnitName: action.filter.text,
            }
        case SELECT_ATMCDMSTATUS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    atmCdmStatus: action.filter,
                },
            }
        default:
            return state
    }
}