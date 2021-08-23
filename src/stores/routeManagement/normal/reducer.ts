import { REQUEST_EDITING, CHANGE_CODE_FILTER, REQUEST_QUERY, FETCH_DATA, UPDATE_DATA, SELECT_ORGS_FILTER, SELECT_NHNNTCTD_TYPE, State, REQUEST_RESET, CHANGE_CREATING_INPUT, CHANGE_EDITING_INPUT, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, DONE_CREATING, SELECT_ROW, UPDATE_HISTORY, SELECT_REGION_CREATING, SELECT_REGION_EDITING, CHANGE_RADIO_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO, SELECT_STATUS_FILTER, INPUT_DATE_FROM_CREATING, INPUT_DATE_TO_CREATING, SEARCH_PERS, SELECT_DUALTABLE_CONTENT_ROW, HANDLE_DUALTABLE_MOVE, SET_POPUP_TYPE, INPUT_DATE_FROM_EDITING, INPUT_DATE_TO_EDITING, SELECT_COMBOX, HANDLE_SPECIAL_ADD, SELECT_SPECIAL_ROW, HANDLE_SPECIAL_DELETE, SELECT_COMBOX_FILTER, UPDATE_SPECIAL_DATA, UPDATE_ORGS_CHILDREN, SELECT_HISTORY_ROW, UPDATE_ORGSSEARCHING_DISTANCE, REQUEST_ORGSSEARCHING_CANCEL, RESET_FILTER, UPDATE_PYC, REQUEST_SEACHVEHICLEPERS_CANCEL, SELECT_COMBOX_SEARCHVEHICLEPERS, CHANGE_VEHICLE_INPUT, CHANGE_PERS_INPUT, UPDATE_VEHICLE_DATA, SELECT_VEHICLE, UPDATE_PERS_DATA, SELECT_PERS, REQUEST_VEHICLE_CANCEL, REQUEST_PERS_CANCEL, UPDATE_ORGANIZING, REQUEST_ORGANIZING_CHECK_STOP_POINT, UPDATE_ORGANIZING_STOP_POINT, SELECT_ROW_DESTINATION_POINT, SELECT_DESTINATION_POINT, REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL, CHANGE_ORGANIZING_INPUT, REQUEST_ORGANIZING_CANCEL, UPDATE_ORGANIZING_INSERT, SELECT_ROUTE_ROW, UPDATE_ORGANIZING_DISTANCE, UPDATE_MAP, UPDATE_BALANCE_SPECIAL, SEARCHORGS_SELECT_UPDATE, UPDATE_BALANCE_SPECIAL_TOTAL, SELECT_SPECIAL_ROW_TOTAL, UPDATE_ORGANIZE_GET_HDB_DETAIL, } from './constants'
import { SELECT_ROW as SEARCHORGS_SELECT_ROW } from '~stores/pyc/searchOrgs/constants'
import { SELECT_ROW as SEARCHPERS_SELECT_ROW } from '~stores/pyc/searchPers/constants'
import { getCurrentDate, getCurrentDateTime, _Date } from '@utils';
import { HANDLE_POPUP } from '~stores/_base/constants';
import moment from 'moment';

