import { REQUEST_CREATING, REQUEST_EDITING, CHANGE_CODE_FILTER, REQUEST_QUERY, FETCH_DATA, UPDATE_DATA, SELECT_ORGS_FILTER, SELECT_NHNNTCTD_TYPE, State, REQUEST_RESET, CHANGE_CREATING_INPUT, CHANGE_EDITING_INPUT, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, DONE_CREATING, SELECT_ROW, UPDATE_HISTORY, SELECT_REGION_CREATING, SELECT_REGION_EDITING, CHANGE_RADIO_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO, SELECT_STATUS_FILTER, INPUT_DATE_FROM_CREATING, INPUT_DATE_TO_CREATING, SEARCH_PERS, SELECT_AUTHORITY_CONTENT_ROW, HANDLE_DUALTABLE_MOVE, SET_POPUP_TYPE, INPUT_DATE_FROM_EDITING, INPUT_DATE_TO_EDITING, RESET_FILTER_APPROVAL, RESET_FILTER_REGISTRATION, SELECT_COMBOX, HANDLE_SPECIAL_ADD, SELECT_SPECIAL_ROW, HANDLE_SPECIAL_DELETE, SELECT_COMBOX_FILTER, UPDATE_SPECIAL_DATA, } from './constants'
import { SELECT_ROW as SEARCHORGS_SELECT_ROW } from '~stores/pyc/searchOrgs/constants'
import { SELECT_ROW as SEARCHPERS_SELECT_ROW } from '~stores/pyc/searchPers/constants'
import { getCurrentDate, getCurrentDateTime, _Date } from '@utils';
import { UPDATE_CONFIG } from '~stores/dashboardRoot/constants';
import { HANDLE_POPUP } from '~stores/_base/constants';

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
    authorityContents: [],
    objectTypes: [
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
    ],
}

