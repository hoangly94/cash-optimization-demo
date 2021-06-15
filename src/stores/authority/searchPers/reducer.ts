import { State, SELECT_TYPE_FILTER, INPUT_VALUE_FILTER, UPDATE_DATA, SELECT_ROW } from './constants'
import { getCurrentDate } from '@utils';

const initState: State = {
    filters: {
        ...getDefaultFilters(),
        queryButton: {
            isLoading: false,
        },
    },
    queryResult: {
        total: 0,
    },
}

export default (state: State = initState, action) => {
    switch (action.type) {
        case INPUT_VALUE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.data
                },
            }
        case SELECT_TYPE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    type: action.data,
                },
            }
        case UPDATE_DATA:
            const data = action.data.data ? action.data.data.map(preprocessQueryResult) : [];
            return {
                ...state,
                isLoading: false,
                queryResult: {
                    ...state.queryResult,
                    data: data,
                    total: action.data.total,
                }
            }
        case SELECT_ROW:
            const newQueryResult = state.queryResult.data.map(mapToNewQueryResult(action.data))
            return {
                ...state,
                queryResult: {
                    ...state.queryResult,
                    data: newQueryResult,
                }
            }
        default:
            return state
    }
}

function getDefaultFilters() {
    return {
        type: {
            text: 'Mã nhân viên',
            value: 'id',
        },
        types: [
            {
                text: 'Mã nhân viên',
                value: 'id',
            },
            {
                text: 'Họ và tên nhân viên',
                value: 'name',
            },
            {
                text: 'CMND',
                value: 'cmnd',
            },
        ],
        value: '',
    }
}

const mapToNewQueryResult = (selectedItem) => (item) => {
    const isSelectedItem = item.id === selectedItem.id
    if (isSelectedItem) {
        return {
            ...item,
            isSelected: true,
        }
    }
    if (!isSelectedItem) {
        return {
            ...item,
            isSelected: false,
        }
    }
}

const preprocessQueryResult = (data) => ({
    ...data,
    createddate: getCurrentDate(data.createddate),
    updateddate: getCurrentDate(data.updateddate),
})