import Config from '@config';
const initState: State = {
    history: [],
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

    view: {

    },
    vehiclePopup: getDefaultVehiclePopup(),
    persPopup: getDefaultPersPopup(),
    vehicleComboxFilter: getDefaultVehicleComboxFilter(),
    persComboxFilter: getDefaultPersComboxFilter(),
    organizingPopup: getDefaultOrganizingPopup(),
    pycTypes: [
        {
            name: 'Nhận quỹ ĐVTLT',
            value: 'Nhận quỹ ĐVTLT',
        }
    ],
    // routeTransportTypes: [
    //     {
    //         name: 'XE CHUYÊN DÙNG',
    //         value: 'Xe chuyên dùng',
    //     },
    //     {
    //         name: 'ĐI BỘ',
    //         value: 'Đi bộ',
    //     }
    // ],
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
                    tableContent2: [],
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
            const data = action.data?.data ? action.data.data?.map(preprocessQueryResult(state)) : [];

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
                        index: (action.page || 0) * Config.numberOfItemsPerPage + index + 1,
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
        case CHANGE_VEHICLE_INPUT:
            return {
                ...state,
                vehiclePopup: {
                    ...state.vehiclePopup,
                    ...action.data,
                },
            }
        case CHANGE_PERS_INPUT:
            return {
                ...state,
                persPopup: {
                    ...state.persPopup,
                    ...action.data,
                },
            }
        case UPDATE_HISTORY:
            const historyData = action.data?.data ? action.data.data?.map(preprocessQueryResult(state)) : [];

            return {
                ...state,
                isLoading: false,
                filters:{
                    ...state.filters,
                    sort: action.sort || (state.filters['sort'] ?? ''),
                },
                history: {
                    ...state.history,
                    data: historyData.map((item, index) => ({
                        ...item,
                        key: item.id,
                        index: (action.page || 0) * Config.numberOfItemsPerPage + index + 1,
                    })),
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

        case SELECT_DUALTABLE_CONTENT_ROW:
            const tableType = `tableContent${action.tableType}`;
            const selectDuableTableRowData = (() => {
                if (state.popupType === 1)
                    return {
                        creatingPopup: {
                            ...state.creatingPopup,
                            [tableType]: state.creatingPopup[tableType].map(mapToNewQueryResult(action.data))
                        }
                    }
                if (state.popupType === 2)
                    return {
                        editingPopup: {
                            ...state.editingPopup,
                            [tableType]: state.editingPopup[tableType].map(mapToNewQueryResult(action.data))
                        }
                    }
                if (state.popupType === 3)
                    return {
                        vehiclePopup: {
                            ...state.vehiclePopup,
                            [tableType]: state.vehiclePopup[tableType].map(mapToNewQueryResult(action.data))
                        }
                    }
                if (state.popupType === 4)
                    return {
                        persPopup: {
                            ...state.persPopup,
                            [tableType]: state.persPopup[tableType].map(mapToNewQueryResult(action.data))
                        }
                    }
            })();
            return {
                ...state,
                ...selectDuableTableRowData,
                special: action.data?.cashOptimizatioDetailModelList,

            }
        case HANDLE_DUALTABLE_MOVE:
            const popupType = ['creatingPopup', 'editingPopup', 'vehiclePopup', 'persPopup'][state.popupType - 1];
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
                    tableContent1: moveNewData[0].map((item, index) => ({ ...item, index: index + 1 })),
                    tableContent2: moveNewData[1].map((item, index) => ({ ...item, index: index + 1 })),
                }
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
        case HANDLE_POPUP:
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
        case SELECT_COMBOX:
            const key1 = action.keys[0];
            const key2 = action.keys[1];
            return {
                ...state,
                // ...pycTypesCheckData(key2, action.data.value),
                [key1]: {
                    ...state[key1],
                    [key2]: action.data,
                    ...currencyTypeCheckData(key2, action.data.value),
                    // ...pycTypesCheckResetData(key2),
                    rejectReason: '',
                },
            }
        case SELECT_ROW:
            const newQueryResult = state.queryResult.data.map(mapToNewQueryResult(action.data))
            const newData = {
                ...mapToNewData(action.data, state),
                cashOptimizatioDetailModelList: action.data?.routeDetailHdb?.map((item) => ({
                    ...item,
                    key: item.id,
                })),
                routeDetailHdbTemp: action.data?.routeDetailHdbTemp?.map((item) => ({
                    ...item,
                    key: item.id,
                })),
                routeDetailOganize: action.data?.routeDetailOganize?.map((item) => ({
                    ...item,
                    key: item.id,
                })).sort((p, n) => +!p.order - +!(n.order) || p?.order - n?.order),
                routeDetailOganizeTemp: action.data?.routeDetailOganizeTemp?.map((item) => ({
                    ...item,
                    key: item.id,
                })).sort((p, n) => +!p.order - +!(n.order) || p?.order - n?.order),
            };
            newData.tableContent1 = newData.tableContent1?.filter(item1 =>
                newData.tableContent2?.filter(item2 => item2.id == item1.id).length == 0);

            return {
                ...state,
                selectedItem: newData,
                editingPopup: newData,
                detailPopup: newData,
                view: newData,
                vehiclePopup: {
                    ...getDefaultVehiclePopup(),
                    routeId: newData.id,
                },
                persPopup: {
                    ...getDefaultPersPopup(),
                    routeId: newData.id,
                },
                queryResult: {
                    ...state.queryResult,
                    data: newQueryResult,
                },
                searchVehiclePersPopup: {
                    ...getDefaultSearchVehiclePersPopup(),
                    ...newData,
                    vehicles: newData.routeDetailVehicle.map(item => ({ ...item, key: item.id })),
                    pers: newData.routeDetailPers.map(item => ({ ...item, key: item.id })),
                },
                organizingPopup: {
                    ...getDefaultOrganizingPopup(),
                    ...newData,
                },
            }

        case REQUEST_SEACHVEHICLEPERS_CANCEL:
            return {
                ...state,
                searchVehiclePersPopup: {
                    ...state.searchVehiclePersPopup,
                    ...getDefaultSearchVehiclePersPopup(),
                    // transportType: {
                    //     text: state.selectedItem?.transportType?.toUpperCase(),
                    //     value: state.selectedItem?.transportType,
                    // },
                    vehicles: state.selectedItem?.routeDetailVehicle.map(item =>
                    ({
                        ...item,
                        key: item.id,
                        ...item.categoryVehicle,
                        ...item.categoryOrgs,
                        ...item.categoryPers,
                        ...item.categoryFunction,
                    })),
                    pers: state.selectedItem?.routeDetailPers?.map(item =>
                    ({
                        ...item,
                        key: item.id,
                        ...item.categoryPers,
                    })),
                },
            }
        case SELECT_HISTORY_ROW:
            const newQueryResultHistory = state.history?.data?.map(mapToNewQueryResult(action.data))
            const newDataHistory = mapToNewData(action.data, state);
            return {
                ...state,
                history: {
                    ...state.history,
                    detailPopup: newDataHistory,
                    data: newQueryResultHistory.map((item, index) => ({
                        ...item,
                        key: item.id,
                        index: (action.page || 0) * Config.numberOfItemsPerPage + index + 1,
                    })),
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
        case UPDATE_PYC:
            const pycData = action.data?.data?.map(item => ({ ...item, key: item.id }));
            return {
                ...state,
                creatingPopup: {
                    ...action.data,
                    ...state.creatingPopup,
                    tableContent1: pycData?.map((item, index) => ({
                        ...item,
                        key: item.id,
                        index: (action.page || 0) * Config.numberOfItemsPerPage + index + 1,
                    })),
                },
                editingPopup: {
                    ...action.data,
                    ...state.editingPopup,
                    tableContent1: pycData?.filter(item1 =>
                        state.editingPopup.tableContent2?.filter(item2 => item2.id == item1.id).length == 0)
                        .map((item, index) => ({
                            ...item,
                            key: item.id,
                            index: (action.page || 0) * Config.numberOfItemsPerPage + index + 1,
                        })),
                },
                pyc: pycData,
            }
        case UPDATE_VEHICLE_DATA:
            return {
                ...state,
                vehiclePopup: {
                    ...action.data,
                    ...state.vehiclePopup,
                    tableContent1: action.data?.data?.filter(item1 =>
                        state.vehiclePopup?.tableContent2.filter(item2 => item2.id == item1.id).length == 0)
                        .map((item, index) => ({ ...item, key: item.id, index: (action.page || 0) * Config.numberOfItemsPerPage + index + 1, })),
                    currentPage: action?.page || 0,
                    sort: action.sort || (state.filters['sort'] ?? ''),
                },
            }
        case UPDATE_PERS_DATA:
            return {
                ...state,
                persPopup: {
                    ...action.data,
                    ...state.persPopup,
                    tableContent1: action.data?.data?.filter(item1 =>
                        state.persPopup?.tableContent2.filter(item2 => item2.id == item1.id).length == 0)
                        .map((item, index) => ({ ...item, key: item.id, index: (action.page || 0) * Config.numberOfItemsPerPage + index + 1, })),
                    currentPage: action?.page || 0,
                    sort: action.sort || (state.filters['sort'] ?? ''),
                },
            }
        case SELECT_VEHICLE:
            return {
                ...state,
                searchVehiclePersPopup: {
                    ...state.searchVehiclePersPopup,
                    vehicles: state.vehiclePopup.tableContent2?.map(item => ({ ...item, isSelected: false })),
                }
            }
        case SELECT_PERS:
            return {
                ...state,
                searchVehiclePersPopup: {
                    ...state.searchVehiclePersPopup,
                    pers: state.persPopup.tableContent2?.map(item => ({ ...item, isSelected: false })),
                }
            }
        case REQUEST_VEHICLE_CANCEL:
            return {
                ...state,
                vehiclePopup: {
                    ...getDefaultVehiclePopup(),
                    tableContent2: state.searchVehiclePersPopup.vehicles ?? [],
                },
            }
        case REQUEST_PERS_CANCEL:
            return {
                ...state,
                persPopup: {
                    ...getDefaultPersPopup(),
                    tableContent2: state.searchVehiclePersPopup.pers ?? [],
                },
            }
        case UPDATE_ORGANIZING:
            const routeDetailHdbGroupIdList = state.organizingPopup.routeDetailOganizeTemp.map(item => item.routeDetailHdbGroupId || undefined);
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    ...action.data?.data,
                    routeDetailVehicle: action.data?.data?.routeDetailVehicle,
                    routeDetailPers: action.data?.data?.routeDetailPers,
                    routeCashOptimization: action.data?.data?.routeCashOptimization,
                    categoryOrgs: action.data?.data?.categoryOrgs,
                    routeDetailOganizeTemp: action.data?.data?.routeDetailOganizeTemp?.map((item) => ({
                        ...item,
                        key: item.id,
                    })).sort((p, n) => +!p.order - +!(n.order) || p?.order - n?.order),
                    routeDetailHdbTemp2: state.organizingPopup['routeDetailHdbTemp']?.filter(item => {
                        return !routeDetailHdbGroupIdList.includes(item.groupId)
                    }
                    ),
                },
            }
        case REQUEST_ORGANIZING_CHECK_STOP_POINT:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    ...getDefaultOrganizingPopup(),
                    stopPointType: action.data,
                    routeDetailOganizeTemp: state.organizingPopup.routeDetailOganizeTemp,
                    selectedRouteDetailOganize: {},

                },
            }
        case UPDATE_ORGANIZING_STOP_POINT:
            if (state.organizingPopup.stopPointType?.value === "Điểm dừng trả quỹ của ĐVTLT")
                return {
                    ...state,
                    organizingPopup: {
                        ...state.organizingPopup,
                        ...action.data?.data,
                        id: state.organizingPopup['id'],
                        stopPointType: state.organizingPopup.stopPointType,
                        routeDetailOganizeTemp: state.organizingPopup.routeDetailOganizeTemp,
                        routeDetailHdbTemp2: action.data?.data?.balanceHdbModelList?.map(item => ({
                            ...item,
                            type: 'Trả quỹ ĐVTLT',
                            currencyType: item.currencytype,
                            goldType: item.goldtype,
                        })),
                    },
                }
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    ...action.data?.data,
                    id: state.organizingPopup['id'],
                    stopPointType: state.organizingPopup.stopPointType,
                    routeDetailOganizeTemp: state.organizingPopup.routeDetailOganizeTemp,
                },
            }
        case SELECT_ROW_DESTINATION_POINT:
            const destinationPointData = (() => {
                state.organizingPopup['categoryOrgs'].isSelected = false;
                const data = {
                    routeDetailVehicle: state.organizingPopup['routeDetailVehicle'].map(item => ({ ...item, isSelected: false })),
                    routeDetailPers: state.organizingPopup['routeDetailPers'].map(item => ({ ...item, isSelected: false })),
                    routeCashOptimization: state.organizingPopup['routeCashOptimization'].map(item => ({ ...item, isSelected: false })),
                    categoryOrgs: state.organizingPopup['categoryOrgs'],
                    cashOptimizationId: '',
                };
                if (action.tableType === 1) {
                    data.routeDetailVehicle = data.routeDetailVehicle?.map(mapToNewQueryResult(action.data));
                    data['selectedItem'] = {
                        tableType: action.tableType,
                        destinationPointName: action.data.categoryVehicle?.categoryOrgs?.orgsName,
                        destinationPointAddress: action.data.categoryVehicle?.categoryOrgs?.orgsAddress,
                        selectedData: action.data,
                        selectedAttr: {
                            vehicleCode: action.data.categoryVehicle?.vehicleCode,
                        },
                    }
                }
                if (action.tableType === 2) {
                    data.routeDetailPers = data.routeDetailPers?.map(mapToNewQueryResult(action.data));
                    data['selectedItem'] = {
                        tableType: action.tableType,
                        destinationPointName: action.data.categoryPers?.categoryOrgs?.orgsName,
                        destinationPointAddress: action.data.categoryPers?.categoryOrgs?.orgsAddress,
                        selectedData: action.data,
                        selectedAttr: {
                            persCode: action.data.categoryPers?.persCode,
                        },
                    }
                }
                if (action.tableType === 3) {
                    data.routeCashOptimization = data.routeCashOptimization?.map(mapToNewQueryResult(action.data));
                    data['selectedItem'] = {
                        tableType: action.tableType,
                        destinationPointName: action.data.destinationName,
                        destinationPointAddress: action.data.destinationAddress,
                        cashOptimizationId: action.data.cashOptimization?.id,
                        selectedData: action.data,
                        selectedAttr: {
                        }
                    }
                }
                if (action.tableType === 4) {
                    data.categoryOrgs.isSelected = true;
                    data['selectedItem'] = {
                        tableType: action.tableType,
                        destinationPointName: action.data.orgsName,
                        destinationPointAddress: action.data.orgsAddress,
                        selectedData: action.data,
                        selectedAttr: {
                            orgsCode: action.data.orgsCode,
                        },
                    }
                }
                return data;
            })();
            if (state.organizingPopup.stopPointType.text == 'Điểm dừng xử lý NV theo PYC')
                return {
                    ...state,
                    organizingPopup: {
                        ...state.organizingPopup,
                        ...destinationPointData,
                        routeDetailHdbTemp2: action.data?.cashOptimization?.cashOptimizatioDetailModelList,
                    },
                    special: action.data?.cashOptimization?.cashOptimizatioDetailModelList,

                }
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    ...destinationPointData,
                },
                special: action.data?.cashOptimization?.cashOptimizatioDetailModelList,
            }
        case SELECT_DESTINATION_POINT:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    ...state.organizingPopup['selectedItem'],
                }
            }
        case REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL:
            state.organizingPopup['categoryOrgs'].isSelected = false;
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    routeDetailVehicle: state.organizingPopup['routeDetailVehicle']?.map(item => ({ ...item, isSelected: false })),
                    routeDetailPers: state.organizingPopup['routeDetailPers']?.map(item => ({ ...item, isSelected: false })),
                    routeCashOptimization: state.organizingPopup['routeCashOptimization']?.map(item => ({ ...item, isSelected: false })),
                    selectedItem: null,
                }
            }

        case UPDATE_SPECIAL_DATA:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    cashOptimizatioDetailModelList: action.data,
                },
            }

        case CHANGE_ORGANIZING_INPUT:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    ...action.data,
                },
            }
        case SELECT_SPECIAL_ROW:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    selectedSpecial: action.data,
                    cashOptimizatioDetailModelList: state.organizingPopup.cashOptimizatioDetailModelList?.map(mapToNewQueryResult(action.data))
                }
            }
        case SELECT_SPECIAL_ROW_TOTAL:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    selectedSpecial: action.data,
                    routeDetailHdbTemp2: state.organizingPopup['routeDetailHdbTemp2']?.map(mapToNewQueryResult(action.data))
                }
            }
        case SELECT_ROUTE_ROW:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    selectedRouteDetailOganize: action.data,
                    routeDetailHdbTemp2: state.organizingPopup['routeDetailHdbTemp']?.filter(item => item.groupId === action.data.routeDetailHdbGroupId),
                    routeDetailOganizeTemp: state.organizingPopup.routeDetailOganizeTemp?.map(mapToNewQueryResult(action.data)).sort((p, n) => +!p.order - +!(n.order) || p?.order - n?.order)
                }
            }
        case REQUEST_ORGANIZING_CANCEL:
            return {
                ...state,
                organizingPopup: {
                    ...getDefaultOrganizingPopup(),
                    ...state.selectedItem,
                },
            }
        case UPDATE_ORGANIZING_INSERT:
            const selectedRouteDetailOganizeOrder = state.organizingPopup['selectedRouteDetailOganize']?.order;
            if (state.organizingPopup['selectedRouteDetailOganize']) {
                if (action.buttonType === 'UP' && selectedRouteDetailOganizeOrder > 1) {
                    state.organizingPopup['selectedRouteDetailOganize'].order -= 1;
                }
                if (action.buttonType === 'DOWN' && selectedRouteDetailOganizeOrder < state.organizingPopup['routeDetailOganize']?.length) {
                    state.organizingPopup['selectedRouteDetailOganize'].order += 1;
                }
            }
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    selectedRouteDetailOganize: state.organizingPopup['selectedRouteDetailOganize'],
                    routeDetailOganize: action.data?.map(item => ({
                        ...item,
                        key: item.id,
                        routeDetailOganizeStatus: 'ACT',
                    })),
                },
            }
        case UPDATE_ORGANIZING_DISTANCE:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    kcDepartureToDestination: action.data?.data?.distance,
                },
            }
        case UPDATE_MAP:
            return {
                ...state,
                mapHtml: action.data,
            }
        case UPDATE_BALANCE_SPECIAL:
            return {
                ...state,
                balanceSpecial: action.data?.data,
            }
        case UPDATE_BALANCE_SPECIAL_TOTAL:
            return {
                ...state,
                balanceSpecial: action.data?.data,
            }
        case UPDATE_ORGANIZE_GET_HDB_DETAIL:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    routeDetailHdbTemp2: action?.data?.data?.map(item => ({ ...item, quanlity: -item?.quanlity })),
                }
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
        reasonType: {
            text: 'Lý do hủy',
            value: '',
        },
        rejectReason: '',
    }
}