export default (state: State = initState, action) => {
    switch (action.type) {
        case REQUEST_CREATING:
            return {
                ...state,
            }
        case REQUEST_CREATING:
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    ...getDefaultPopupActions(),
                }
            }
        case REQUEST_CREATING_CANCEL:
            return {
                ...state,
                creatingPopup: {
                    ...getDefaultPopupActions(),
                }
            }
        case DONE_CREATING:
            return {
                ...state,
                creatingPopup: {
                    ...getDefaultPopupActions(),
                    authorityContent1: state.authorityContents,
                }
            }
        case REQUEST_EDITING:
            return {
                ...state,
            }
        case REQUEST_EDITING_CANCEL:
            return {
                ...state,
                selectedItem: state.editingPopup,
            }
        case FETCH_DATA:
            return {
                ...state,
                isLoading: true,
            }
        case REQUEST_QUERY:
            return state
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
            return {
                ...state,
                filters: {
                    ...state.filters,
                    orgs: {
                        text: action.data.orgsName,
                        value: action.data.orgsCode,
                        // value: action.data.orgsCode,
                    },
                },
                orgsSearchingPopup: {
                    ...state.orgsSearchingPopup,
                    orgsCode: action.data.orgsCode,
                    orgsName: action.data.orgsName,
                },
            }
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
        case UPDATE_CONFIG:
            if (action.data) {
                const authorityContents = action.data.filter(item => item.type === 'AUTHORIY_CONTENT');

                return {
                    ...state,
                    creatingPopup: {
                        ...state.creatingPopup,
                        authorityContent1: authorityContents,
                    },
                    editingPopup: {
                        ...state.editingPopup,
                        authorityContent1: authorityContents,
                    },
                    authorityContents: authorityContents,
                }
            }
            return state;

        case SELECT_AUTHORITY_CONTENT_ROW:
            const tableType = `authorityContent${action.tableType}`;
            const selectAuthorityRowData = action.popupType === 1
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
            }
        case HANDLE_DUALTABLE_MOVE:
            const popupType = state.popupType === 1 ? 'creatingPopup' : 'editingPopup';

            const moveNewData = function () {
                if (action.moveType === 'ONE_LEFT_TO_RIGHT') {
                    return [
                        state[popupType]['authorityContent1'].filter(item => !item.isSelected),
                        [
                            ...state[popupType]['authorityContent2'],
                            ...state[popupType]['authorityContent1']
                                .filter(item => item.isSelected)
                                .map(item => ({ ...item, isSelected: false })),
                        ],
                    ]
                }
                if (action.moveType === 'ONE_RIGHT_TO_LEFT') {
                    return [
                        [
                            ...state[popupType]['authorityContent1'],
                            ...state[popupType]['authorityContent2']
                                .filter(item => item.isSelected)
                                .map(item => ({ ...item, isSelected: false })),
                        ],
                        state[popupType]['authorityContent2'].filter(item => !item.isSelected),
                    ]
                }
                if (action.moveType === 'ALL_LEFT_TO_RIGHT') {
                    return [
                        [],
                        [
                            ...state[popupType]['authorityContent2'].map(item => ({ ...item, isSelected: false })),
                            ...state[popupType]['authorityContent1'].map(item => ({ ...item, isSelected: false })),
                        ],
                    ]
                }
                if (action.moveType === 'ALL_RIGHT_TO_LEFT') {
                    return [
                        [
                            ...state[popupType]['authorityContent1'].map(item => ({ ...item, isSelected: false })),
                            ...state[popupType]['authorityContent2'].map(item => ({ ...item, isSelected: false })),
                        ],
                        [],
                    ]
                }
            }() || [];
            return {
                ...state,
                [popupType]: {
                    ...state[popupType],
                    authorityContent1: moveNewData[0],
                    authorityContent2: moveNewData[1],
                }
            }
        case RESET_FILTER_REGISTRATION:
            return {
                ...state,
                filters: {
                    radio: '1',
                    dateFrom: '',
                    dateTo: '',
                    orgs: {
                        text: '',
                        value: '',
                    },
                    status: {
                        text: 'ALL',
                        value: 'ALL',
                    },
                    id: '',
                },
            }
        case RESET_FILTER_APPROVAL:
            return {
                ...state,
                filters: {
                    radio: '1',
                    dateFrom: '',
                    dateTo: '',
                    orgs: {
                        text: '',
                        value: '',
                    },
                    status: {
                        text: 'Pending_A',
                        value: 'Pending_A',
                    },
                    id: '',
                },
            }
        case HANDLE_POPUP:
            return {
                ...state,
                popupType: action.popupType || state.popupType,
            }
        case SELECT_COMBOX:
            // console.log(action);
            const key1 = action.keys[0];
            const key2 = action.keys[1];
            return {
                ...state,
                ...pycTypesCheckData(key2, action.data.value),
                [key1]: {
                    ...state[key1],
                    [key2]: action.data,
                    ...currencyTypeCheckData(key2, action.data.value),
                    ...pycTypesCheckResetData(key2),
                },
            }
        case SELECT_COMBOX_FILTER:
            return {
                ...state,
                [action.keys[0]]: {
                    ...state[action.keys[0]],
                    [action.keys[1]]: action.data,
                },
            }
        case UPDATE_SPECIAL_DATA:
            const key = state.popupType == 1 ? 'creatingPopup' : 'editingPopup';
            // const key = state.popupType == 1 ? 'creatingPopup' : 'selectedItem';
            const popupTypeData = state[key];
            const cashOptimizatioDetailModelList = state[key].cashOptimizatioDetailModelList;

            return {
                ...state,
                [key]: {
                    ...state[key],
                    cashOptimizatioDetailModelList: [
                        ...state[key].cashOptimizatioDetailModelList,
                        {
                            id: cashOptimizatioDetailModelList.length ? cashOptimizatioDetailModelList[cashOptimizatioDetailModelList.length - 1]['id'] + 1 : 0,
                            type: popupTypeData.type,
                            currencyType: popupTypeData.currencyType,
                            goldType: popupTypeData.goldType,
                            quanlity: popupTypeData.quanlity,
                            attribute: popupTypeData.attribute,
                        },
                    ],
                },
            }
        case SELECT_SPECIAL_ROW:
            const selectSpecialRowData = state.popupType == 1
                ? {
                    creatingPopup: {
                        ...state.creatingPopup,
                        cashOptimizatioDetailModelList: state.creatingPopup.cashOptimizatioDetailModelList.map(mapToNewQueryResult(action.data))
                    }
                }
                : {
                    editingPopup: {
                        ...state.editingPopup,
                        cashOptimizatioDetailModelList: state.editingPopup.cashOptimizatioDetailModelList.map(mapToNewQueryResult(action.data))
                    }
                };
            return {
                ...state,
                ...selectSpecialRowData,
            }
        case HANDLE_SPECIAL_DELETE:
            const newSpecialRowData = state.popupType == 1
                ? {
                    creatingPopup: {
                        ...state.creatingPopup,
                        cashOptimizatioDetailModelList: state.creatingPopup.cashOptimizatioDetailModelList.filter(item => !item['isSelected']),
                    }
                }
                : {
                    editingPopup: {
                        ...state.editingPopup,
                        cashOptimizatioDetailModelList: state.editingPopup.cashOptimizatioDetailModelList.filter(item => !item['isSelected']),
                    }
                };
            return {
                ...state,
                ...newSpecialRowData,
            }

        case SELECT_ROW:
            // console.log(action);
            // console.log(state);
            const newQueryResult = state.queryResult.data.map(mapToNewQueryResult(action.data))
            const newData = mapToNewData(action.data);
            // const approvalData = ['Approved_A', 'Rejected_A'].includes(newData.authorityStatus)
            //     ? {}
            //     : {
            //         updatedbyName: '',
            //         updatedbyCode: '',
            //         updateddate: '',
            //     };
            return {
                ...state,
                ...pycTypesCheckData('objectType', action.data.objectType),
                selectedItem: newData,
                editingPopup: newData,
                orgsSearchingPopup: {
                    ...getDefaultOrgsSearchingPopup(),
                    ...newData,
                },
                queryResult: {
                    ...state.queryResult,
                    data: newQueryResult,
                }
            }
        default:
            return state
    }
}
function getDefaultOrgsSearchingPopup() {
    return {
        atmCdm: {
            text: 'Tên ATM',
            value: '',
        },
        nhnnTctd: {
            text: 'Tên NH đối tác KPP mở TK',
            value: '',
        },
    }

}
function getDefaultPopupActions() {
    return {
        orgsRequestId: '',
        orgsCode: '',
        orgsName: '',
        orgsHolderCode: '',
        orgsHolderName: '',
        orgsHolderMobile: '',
        objectType: {
            text: 'Đối tượng điều quỹ',
            value: '',
        },
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
        priorityLevelCode: {
            text: 'Mức độ ưu tiên',
            value: '',
        },
        model: {
            text: 'Mô hình ĐQ',
            value: '',
        },
        placeReceive: {
            text: 'Địa điểm nhận',
            value: '',
        },
        rejectReason: '',
        isDisabledGoldTypes: true,
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
            text: '',
            value: '',
        },
        objectType: {
            text: 'Đối tượng ĐQ - ALL',
            value: 'ALL',
        },
        status: {
            text: 'Trạng thái PYC',
            value: '',
        },
        id: '',
    }
}

