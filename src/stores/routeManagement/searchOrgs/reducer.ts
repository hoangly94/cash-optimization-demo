import { State, UPDATE_DATA, SELECT_ROW, SELECT_REGION_TYPE_FILTER, SELECT_AREA_TYPE_FILTER, INPUT_ORGS_VALUE_FILTER, SELECT_LOCATION_TYPE_FILTER, SELECT_ORGS_TYPE_FILTER } from './constants'
import { _Date, getCurrentDate } from '@utils';
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
        case SELECT_LOCATION_TYPE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    locationType: action.data,
                },
            }
        case SELECT_ORGS_TYPE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    orgsType: action.data,
                },
            }
        case INPUT_ORGS_VALUE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.data,
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
                        index: (action.page || 0) * +(process.env.NUMBER_ITEMS_PER_PAGE || 0)+ index + 1,
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
        case SELECT_REGION_TYPE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    regionType: action.data,
                },
            }
        case SELECT_AREA_TYPE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    areaType: action.data,
                },
            }
        default:
            return state
    }
}

function getDefaultFilters() {
    return {
        regionType: {
            text: 'Chọn vùng',
            value: '',
        },
        areaType: {
            text: 'Chọn cụm',
            value: '',
        },
        locationType: {
            text: 'Vùng',
            value: 'region',
        },
        orgsType: {
            text: 'Mã đơn vị',
            value: 'code',
        },
        locationTypes: [
            {
                text: 'Vùng',
                value: 'region',
            },
            {
                text: 'Cụm',
                value: 'area',
            },
        ],
        orgsTypes: [
            {
                text: 'Mã đơn vị',
                value: 'code',
            },
            {
                text: 'Tên đơn vị',
                value: 'name',
            },
        ],
        locationValue: '',
        orgsValue: '',
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