function getDefaultSearchVehiclePersPopup() {
    return {
        transportType: {
            text: 'XE CHUYÊN DÙNG',
            value: 'Xe chuyên dùng',
        },
        vehicles: [],
        pers: [],
    }
}
function getDefaultOrganizingPopup() {
    return {
        stopPointType: {
            text: '',
            value: '',
        },
        routeDetailOganize: [],
        routeDetailOganizeTemp: [],
        departurePointName: '',
        departurePointAddress: '',
        destinationPointName: '',
        destinationPointAddress: '',
        cashOptimizationId: '',
        kcDepartureToDestination: '',
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
        // cashOptimizatioDetailModelList: [],
        // routes: [],
    }
}
function getDefaultVehiclePopup() {
    return {
        routeId: '',
        searchType: {
            text: 'Xe thuộc ĐVTLT',
            value: 'XE_DVTLT',
        },
        searchValue: '',
        tableContent1: [],
        tableContent2: [],
    }
}
function getDefaultPersPopup() {
    return {
        routeId: '',
        searchType: {
            text: 'Nhân viên thuộc ĐVTLT',
            value: 'XE_DVTLT',
        },
        searchValue: '',
        tableContent1: [],
        tableContent2: [],
    }
}

function getDefaultVehicleComboxFilter() {
    return [
        {
            text: 'Xe thuộc ĐVTLT',
            value: 'XE_DVTLT',
        },
        {
            text: 'Xe thuộc các ĐV trong LT nhưng không phải ĐVTLT',
            value: 'XE_DVYCDQ_DVDQ',
        },
        {
            text: 'Xe thuộc MÃ ĐVQL',
            value: 'MA_DVQL',
        },
        {
            text: 'Xe thuộc TÊN ĐVQL',
            value: 'TEN_DVQL',
        },
        {
            text: 'SĐT lái xe',
            value: 'SDT_LX',
        },
    ]
}

