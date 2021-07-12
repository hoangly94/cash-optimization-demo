import { REQUEST_CREATING, REQUEST_EDITING, CHANGE_CODE_FILTER, REQUEST_QUERY, FETCH_DATA, UPDATE_DATA, SELECT_ORGS_FILTER, SELECT_NHNNTCTD_TYPE, State, REQUEST_RESET, CHANGE_CREATING_INPUT, CHANGE_EDITING_INPUT, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, DONE_CREATING, SELECT_ROW, UPDATE_HISTORY, SELECT_REGION_CREATING, SELECT_REGION_EDITING, CHANGE_RADIO_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO, SELECT_STATUS_FILTER, INPUT_DATE_FROM_CREATING, INPUT_DATE_TO_CREATING, SEARCH_PERS, SELECT_AUTHORITY_CONTENT_ROW, HANDLE_DUALTABLE_MOVE, SET_POPUP_TYPE, INPUT_DATE_FROM_EDITING, INPUT_DATE_TO_EDITING, RESET_FILTER_APPROVAL, RESET_FILTER_REGISTRATION, } from './constants'
import { SELECT_ROW as SEARCHORGS_SELECT_ROW } from '~stores/authority/searchOrgs/constants'
import { SELECT_ROW as SEARCHPERS_SELECT_ROW } from '~stores/authority/searchPers/constants'
import * as Base from '~/_settings';
import { getCurrentDate, getCurrentDateTime, _Date } from '@utils';
import { UPDATE_CONFIG } from '_/stores/dashboardRoot/constants';
import { HANDLE_POPUP } from '_/stores/_base/constants';

const initState: State = {
    history: [],
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
    historyPopup: {
        isShown: false,
    },
    authorityContents: [],
}

export default (state: State = initState, action) => {
    switch (action.type) {
        
        
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
        case SELECT_ROW:
            const newQueryResult = state.queryResult.data.map(mapToNewQueryResult(action.data))
            const newData = mapToNewData(action.data);
            const approvalData = ['Approved_A', 'Rejected_A'].includes(newData.authorityStatus)
                ? {}
                : {
                    updatedbyName: '',
                    updatedbyCode: '',
                    updateddate: '',
                };
            return {
                ...state,
                selectedItem: newData,
                editingPopup: {
                    ...newData,
                    authorityContent1: state.authorityContents.filter(item1 =>
                        newData.authorityContent2.filter(item2 => item2.id == item1.id).length == 0),
                    ...approvalData,
                },
                queryResult: {
                    ...state.queryResult,
                    data: newQueryResult,
                }
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
        case SELECT_STATUS_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    status: action.data,
                },
            }
        case SEARCHORGS_SELECT_ROW:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    orgs: {
                        text: action.data.orgsName,
                        value: action.data.id,
                    },
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
                    recvCmndyear: _Date.getDate(action.data.persCmndCccdYear),
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

        default:
            return state
    }
}

function getDefaultPopupActions() {
    return {
        dateFrom: '',
        dateTo: '',

        orgsId: '',
        orgsName: '',//code 9

        searchPersType: 0,
        sendId: '',
        sendCode: '',
        sendName: '',
        sendCmnd: '',
        sendTitle: '',

        recvId: '',
        recvCode: '',
        recvName: '',
        recvTitle: '',
        recvCmnd: '',
        recvCmndyear: '',
        recvCmndPlace: '',
        recvPhone: '',

        authorityContent1: [],
        authorityContent2: [],
        authorityStatus: '',
        rejectReason: '',

        createdbyName: '',

        updatedbyCode: '',
        updatedbyName: '',
        updateddate: '',
    }
}

function getDefaultFilters() {
    return {
        radio: '1',
        dateFrom: '',
        dateTo: '',
        orgs: {
            text: '',
            value: '',
        },
        status: {
            text: 'Trạng thái',
            value: '',
        },
        id: '',
    }
}

const mapToNewData = (item) => {
    return {
        id: item.id,
        orgsId: item.categoryOrgs?.id,
        orgsName: item.categoryOrgs?.orgsName,
        dateFrom: _Date.getCurrentDateTime(item.authorityFromDate),
        dateTo: _Date.getCurrentDateTime(item.authorityToDate),
        sendId: item.persId,
        sendCode: item.persCode,
        sendName: item.persFullname,
        sendTitle: item.persTitle,
        sendCmnd: item.persCmndCccd,
        recvId: item.receiverPersId,
        recvCode: item.receiverPersCode,
        recvName: item.receiverPersFullname,
        recvTitle: item.receiverPersTitle,
        recvCmnd: item.receiverPersCmndCccd,
        recvCmndyear: _Date.getDate(item.receiverPersCmndCccdYear),
        recvCmndPlace: item.receiverPersCmndCccdPlace,
        recvPhone: item.receiverPersMobile,
        authorityContent2: item.authorityDetail.map(item => ({
            id: item.authorityContentId,
            name: item.authorityContentValue,
        })),
        rejectReason: item.authorityReason,
        authorityStatus: item.authorityStatus,
        updatedbyCode: item.updatedbyCode,
        updatedbyName: item.updatedbyName,
        updateddate: item.updateddate,
        createdbyName: item.createdbyName,
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
})