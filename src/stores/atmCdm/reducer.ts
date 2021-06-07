import { REQUEST_CREATING, REQUEST_EDITING, REQUEST_QUERY, FETCH_DATA, UPDATE_DATA, SELECT_UNITNAME, SELECT_ATMCDMSTATUS, State, REQUEST_RESET, CHANGE_CREATING_INPUT, CHANGE_EDITING_INPUT, SELECT_ORGS_CODE_CREATING, SELECT_ORGS_CODE_EDITING, SELECT_ATMCDM_STATUS_CREATING, SELECT_ATMCDM_STATUS_EDITING, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, DONE_CREATING, SELECT_ROW, UPDATE_HISTORY } from './constants'
import * as Base from '~/_settings';

const initState: State = {
    history: [],
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
            const queryResult = action.queryResult ? action.queryResult : [];
            return {
                ...state,
                isLoading: false,
                queryResult: [...queryResult],
            }
        case SELECT_UNITNAME:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    managementUnitName: action.filter,
                },
                managementUnitName: action.filter.text,
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
        case SELECT_ORGS_CODE_CREATING:
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    orgsCodeSelected: action.data,
                },
            }
        case SELECT_ORGS_CODE_EDITING:
            return {
                ...state,
                selectedItem: {
                    ...state.selectedItem,
                    orgsCodeSelected: action.data,
                },
            }
        case SELECT_ATMCDM_STATUS_CREATING:
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    atmCdmSelected: action.data,
                },
            }
        case SELECT_ATMCDM_STATUS_EDITING:
            return {
                ...state,
                selectedItem: {
                    ...state.selectedItem,
                    atmCdmSelected: action.data,
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
        orgsCodeSelected: {
            text: 'Tên đơn vị quản lý',
            value: '',
        },
        atmCdmSelected: {
            text: 'Trạng thái ATM/CDM',
            value: '',
        },
    }
}
function getDefaultFilters() {
    return {
        managementUnitName: {
            text: 'Tên đơn vị quản lý',
            value: '',
        },
        atmCdmStatus: {
            text: 'Trạng thái ATM/CDM',
            value: '',
        },
    }
}

const mapToNewData = (item) => {
    return {
        ...item,
        orgsCodeSelected: {
            text: item.categoryOrgs.orgsName,
            value: item.categoryOrgs.id,
        },
        atmCdmSelected: {
            text: item.atmStatus,
            value: item.atmStatus,
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