function getDefaultPersComboxFilter() {
    return [
        {
            text: 'Nhân viên thuộc ĐVTLT',
            value: 'XE_DVTLT',
        },
        {
            text: 'Nhân viên thuộc các ĐV trong LT nhưng không phải ĐVTLT',
            value: 'XE_DVYCDQ_DVDQ',
        },
        {
            text: 'Nhân viên thuộc MÃ ĐVQL',
            value: 'MA_DVQL',
        },
        {
            text: 'Nhân viên thuộc TÊN ĐVQL',
            value: 'TEN_DVQL',
        },
        {
            text: 'SĐT Nhân viên',
            value: 'SDT_LX',
        },
    ]
}

function getDefaultFilters() {
    return {
        radio: '1',
        dateFrom: moment().format('DD/MM/YYYY'),
        dateTo: moment().format('DD/MM/YYYY'),
        orgsRole: {
            text: 'Vai trò của ĐV',
            value: '',
        },
        orgs: {
            text: '',
            value: '',
        },
        status: {
            text: 'All',
            value: 'All',
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
        // tableContent1: state.pyc.filter(item1 =>
        //     tableContent2.filter(item2 => item2.id == item1.id).length == 0),
        // tableContent2,
        startTime: moment(item.startTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
    }
}

const mapToNewQueryResult = (selectedItem) => (item, index) => {
    // const isSelectedItem = item.key === selectedItem.key;
    const isSelectedItem = (item.id && (item.id === selectedItem.id)) || (item.key && (item.key === selectedItem.key));
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

const preprocessQueryResult = (state) => (data, index) => ({
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
    tableContent1: state?.pyc?.filter(item1 =>
        data?.routeCashOptimization?.filter(item2 => item2.id == item1.id).length == 0)
        .map(item => ({ ...item, key: item.id })).map(item => ({ ...item, key: item.key })),
    tableContent2: data?.routeCashOptimization?.map(item => ({ ...item, ...item.cashOptimization, key: item.key })),

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
