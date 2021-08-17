import { SELECT_COMBOX, SELECT_ORGS_TYPE_FILTER, INPUT_ORGS_VALUE_FILTER, FETCH_PERS, UPDATE_PERS, UPDATE_ORGS_CHILDREN, CHANGE_CODE_FILTER, CHANGE_RADIO_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO, SELECT_COMBOX_FILTER, State, RESET_FILTER, UPDATE_DATA } from './constants'
import moment from 'moment';
import Config from '@config';
import { _Date } from '_/utils';

const initState: State = {
    filters: {
        ...getDefaultFilters(),
        // queryButton: {
        //     isLoading: false,
        // },
    },

    orgsTypes: [
        {
            text: 'Mã ĐVTLT',
            value: 'MADVTLT',
        },
        {
            text: 'Tên ĐVTLT',
            value: 'TENDVTLT',
        },
    ],
    queryResult: {
        total: 0,
    },
}

export default (state: State = initState, action) => {
    switch (action.type) {
        case UPDATE_DATA:
            const data = action.data?.data ? action.data.data?.map(preprocessQueryResult) : [];

            return {
                ...state,
                isLoading: false,
                queryResult: {
                    ...state.queryResult,
                    data: data.map((item, index) => ({
                        ...item,
                        index: (action.page || 0) * Config.numberOfItemsPerPage + index + 1,
                    })),
                    currentPage: action.page || 0,
                    total: action.data.total,
                }
            }
        case SELECT_COMBOX:
            const key1 = action.keys[0];
            const key2 = action.keys[1];
            return;
        // return {
        //     ...state,
        //     ...pycTypesCheckData(key2, action.data.value),
        //     [key1]: {
        //         ...state[key1],
        //         [key2]: action.data,
        //         ...currencyTypeCheckData(key2, action.data.value),
        //         ...pycTypesCheckResetData(key2),
        //     },
        // }
        case SELECT_COMBOX_FILTER:
            return {
                ...state,
                [action.keys[0]]: {
                    ...state[action.keys[0]],
                    [action.keys[1]]: action.data,
                },
            }
        case RESET_FILTER:
            return {
                ...state,
                filters: {
                    ...getDefaultFilters(),
                    orgs: {
                        text: action.user?.orgsName,
                        value: action.user?.orgsCode,
                    },
                },
                queryResult: {
                    total: 0,
                },
            }
        case UPDATE_ORGS_CHILDREN:
            const orgsChildren = (action.data?.data?.map(item => ({
                value: item.orgsCode,
                label: item.orgsName,
            })) || [])
            return {
                ...state,
                filters: {
                    ...state.filters,
                    orgs: {
                        // text: action.user?.orgsName,
                        // value: action.user?.orgsCode,
                    },
                    orgCodeList: [
                        {
                            value: action.user.orgsCode,
                            label: action.user.orgsName,
                        },
                    ] ?? [],
                },
                orgsChildren: [
                    {
                        value: action.user.orgsCode,
                        label: action.user.orgsName,
                    },
                    ...orgsChildren,
                ] ?? [],
            }
        case CHANGE_CODE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.data,
                },
            }
        case CHANGE_RADIO_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    radio: action.data.name,
                    orgsValue: '',
                },
            }
        case INPUT_DATE_FROM:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.data
                },
            }
        case INPUT_DATE_TO:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.data
                },
            }
        case UPDATE_PERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    persCodeList: action?.data?.data?.map(item => ({
                        value: item.persCode,
                        label: item.persFullname,
                    })) ?? [],
                },
                pers: action?.data?.data?.map(item => ({
                    value: item.persCode,
                    label: item.persFullname,
                })) ?? [],
            };
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
        default:
            return state
    }
}

function getDefaultFilters() {
    return {
        radio: '1',
        dateFrom: moment().format('DD/MM/YYYY'),
        dateTo: moment().format('DD/MM/YYYY'),
        orgCodeList: [],
        orgsType: {
            text: 'Mã ĐVTLT',
            value: 'MADVTLT',
        },
        orgsValue: '',
    }
}

const preprocessQueryResult = (data, index) => ({
    ...data,
    key: data.id ?? index,
    createddate: _Date.getDate(data.createddate),
    updateddate: _Date.getDate(data.updateddate),
})