import { CHANGE_CODE_FILTER, State, UPDATE_DATA, UPDATE_MAP } from './constants'
import moment from 'moment';

import Config from '@config';
const initState: State = {
    filters: {
        id: '',
    },
    route: {},
}

export default (state: State = initState, action) => {
    switch (action.type) {
        case UPDATE_DATA:
            return {
                ...state,
                route: action.data?.data,
            }
        case CHANGE_CODE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.data,
                },
            }
        case UPDATE_MAP:
            return {
                ...state,
                mapHtml: action.data,
            }
        default:
            return state
    }
}
