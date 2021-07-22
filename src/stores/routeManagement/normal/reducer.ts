import { REQUEST_EDITING, CHANGE_CODE_FILTER, REQUEST_QUERY, FETCH_DATA, UPDATE_DATA, SELECT_ORGS_FILTER, SELECT_NHNNTCTD_TYPE, State, REQUEST_RESET, CHANGE_CREATING_INPUT, CHANGE_EDITING_INPUT, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, DONE_CREATING, SELECT_ROW, UPDATE_HISTORY, SELECT_REGION_CREATING, SELECT_REGION_EDITING, CHANGE_RADIO_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO, SELECT_STATUS_FILTER, INPUT_DATE_FROM_CREATING, INPUT_DATE_TO_CREATING, SEARCH_PERS, SELECT_DUALTABLE_CONTENT_ROW, HANDLE_DUALTABLE_MOVE, SET_POPUP_TYPE, INPUT_DATE_FROM_EDITING, INPUT_DATE_TO_EDITING, SELECT_COMBOX, HANDLE_SPECIAL_ADD, SELECT_SPECIAL_ROW, HANDLE_SPECIAL_DELETE, SELECT_COMBOX_FILTER, UPDATE_SPECIAL_DATA, UPDATE_ORGS_CHILDREN, SELECT_HISTORY_ROW, UPDATE_ORGSSEARCHING_DISTANCE, REQUEST_ORGSSEARCHING_CANCEL, RESET_FILTER, UPDATE_PYC, } from './constants'
import { SELECT_ROW as SEARCHORGS_SELECT_ROW } from '~stores/pyc/searchOrgs/constants'
import { SELECT_ROW as SEARCHPERS_SELECT_ROW } from '~stores/pyc/searchPers/constants'
import { getCurrentDate, getCurrentDateTime, _Date } from '@utils';
import { UPDATE_CONFIG } from '~stores/dashboardRoot/constants';
import { HANDLE_POPUP } from '~stores/_base/constants';
import { ItemChildrenType } from '_/components/commons/list';
import moment from 'moment';

const initState: State = {
    history: [],
    pycTypes: [],
    pycModels: [],
    pycPlaceReceives: [],
    filters: {
        ...getDefaultFilters(),
        queryButton: {
            isLoading: false,
        },
    },
    searchPersType: 0,
    popupType: 0,
    queryResult: {
        total: 0,
    },
    selectedItem: {
        id: '',
        data: {},
        editData: {},
    },
    editingButton: {
        isDisabled: true,
    },
    creatingPopup: {
        isShown: false,
        ...getDefaultPopupActions(),
    },
    editingPopup: {
        isShown: false,
        ...getDefaultPopupActions(),
    },
    orgsSearchingPopup: {
        isShown: false,
        ...getDefaultPopupActions(),
        ...getDefaultOrgsSearchingPopup(),
    },
    historyPopup: {
        isShown: false,
    },
    detailPopup: {

    },
    objectTypes: getDefaultObjectTypes(),
    orgsChildren: [],
    distanceOrgsToOrgsRequest: '',
    pyc: [],
    searchVehiclePersPopup: getDefaultSearchVehiclePersPopup(),
    organizeRoutePopup: {

    },
    view: {

    },
}

function getDefaultObjectTypes() {
    return [
        {
            name: 'KPP',
            value: 'KPP',
        },
        {
            name: 'ATM',
            value: 'ATM',
        },
        {
            name: 'TCTD/NHNN',
            value: 'TCTD/NHNN',
        },
    ];
}

