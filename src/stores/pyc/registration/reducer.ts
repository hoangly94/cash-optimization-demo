import { REQUEST_EDITING, CHANGE_CODE_FILTER, REQUEST_QUERY, FETCH_DATA, UPDATE_DATA, SELECT_ORGS_FILTER, SELECT_NHNNTCTD_TYPE, State, REQUEST_RESET, CHANGE_CREATING_INPUT, CHANGE_EDITING_INPUT, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, DONE_CREATING, SELECT_ROW, UPDATE_HISTORY, SELECT_REGION_CREATING, SELECT_REGION_EDITING, CHANGE_RADIO_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO, SELECT_STATUS_FILTER, INPUT_DATE_FROM_CREATING, INPUT_DATE_TO_CREATING, SEARCH_PERS, SELECT_DUALTABLE_CONTENT_ROW, HANDLE_DUALTABLE_MOVE, SET_POPUP_TYPE, INPUT_DATE_FROM_EDITING, INPUT_DATE_TO_EDITING, RESET_FILTER_APPROVAL, RESET_FILTER_REGISTRATION, SELECT_COMBOX, HANDLE_SPECIAL_ADD, SELECT_SPECIAL_ROW, HANDLE_SPECIAL_DELETE, SELECT_COMBOX_FILTER, UPDATE_SPECIAL_DATA, UPDATE_ORGS_CHILDREN, SELECT_HISTORY_ROW, UPDATE_ORGSSEARCHING_DISTANCE, REQUEST_ORGSSEARCHING_CANCEL, SEARCHORGS_SELECT_UPDATE, SEARCHORGS_UPDATE_ATMCDMS, SEARCHORGS_UPDATE_NHNNTCTDS, UPDATE_CONTINUE, } from './constants'
import { SELECT_ROW as SEARCHORGS_SELECT_ROW } from '~stores/pyc/searchOrgs/constants'
import { SELECT_ROW as SEARCHPERS_SELECT_ROW } from '~stores/pyc/searchPers/constants'
import { getCurrentDate, getCurrentDateTime, _Date } from '@utils';
import { UPDATE_CONFIG } from '~stores/dashboardRoot/constants';
import { HANDLE_POPUP } from '~stores/_base/constants';
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
    authorityContents: [],
    objectTypes: getDefaultObjectTypes(),
    orgsChildren: [],
    distanceOrgsToOrgsRequest: '',
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
                    orgsHolderMobile: action.mobile,
                },
                
                pycTypes: [],
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
            const data = action.data?.data ? action.data.data?.map(preprocessQueryResult) : [];

            return {
                ...state,
                isLoading: false,
                filters: {
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
                    orgs: {
                        text: action.user?.orgsName,
                        value: action.user?.orgsCode,
                    },
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
            const historyData = action.data?.data ? action.data.data?.map(preprocessQueryResult) : [];
            return {
                ...state,
                isLoading: false,
                filters: {
                    ...state.filters,
                    sort: action.sort || (state.filters['sort'] ?? ''),
                },
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
                    id: '',
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
                selectedOrgs: {
                    searchOrgsType: action.searchOrgsType,
                    orgsName: action.data.orgsName,
                    orgsCode: action.data.orgsCode,
                },
            }
        case SEARCHORGS_SELECT_UPDATE:
            if (state['selectedOrgs']?.searchOrgsType === 2) {
                return {
                    ...state,
                    orgsSearchingPopup: {
                        ...state.orgsSearchingPopup,
                        orgsDestCode: state['selectedOrgs']?.orgsCode,
                        orgsDestName: state['selectedOrgs']?.orgsName,
                    },
                }
            }
            else {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        orgs: {
                            text: state['selectedOrgs']?.orgsName,
                            value: state['selectedOrgs']?.orgsCode,
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

        case SELECT_DUALTABLE_CONTENT_ROW:
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
        case RESET_FILTER_APPROVAL:
            return {
                ...state,
                filters: {
                    ...getDefaultFilters(),
                    orgs: {
                        text: action.user?.orgsName,
                        value: action.user?.orgsId,
                    },
                },
            }
        case HANDLE_POPUP:
            return {
                ...state,
                popupType: action.popupType || state.popupType,
            }
        case SELECT_COMBOX:
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
                    rejectReason: '',
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
                            key: cashOptimizatioDetailModelList.length ? cashOptimizatioDetailModelList[cashOptimizatioDetailModelList.length - 1]['key'] + 1 : 1,
                            type: popupTypeData.type?.value,
                            currencyType: popupTypeData.currencyType?.value,
                            goldType: popupTypeData.goldType?.value,
                            quanlity: +popupTypeData.quanlity?.toString().replaceAll(',', ''),
                            attribute: popupTypeData.attribute?.value,
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

        case UPDATE_CONTINUE:

            return {
                ...state,
                orgsSearchingPopup: {
                    ...state.editingPopup,
                    ...{
                        orgsName: state.editingPopup.cashOptimizationOrgsDetailModel?.orgsDestName || '',
                        atmCdm: {
                            text: state.editingPopup.cashOptimizationOrgsDetailModel?.atmCdmName || '',
                            value: state.editingPopup.cashOptimizationOrgsDetailModel?.atmCdmCode || '',
                        },
                        nhnnTctd: {
                            text: state.editingPopup.cashOptimizationOrgsDetailModel?.nnhnTctdName || '',
                            value: state.editingPopup.cashOptimizationOrgsDetailModel?.nnhnTctdCode || '',
                        },
                        orgsDestName: state.editingPopup.cashOptimizationOrgsDetailModel?.orgsDestName || state.editingPopup.orgsName
                    }
                },
            };

        case SELECT_ROW:
            const newQueryResult = state.queryResult.data.map(mapToNewQueryResult(action.data))
            const newData = mapToNewData(action.data);
            return {
                ...state,
                ...pycTypesCheckData('objectType', action.data.objectType),
                // creatingPopup: {
                //     ...state.creatingPopup,
                //     orgsHolderMobile: newData.orgsHolderMobile,
                // },
                selectedItem: {
                    ...newData,
                    orgsHolderMobile: action.user?.username != newData.createdbyCode ? action.user?.phone : newData.orgsHolderMobile,
                    orgsHolderMobile2: newData.orgsHolderMobile,
                },
                editingPopup: {
                    ...newData,
                    orgsHolderMobile: action.user?.username != newData.createdbyCode ? action.user?.phone : newData.orgsHolderMobile,
                    orgsHolderMobile2: newData.orgsHolderMobile,
                },
                detailPopup: newData,
                orgsSearchingPopup: {
                    ...newData,
                    ...{
                        orgsName: newData.cashOptimizationOrgsDetailModel?.orgsDestName || '',
                        atmCdm: {
                            text: newData.cashOptimizationOrgsDetailModel?.atmCdmName || '',
                            value: newData.cashOptimizationOrgsDetailModel?.atmCdmCode || '',
                        },
                        nhnnTctd: {
                            text: newData.cashOptimizationOrgsDetailModel?.nnhnTctdName || '',
                            value: newData.cashOptimizationOrgsDetailModel?.nnhnTctdCode || '',
                        },
                        orgsDestName: newData.cashOptimizationOrgsDetailModel?.orgsDestName || newData.orgsName
                    }
                },
                distanceOrgsToOrgsRequest: newData.cashOptimizationOrgsDetailModel?.distanceOrgsToOrgsRequest,
                queryResult: {
                    ...state.queryResult,
                    data: newQueryResult,
                }
            }

        case SELECT_HISTORY_ROW:
            const newQueryResultHistory = state.history.data.map(mapToNewQueryResult(action.data))
            const newDataHistory = mapToNewData(action.data);
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
                    ...{
                        orgsDestName: state.selectedItem.cashOptimizationOrgsDetailModel?.orgsDestName || '',
                        orgsName: state.selectedItem.cashOptimizationOrgsDetailModel?.orgsDestName || '',
                        atmCdm: {
                            text: state.selectedItem.cashOptimizationOrgsDetailModel?.atmCdmName || '',
                            value: state.selectedItem.cashOptimizationOrgsDetailModel?.atmCdmCode || '',
                        },
                        nhnnTctd: {
                            text: state.selectedItem.cashOptimizationOrgsDetailModel?.nnhnTctdName || '',
                            value: state.selectedItem.cashOptimizationOrgsDetailModel?.nnhnTctdCode || '',
                        },
                    }
                },
                distanceOrgsToOrgsRequest: state.selectedItem.cashOptimizationOrgsDetailModel?.distanceOrgsToOrgsRequest || '',
            }
        case SEARCHORGS_UPDATE_ATMCDMS:
            return {
                ...state,
                rootAtmCdms: action.data?.data,
            }
        case SEARCHORGS_UPDATE_NHNNTCTDS:
            return {
                ...state,
                rootNhnnTctds: action.data?.data,
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
        orgsRequestId: '',
        orgsCode: '',
        orgsName: '',
        orgsHolderCode: '',
        orgsHolderName: '',
        orgsHolderMobile: '',
        objectType: {
            text: '?????i t?????ng ??i???u qu???',
            value: '',
        },
        type: {
            text: 'Lo???i y??u c???u',
            value: '',
        },
        currencyType: {
            text: 'Lo???i ti???n',
            value: '',
        },
        goldType: {
            text: 'Lo???i v??ng',
            value: '',
        },
        quanlity: '',
        attribute: {
            text: '?????c ??i???m',
            value: '',
        },
        cashOptimizatioDetailModelList: [],
        priorityLevelCode: {
            text: 'M???c ????? ??u ti??n',
            value: '',
        },
        model: {
            text: 'M?? h??nh ??Q',
            value: '',
        },
        placeReceive: {
            text: '?????a ??i???m nh???n',
            value: '',
        },
        isDisabledGoldTypes: true,
        reasonType: {
            text: 'L?? do h???y',
            value: '',
        },
        rejectReason: '',
    }
}

function getDefaultFilters() {
    return {
        radio: '1',
        dateFrom: moment().format('DD/MM/YYYY'),
        dateTo: moment().format('DD/MM/YYYY'),
        orgsRole: {
            text: 'ALL',
            value: 'ALL',
        },
        orgs: {
            text: '',
            value: '',
        },
        objectType: {
            text: 'ALL',
            value: 'ALL',
        },
        status: {
            text: 'ALL',
            value: 'ALL',
        },
        id: '',
    }
}

const mapToNewData = (item) => {
    const cashOptimizatioDetailModelList = item.cashOptimizatioDetailModelList?.map((item, index) => ({
        ...item,
        key: item.id ?? index,
    })) ?? [];
    const cashOptimizationDetailHistModelList = item.cashOptimizationDetailHistModelList?.map((item, index) => ({
        ...item,
        key: item.id ?? index,
    })) ?? [];
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
        priorityLevelName: item?.priorityLevelName,
        routeId: item.routeId,
        routeStatus: item.routeStatus,
        updateddate: item.updateddate,
        objectType: {
            text: item.objectType,
            value: item.objectType,
        },
        priorityLevelCode: {
            text: item?.priorityLevelName,
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
        cashOptimizatioDetailModelList: cashOptimizatioDetailModelList,
        cashOptimizationDetailHistModelList: cashOptimizationDetailHistModelList,
        orgsDestCode: item.cashOptimizationOrgsDetailModel?.orgsDestCode,
        orgsDestName: item.cashOptimizationOrgsDetailModel?.orgsDestName,
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
    updateddate: data.updateddate,
    atmCdm: {
        text: data.cashOptimizationOrgsDetailModel?.atmCdmName || 'T??n ATM',
        value: data.cashOptimizationOrgsDetailModel?.atmCdmCode,
    },
    nnhnTctd: {
        text: data.cashOptimizationOrgsDetailModel?.nnhnTctdName || 'T??n NH ?????i t??c KPP m??? TK',
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
                    text: 'Lo???i v??ng',
                    value: '',
                },
            };
        }
        return {
            isDisabledGoldTypes: true,
            goldType: {
                text: 'Lo???i v??ng',
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
                text: 'Lo???i y??u c???u',
                value: '',
            },
            currencyType: {
                text: 'Lo???i ti???n',
                value: '',
            },
            goldType: {
                text: 'Lo???i v??ng',
                value: '',
            },
            quanlity: '',
            attribute: {
                text: '?????c ??i???m',
                value: '',
            },
            cashOptimizatioDetailModelList: [],
            model: {
                text: 'M?? h??nh ??i???u qu???',
                value: '',
            },
            placeReceive: {
                text: '?????a ??i???m nh???n',
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
                        name: 'THU QU??? KPP',
                        value: 'Thu qu??? KPP',
                    },
                    {
                        name: 'TI???P QU??? KPP',
                        value: 'Ti???p qu??? KPP',
                    },
                ],
                pycModels: [
                    {
                        name: 'B??NH TH?????NG',
                        value: 'B??nh th?????ng',
                    },
                    {

                        name: '??ANG V???N CHUY???N',
                        value: '??ang v???n chuy???n',
                    },
                    {
                        name: '??ANG V???N CHUY???N & TRUNG GIAN',
                        value: '??ang v???n chuy???n & Trung gian',
                    },
                    {
                        name: 'TRUNG GIAN',
                        value: 'Trung gian',
                    },
                ],
                pycPlaceReceives: [
                    {
                        name: '??V??Q',
                        value: '??V??Q',
                    },
                    {
                        name: '??VYC??Q',
                        value: '??VYC??Q',
                    },
                ],
            };
        }
        if (value === 'ATM') {
            return {
                pycTypes: [
                    {
                        name: 'TI???P QU??? ATM',
                        value: 'Ti???p qu??? ATM',
                    },
                    {
                        name: 'K???T QU??? ATM',
                        value: 'K???t qu??? ATM',
                    },
                ],
                pycModels: [
                    {
                        name: 'B??NH TH?????NG',
                        value: 'B??nh th?????ng',
                    },
                ],
                pycPlaceReceives: [
                    {
                        name: '??VYC??Q',
                        value: '??VYC??Q',
                    },
                ],
            };
        }
        if (value === 'TCTD/NHNN') {
            return {
                pycTypes: [
                    {
                        name: 'N???P H??B T???I TCTD/NHNN',
                        value: 'N???p H??B t???i TCTD/NHNN',
                    },
                    {
                        name: 'R??T H??B T???I TCTD/NHNN',
                        value: 'R??t H??B t???i TCTD/NHNN',
                    },
                ],
                pycModels: [
                    {
                        name: 'B??NH TH?????NG',
                        value: 'B??nh th?????ng',
                    },
                    {

                        name: '??ANG V???N CHUY???N',
                        value: '??ang v???n chuy???n',
                    },
                ],
                pycPlaceReceives: [
                    {
                        name: '??VYC??Q',
                        value: '??VYC??Q',
                    },
                ],
            };
        }
        return [
        ];
    }
    return {};
};