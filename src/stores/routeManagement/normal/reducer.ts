import { REQUEST_EDITING, CHANGE_CODE_FILTER, REQUEST_QUERY, FETCH_DATA, UPDATE_DATA, SELECT_ORGS_FILTER, SELECT_NHNNTCTD_TYPE, State, REQUEST_RESET, CHANGE_CREATING_INPUT, CHANGE_EDITING_INPUT, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, DONE_CREATING, SELECT_ROW, UPDATE_HISTORY, SELECT_REGION_CREATING, SELECT_REGION_EDITING, CHANGE_RADIO_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO, SELECT_STATUS_FILTER, INPUT_DATE_FROM_CREATING, INPUT_DATE_TO_CREATING, SEARCH_PERS, SELECT_DUALTABLE_CONTENT_ROW, HANDLE_DUALTABLE_MOVE, SET_POPUP_TYPE, INPUT_DATE_FROM_EDITING, INPUT_DATE_TO_EDITING, SELECT_COMBOX, HANDLE_SPECIAL_ADD, SELECT_SPECIAL_ROW, HANDLE_SPECIAL_DELETE, SELECT_COMBOX_FILTER, UPDATE_SPECIAL_DATA, UPDATE_ORGS_CHILDREN, SELECT_HISTORY_ROW, UPDATE_ORGSSEARCHING_DISTANCE, REQUEST_ORGSSEARCHING_CANCEL, RESET_FILTER, UPDATE_PYC, REQUEST_SEACHVEHICLEPERS_CANCEL, SELECT_COMBOX_SEARCHVEHICLEPERS, CHANGE_VEHICLE_INPUT, CHANGE_PERS_INPUT, UPDATE_VEHICLE_DATA, SELECT_VEHICLE, UPDATE_PERS_DATA, SELECT_PERS, REQUEST_VEHICLE_CANCEL, REQUEST_PERS_CANCEL, UPDATE_ORGANIZING, REQUEST_ORGANIZING_CHECK_STOP_POINT, UPDATE_ORGANIZING_STOP_POINT, SELECT_ROW_DESTINATION_POINT, SELECT_DESTINATION_POINT, REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL, CHANGE_ORGANIZING_INPUT, REQUEST_ORGANIZING_CANCEL, UPDATE_ORGANIZING_INSERT, } from './constants'
import { SELECT_ROW as SEARCHORGS_SELECT_ROW } from '~stores/pyc/searchOrgs/constants'
import { SELECT_ROW as SEARCHPERS_SELECT_ROW } from '~stores/pyc/searchPers/constants'
import { getCurrentDate, getCurrentDateTime, _Date } from '@utils';
import { UPDATE_CONFIG } from '~stores/dashboardRoot/constants';
import { HANDLE_POPUP } from '~stores/_base/constants';
import { ItemChildrenType } from '~/components/commons/list';
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

    view: {

    },
    vehiclePopup: getDefaultVehiclePopup(),
    persPopup: getDefaultPersPopup(),
    vehicleComboxFilter: getDefaultVehicleComboxFilter(),
    persComboxFilter: getDefaultPersComboxFilter(),
    organizingPopup: getDefaultOrganizingPopup(),
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
            console.log('==============');
            console.log(action);
            console.log({
                ...state,
                editingPopup: {
                    ...state.editingPopup,
                    ...action.data,
                },
            });
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
            const historyData = action.data?.data ? action.data.data?.map(preprocessQueryResult) : [];
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
                special: action.data.cashOptimizatioDetailModelList,
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
                    transportType: {
                        text: state.selectedItem.transportType.toUpperCase(),
                        value: state.selectedItem.transportType,
                    },
                    vehicles: state.selectedItem.routeDetailVehicle.map(item =>
                    ({
                        ...item,
                        key: item.id,
                        ...item.categoryVehicle,
                        ...item.categoryOrgs,
                        ...item.categoryPers,
                        ...item.categoryFunction,
                    })),
                    pers: state.selectedItem.routeDetailPers.map(item =>
                    ({
                        ...item,
                        key: item.id,
                        ...item.categoryPers,
                    })),
                },
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
                    ...action.data,
                    ...state.creatingPopup,
                    tableContent1: pycData,
                },
                editingPopup: {
                    ...action.data,
                    ...state.editingPopup,
                    tableContent2: pycData,
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
                        .map(item => ({ ...item, key: item.id })),
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
                        .map(item => ({ ...item, key: item.id })),
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
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    ...action.data?.data,
                    routeDetailVehicle: action.data?.data?.routeDetailVehicle,
                    routeDetailPers: action.data?.data?.routeDetailPers,
                    routeCashOptimization: action.data?.data?.routeCashOptimization,
                    categoryOrgs: action.data?.data?.categoryOrgs,
                },
            }
        case REQUEST_ORGANIZING_CHECK_STOP_POINT:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    ...getDefaultOrganizingPopup(),
                    stopPointType: action.data,
                },
            }
        case UPDATE_ORGANIZING_STOP_POINT:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    ...action.data?.data,
                    id: state.organizingPopup['id'],
                    stopPointType: state.organizingPopup.stopPointType,
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
                };
                if (action.tableType === 1) {
                    data.routeDetailVehicle = data.routeDetailVehicle?.map(mapToNewQueryResult(action.data));
                    data['selectedItem'] = {
                        destinationPointName: action.data.categoryVehicle?.categoryOrgs?.orgsName,
                        destinationPointAddress: action.data.categoryVehicle?.categoryOrgs?.orgsAddress,
                    }
                }
                if (action.tableType === 2) {
                    data.routeDetailPers = data.routeDetailPers?.map(mapToNewQueryResult(action.data));
                    data['selectedItem'] = {
                        destinationPointName: action.data.categoryPers?.categoryOrgs?.orgsName,
                        destinationPointAddress: action.data.categoryPers?.categoryOrgs?.orgsAddress,
                    }
                }
                if (action.tableType === 3) {
                    data.routeCashOptimization = data.routeCashOptimization?.map(mapToNewQueryResult(action.data));
                    data['selectedItem'] = {
                        destinationPointName: action.data.cashOptimization?.orgsName,
                        destinationPointAddress: action.data.cashOptimization?.orgsName,
                        cashOptimizationId: action.data.cashOptimization?.id,
                    }
                }
                if (action.tableType === 4) {
                    data.categoryOrgs.isSelected = true;
                    data['selectedItem'] = {
                        destinationPointName: action.data.orgsName,
                        destinationPointAddress: action.data.orgsAddress,
                    }
                }
                return data;
            })();
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    ...destinationPointData,
                },
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
            // const key = state.popupType == 1 ? 'creatingPopup' : 'selectedItem';
            const cashOptimizatioDetailModelList = state.organizingPopup?.cashOptimizatioDetailModelList;
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    cashOptimizatioDetailModelList: [
                        ...state.organizingPopup?.cashOptimizatioDetailModelList,
                        {
                            key: cashOptimizatioDetailModelList.length ? cashOptimizatioDetailModelList[cashOptimizatioDetailModelList.length - 1]['key'] + 1 : 1,
                            type: state.organizingPopup?.type?.value,
                            currencyType: state.organizingPopup?.currencyType?.value,
                            goldType: state.organizingPopup?.goldType?.value,
                            quanlity: state.organizingPopup?.quanlity,
                            attribute: state.organizingPopup?.attribute?.value,
                        },
                    ],
                },
            }
        case HANDLE_SPECIAL_DELETE:
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    cashOptimizatioDetailModelList: state.organizingPopup.cashOptimizatioDetailModelList.filter(item => !item['isSelected']),
                }
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
                    cashOptimizatioDetailModelList: state.organizingPopup.cashOptimizatioDetailModelList?.map(mapToNewQueryResult(action.data))
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
            console.log('======');
            console.log([
                ...state.organizingPopup.routes,
                {
                    routeStatus: state.organizingPopup['routeStatus'],
                    stopPointType: state.organizingPopup.stopPointType,
                    departurePointName: state.organizingPopup.departurePointName,
                    departurePointAddress: state.organizingPopup.departurePointAddress,
                    destinationPointName: state.organizingPopup.destinationPointName,
                    destinationPointAddress: state.organizingPopup.destinationPointAddress,
                    kcDepartureToDestination: state.organizingPopup.kcDepartureToDestination,
                    model: state.organizingPopup['routeCashOptimization'][0]?.cashOptimization.model,
                },
            ]);
            return {
                ...state,
                organizingPopup: {
                    ...state.organizingPopup,
                    routes: [
                        ...state.organizingPopup.routes,
                        {
                            routeStatus: state.organizingPopup['routeStatus'],
                            stopPointType: state.organizingPopup.stopPointType,
                            departurePointName: state.organizingPopup.departurePointName,
                            departurePointAddress: state.organizingPopup.departurePointAddress,
                            destinationPointName: state.organizingPopup.destinationPointName,
                            destinationPointAddress: state.organizingPopup.destinationPointAddress,
                            kcDepartureToDestination: state.organizingPopup.kcDepartureToDestination,
                            model: state.organizingPopup['routeCashOptimization'][0]?.cashOptimization.model,
                        },
                    ],
                },
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
            text: '',
            value: '',
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
        cashOptimizatioDetailModelList: [],
        routes: [],
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
            text: 'SĐT lái xe',
            value: 'SDT_LX',
        },
    ]
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
        // tableContent1: state.pyc.filter(item1 =>
        //     tableContent2.filter(item2 => item2.id == item1.id).length == 0),
        // tableContent2,
        startTime: moment(item.startTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY hh:mm:ss A'),
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