export default (state: State = initState, action) => {
    switch (action.type) {
        case REQUEST_CREATING_CANCEL:
            return {
                ...state,
                creatingPopup: {
                    ...getDefaultPopupActions(),
                    tableContent1: state.pyc,
                },
            }
        case DONE_CREATING:
            return {
                ...state,
                creatingPopup: {
                    ...getDefaultPopupActions(),
                    tableContent1: state.pyc,
                }
            }
        case REQUEST_EDITING:
            return {
                ...state,
            }
        case REQUEST_EDITING_CANCEL:
            return {
                ...state,
                editingPopup: state.selectedItem,
            }
        case FETCH_DATA:
            return {
                ...state,
                isLoading: true,
            }
        case REQUEST_QUERY:
            return state
        case UPDATE_DATA:
            const data = action.data?.data ? action.data.data.map(preprocessQueryResult) : [];
            return {
                ...state,
                isLoading: false,
                queryResult: {
                    ...state.queryResult,
                    data: data,
                    total: action.data.total,
                }
            }
        case SELECT_ORGS_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    orgs: action.data,
                },
            }
        case SELECT_NHNNTCTD_TYPE:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    nhnnTctdType: action.data,
                },
            }
        case REQUEST_RESET:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...getDefaultFilters(),
                },
            }
        case CHANGE_CREATING_INPUT:
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    ...action.data,
                },
            }
        case CHANGE_EDITING_INPUT:
            return {
                ...state,
                editingPopup: {
                    ...state.editingPopup,
                    ...action.data,
                },
            }
        case UPDATE_HISTORY:
            const historyData = action.data.data ? action.data.data.map(preprocessQueryResult) : [];
            return {
                ...state,
                isLoading: false,
                history: {
                    ...state.history,
                    data: historyData,
                    total: action.data.total,
                }
            }
        case UPDATE_ORGS_CHILDREN:
            return {
                ...state,
                orgsChildren: [
                    {
                        orgsCode: action.user.orgsCode,
                        orgsName: action.user.orgsName,
                    },
                    ...(action.data?.data || []),
                ],
            }
        case CHANGE_CODE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.data,
                },
            }
        case SELECT_REGION_CREATING:
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    regionSelected: action.data,
                },
            }
        case SELECT_REGION_EDITING:
            return {
                ...state,
                selectedItem: {
                    ...state.selectedItem,
                    regionSelected: action.data,
                },
            }
        case CHANGE_RADIO_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    radio: action.data.name,
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
        case INPUT_DATE_FROM_CREATING:
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    ...action.data
                },
            }
        case INPUT_DATE_TO_CREATING:
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    ...action.data
                },
            }
        case INPUT_DATE_FROM_EDITING:
            return {
                ...state,
                editingPopup: {
                    ...state.editingPopup,
                    ...action.data
                },
            }
        case INPUT_DATE_TO_EDITING:
            return {
                ...state,
                editingPopup: {
                    ...state.editingPopup,
                    ...action.data
                },
            }
        case SEARCHORGS_SELECT_ROW:
            if (action.searchOrgsType === 2) {
                return {
                    ...state,
                    orgsSearchingPopup: {
                        ...state.orgsSearchingPopup,
                        orgsDestCode: action.data.orgsCode,
                        orgsDestName: action.data.orgsName,
                    },
                }
            }
            else {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        orgs: {
                            text: action.data.orgsName,
                            value: action.data.orgsCode,
                        },
                    },
                }
            }
        // UPDATE_ORGSSEARCHING_DISTANCE
        case SEARCH_PERS:
            return {
                ...state,
                ...action.data,
            }
        case SEARCHPERS_SELECT_ROW:
            const selectPersData = state.searchPersType === 1
                ? {
                    sendId: action.data.id,
                    sendCode: action.data.persCode,
                    sendName: action.data.persFullname,
                    sendCmnd: action.data.persCmndCccd,
                    sendTitle: action.data.persTitle,
                }
                : {
                    recvId: action.data.id,
                    recvCode: action.data.persCode,
                    recvName: action.data.persFullname,
                    recvCmnd: action.data.persCmndCccd,
                    recvCmndyear: action.data.persCmndCccdYear,
                    recvCmndPlace: action.data.persCmndCccdPlace,
                    recvTitle: action.data.persTitle,
                    recvPhone: action.data.persMobile,
                };
            const selectRowData = state.popupType === 1
                ? {
                    creatingPopup: {
                        ...state.creatingPopup,
                        ...selectPersData,
                    }
                }
                : {
                    editingPopup: {
                        ...state.editingPopup,
                        ...selectPersData,
                    }
                };
            return {
                ...state,
                ...selectRowData,
            }

        case SELECT_DUALTABLE_CONTENT_ROW:
            const tableType = `tableContent${action.tableType}`;
            const selectAuthorityRowData = state.popupType === 1
                ? {
                    creatingPopup: {
                        ...state.creatingPopup,
                        [tableType]: state.creatingPopup[tableType].map(mapToNewQueryResult(action.data))
                    }
                }
                : {
                    editingPopup: {
                        ...state.editingPopup,
                        [tableType]: state.editingPopup[tableType].map(mapToNewQueryResult(action.data))
                    }
                };
            return {
                ...state,
                ...selectAuthorityRowData,
                special: action.data.cashOptimizatioDetailModelList,
            }
        case HANDLE_DUALTABLE_MOVE:
            const popupType = state.popupType === 1 ? 'creatingPopup' : 'editingPopup';
            const moveNewData = function () {
                if (action.moveType === 'ONE_LEFT_TO_RIGHT') {
                    return [
                        state[popupType]['tableContent1'].filter(item => !item.isSelected),
                        [
                            ...state[popupType]['tableContent2'],
                            ...state[popupType]['tableContent1']
                                .filter(item => item.isSelected)
                                .map(item => ({ ...item, isSelected: false })),
                        ],
                    ]
                }
                if (action.moveType === 'ONE_RIGHT_TO_LEFT') {
                    return [
                        [
                            ...state[popupType]['tableContent1'],
                            ...state[popupType]['tableContent2']
                                .filter(item => item.isSelected)
                                .map(item => ({ ...item, isSelected: false })),
                        ],
                        state[popupType]['tableContent2'].filter(item => !item.isSelected),
                    ]
                }
                if (action.moveType === 'ALL_LEFT_TO_RIGHT') {
                    return [
                        [],
                        [
                            ...state[popupType]['tableContent2'].map(item => ({ ...item, isSelected: false })),
                            ...state[popupType]['tableContent1'].map(item => ({ ...item, isSelected: false })),
                        ],
                    ]
                }
                if (action.moveType === 'ALL_RIGHT_TO_LEFT') {
                    return [
                        [
                            ...state[popupType]['tableContent1'].map(item => ({ ...item, isSelected: false })),
                            ...state[popupType]['tableContent2'].map(item => ({ ...item, isSelected: false })),
                        ],
                        [],
                    ]
                }
            }() || [];
            return {
                ...state,
                [popupType]: {
                    ...state[popupType],
                    tableContent1: moveNewData[0],
                    tableContent2: moveNewData[1],
                }
            }
        case RESET_FILTER:
            return {
                ...state,
                filters: getDefaultFilters(),
            }
        case HANDLE_POPUP:
            console.log( action.popupType);
            return {
                ...state,
                popupType: action.popupType || state.popupType,
            }
        case SELECT_COMBOX_FILTER:
            return {
                ...state,
                [action.keys[0]]: {
                    ...state[action.keys[0]],
                    [action.keys[1]]: action.data,
                },
            }

        case SELECT_ROW:
            const newQueryResult = state.queryResult.data.map(mapToNewQueryResult(action.data))
            const newData = mapToNewData(action.data, state);
            return {
                ...state,
                selectedItem: newData,
                editingPopup: newData,
                detailPopup: newData,
                view: newData,
                queryResult: {
                    ...state.queryResult,
                    data: newQueryResult,
                }
            }

        case SELECT_HISTORY_ROW:
            const newQueryResultHistory = state.history.data.map(mapToNewQueryResult(action.data))
            const newDataHistory = mapToNewData(action.data, state);
            return {
                ...state,
                history: {
                    ...state.history,
                    detailPopup: newDataHistory,
                    data: newQueryResultHistory,
                }
            }
        case UPDATE_ORGSSEARCHING_DISTANCE:
            return {
                ...state,
                distanceOrgsToOrgsRequest: action.data?.data?.cashOptimizationOrgsDetailModel?.distanceOrgsToOrgsRequest,
            }
        case REQUEST_ORGSSEARCHING_CANCEL:
            return {
                ...state,
                orgsSearchingPopup: {
                    ...state.orgsSearchingPopup,
                    ...getDefaultOrgsSearchingPopup(),
                },
                distanceOrgsToOrgsRequest: '',
            }
        case UPDATE_PYC:
            const pycData = action.data?.data?.map(item => ({ ...item, key: item.id }));
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    tableContent1: pycData,
                },
                editingPopup: {
                    ...state.editingPopup,
                    tableContent2: pycData,
                },
                pyc: pycData,
            }
        default:
            return state
    }
}
function getDefaultOrgsSearchingPopup() {
    return {
        orgsName: '',
        orgsDestName: '',
        atmCdm: {
            text: '',
            value: '',
        },
        nhnnTctd: {
            text: '',
            value: '',
        },
    }

}
function getDefaultPopupActions() {
    return {
        startTime: '',
        tableContent1: [],
        tableContent2: [],
    }
}