const mapToNewData = (item) => {
    return {
        ...getDefaultPopupActions(),
        ...item,
        id: item.id,
        createddate: item.createddate,
        orgsRequestId: item.orgsRequestId,
        orgsHolderCode: item.orgsHolderCode,
        orgsHolderName: item.orgsHolderName,
        orgsHolderMobile: item.orgsHolderMobile,
        orgsCode: item.orgsCode,
        orgsName: item.orgsName,
        cashOptimizationStatus: item.cashOptimizationStatus,
        priorityLevelName: item.priorityLevelName,
        routeId: item.routeId,
        routeStatus: item.routeStatus,
        updateddate: item.updateddate,
        objectType: {
            text: item.objectType,
            value: item.objectType,
        },
        priorityLevelCode: {
            text: item.priorityLevelName,
            value: item.priorityLevelCode,
        },
        model: {
            text: item.model,
            value: item.model,
        },
        placeReceive: {
            text: item.placeReceive,
            value: item.placeReceive,
        },
        cashOptimizatioDetailModelList: item.cashOptimizatioDetailModelList,
    }
}

const mapToNewQueryResult = (selectedItem) => (item) => {
    const isSelectedItem = item.id === selectedItem.id;
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
    updateddate: getCurrentDateTime(data.updateddate),
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
const pycTypesCheckData = (type, value) => {
    if (type === 'objectType') {
        if (value === 'KPP') {
            return {
                pycTypes: [
                    {
                        name: 'THU QUỸ KPP',
                        value: 'Thu quỹ KPP',
                    },
                    {
                        name: 'TIẾP QUỸ KPP',
                        value: 'Tiếp quỹ KPP',
                    },
                ],
                pycModels: [
                    {
                        name: 'BÌNH THƯỜNG',
                        value: 'Bình thường',
                    },
                    {

                        name: 'ĐANG VẬN CHUYỂN',
                        value: 'Đang vận chuyển',
                    },
                    {
                        name: 'ĐANG VẬN CHUYỂN & TRUNG GIAN',
                        value: 'Đang vận chuyển & Trung gian',
                    },
                    {
                        name: 'TRUNG GIAN',
                        value: 'Trung gian',
                    },
                ],
                pycPlaceReceives: [
                    {
                        name: 'ĐVĐQ',
                        value: 'ĐVĐQ',
                    },
                    {
                        name: 'ĐVYCĐQ',
                        value: 'ĐVYCĐQ',
                    },
                ],
            };
        }
        if (value === 'ATM') {
            return {
                pycTypes: [
                    {
                        name: 'TIẾP QUỸ ATM',
                        value: 'Tiếp quỹ ATM',
                    },
                    {
                        name: 'KẾT QUỸ ATM',
                        value: 'Kết quỹ ATM',
                    },
                ],
                pycModels: [
                    {
                        name: 'BÌNH THƯỜNG',
                        value: 'Bình thường',
                    },
                    {

                        name: 'ĐANG VẬN CHUYỂN',
                        value: 'Đang vận chuyển',
                    },
                ],
                pycPlaceReceives: [
                    {
                        name: 'ĐVYCĐQ',
                        value: 'ĐVYCĐQ',
                    },
                ],
            };
        }
        if (value === 'TCTD/NHNN') {
            return {
                pycTypes: [
                    {
                        name: 'BÌNH THƯỜNG',
                        value: 'Bình thường',
                    },
                ],
                pycModels: [
                    {
                        name: 'BÌNH THƯỜNG',
                        value: 'Bình thường',
                    },
                ],
                pycPlaceReceives: [
                    {
                        name: 'ĐVYCĐQ',
                        value: 'ĐVYCĐQ',
                    },
                ],
            };
        }
        return [
        ];
    }
    return {};
};