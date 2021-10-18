import { CHANGE_CODE_FILTER, State, UPDATE_DATA, UPDATE_MAP, UPDATE_TQUY } from './constants'
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
            console.log('----------');
            console.log(action.data?.data);
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
        case UPDATE_TQUY:
            const destinationTqList = action.data1?.data;
            const tqList = action.data2?.data;
            return {
                ...state,
                route: {
                    ...state.route,
                    // destinationTq: tqList && tqList[Math.floor(Math.random() * tqList.length)],
                    destinationTq: tqList,
                    destinationTqList,
                    tqList,
                },
            }
        default:
            return state
    }
}