function getDefaultSearchVehiclePersPopup() {
    return {
        vehicles: [],
        pers: [],
    }
}
function getDefaultFilters() {
    return {
        radio: '1',
        dateFrom: '',
        dateTo: '',
        orgsRole: {
            text: 'Vai trò của ĐV',
            value: '',
        },
        orgs: {
            text: 'ĐVĐQ',
            value: '',
        },
        status: {
            text: 'Trạng thái LT',
            value: '',
        },
        id: '',
    }
}

const mapToNewData = (item, state) => {
    const tableContent2 = item.routeCashOptimization?.map((item, index) => ({
        key: item.id ?? index,
        ...item,
        ...item.cashOptimization,
    }));
    return {
        ...getDefaultPopupActions(),
        ...item,
        tableContent1: state.pyc.filter(item1 =>
            tableContent2.filter(item2 => item2.id == item1.id).length == 0),
        tableContent2,
        startTime: moment(item.startTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY hh:mm:ss A'),
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
    createddate: getCurrentDate(data.createddate),
    updateddate: getCurrentDateTime(data.updateddate),
    atmCdm: {
        text: data.cashOptimizationOrgsDetailModel?.atmCdmName || 'Tên ATM',
        value: data.cashOptimizationOrgsDetailModel?.atmCdmCode,
    },
    nnhnTctd: {
        text: data.cashOptimizationOrgsDetailModel?.nnhnTctdName || 'Tên NH đối tác KPP mở TK',
        value: data.cashOptimizationOrgsDetailModel?.nnhnTctdCode,
    },
    distanceOrgsToOrgsRequest: data.cashOptimizationOrgsDetailModel?.distanceOrgsToOrgsRequest,
})


const currencyTypeCheckData = (type, value) => {
    if (type === 'currencyType') {
        if (['ACB', 'XAU'].includes(value)) {
            return {
                isDisabledGoldTypes: false,
                goldType: {
                    text: 'Loại vàng',
                    value: '',
                },
            };
        }
        return {
            isDisabledGoldTypes: true,
            goldType: {
                text: 'Loại vàng',
                value: '',
            },
        };
    }
    return {};
}

const pycTypesCheckResetData = (type) => {
    if (type === 'objectType') {
        return {
            type: {
                text: 'Loại yêu cầu',
                value: '',
            },
            currencyType: {
                text: 'Loại tiền',
                value: '',
            },
            goldType: {
                text: 'Loại vàng',
                value: '',
            },
            quanlity: '',
            attribute: {
                text: 'Đặc điểm',
                value: '',
            },
            cashOptimizatioDetailModelList: [],
            model: {
                text: 'Mô hình điều quỹ',
                value: '',
            },
            placeReceive: {
                text: 'Địa điểm nhận',
                value: '',
            },
        };
    }
    return {};
}