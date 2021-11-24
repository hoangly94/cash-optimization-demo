import { State, SELECT_TYPE_FILTER, INPUT_VALUE_FILTER, UPDATE_DATA, SELECT_ROW } from './constants'
import { getCurrentDate, _Date } from '@utils';

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
            const data = action.data?.data ? action.data.data?.map(preprocessQueryResult) : [];
            
            return {
                ...state,
                isLoading: false,
                filters:{
                    ...state.filters,
                    sort: action.sort || (state.filters['sort'] ?? ''),
                },
                queryResult: {
                    ...state.queryResult,
                    data: data.map((item, index) => ({
                        ...item,
                        index: (action.page || 0) * +(process.env.NUMBER_ITEMS_PER_PAGE || 0) + index + 1,
                    })),
                    currentPage: action.page || 0,
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

const mapToNewQueryResult = (selectedItem) => (item, index) => {
    const isSelectedItem = item.key === selectedItem.key;
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
const preprocessQueryResult = (data, index) => ({
    ...data,
    key: data.id ?? index,
    createddate: _Date.getDate(data.createddate),
    updateddate: _Date.getDate(data.updateddate),
})