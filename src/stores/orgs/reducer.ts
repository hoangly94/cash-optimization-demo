import { REQUEST_CREATING, REQUEST_EDITING, REQUEST_QUERY, UPDATE_HISTORY, FETCH_DATA, UPDATE_DATA, SELECT_AREA_FILTER, SELECT_ATMCDMSTATUS, State, REQUEST_RESET, CHANGE_CREATING_INPUT, CHANGE_EDITING_INPUT, SELECT_AREA_CREATING, SELECT_AREA_EDITING, SELECT_ORGS_PARENT_CREATING, SELECT_ORGS_PARENT_EDITING, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, DONE_CREATING, SELECT_ROW, CHANGE_ORGS_CODE_FILTER } from './constants'
import * as Base from '~/_settings';
import {getCurrentDate} from '@utils';

const initState: State = {
    history:[],
    filters: {
        ...getDefaultFilters(),
        queryButton: {
            isLoading: false,
        },
    },
    queryResult: [],
    selectedItem: {
        id: '',
        data: {},
        editData: {},
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
            const queryResult = action.queryResult ? action.queryResult.map(preprocessQueryResult) : [];
            return {
                ...state,
                isLoading: false,
                queryResult: [
                    ...queryResult
                ],
            }
        case SELECT_AREA_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    area: action.filter,
                },
                // managementUnitName: action.filter.text,
            }
        case SELECT_ATMCDMSTATUS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    atmCdmStatus: action.filter,
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
                selectedItem: {
                    ...state.selectedItem,
                    ...action.data,
                },
            }
        case SELECT_AREA_CREATING:
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    areaSelected: action.data,
                },
            }
        case SELECT_AREA_EDITING:
            return {
                ...state,
                selectedItem: {
                    ...state.selectedItem,
                    areaSelected: action.data,
                },
            }
        case SELECT_ORGS_PARENT_CREATING:
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    orgsParentSelected: action.data,
                },
            }
        case SELECT_ORGS_PARENT_EDITING:
            return {
                ...state,
                selectedItem: {
                    ...state.selectedItem,
                    orgsParentSelected: action.data,
                },
            }
        case SELECT_ROW:
            const newQueryResult = state.queryResult.map(mapToNewQueryResult(action.data))
            const newData = mapToNewData(action.data)
            return {
                ...state,
                selectedItem: newData,
                editingPopup: newData,
                queryResult: newQueryResult,
            }
        case CHANGE_ORGS_CODE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    orgsCode: action.data,
                },
            }
        case UPDATE_HISTORY:
            const history = action.data ? action.data : [];
            return {
                ...state,
                history: history,
            }
        default:
            return state
    }
}

function getDefaultPopupActions() {
    return {
        areaSelected: {
            text: 'Tên Cụm',
            value: '',
        },
        orgsParentSelected: {
            text: 'Tên ĐVQL',
            value: '',
        },
    }
}
function getDefaultFilters() {
    return {
        area: {
            text: 'Tên cụm',
            value: 0,
        },
        orgsCode: 0,
    }
}

const mapToNewData = (item) => {
    return {
        ...item,
        areaSelected: {
            text: item.areaName,
            value: item.areaCode,
        },
        orgsParentSelected: {
            text: item.orgsParentId,
            value: item.orgsParentId,
        }
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

const preprocessQueryResult = (data)=>({
    ...data,
    createddate: getCurrentDate(data.createddate),
    updateddate: getCurrentDate(data.updateddate),
})