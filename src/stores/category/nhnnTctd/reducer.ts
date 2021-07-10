import { REQUEST_CREATING, REQUEST_EDITING, CHANGE_TYPE_FILTER, REQUEST_QUERY, FETCH_DATA, UPDATE_DATA, SELECT_ORGS_FILTER, SELECT_NHNNTCTD_TYPE, State, REQUEST_RESET, CHANGE_CREATING_INPUT, CHANGE_EDITING_INPUT, SELECT_ORGS_CODE_CREATING, SELECT_ORGS_CODE_EDITING, SELECT_NHNNTCTD_TYPE_CREATING, SELECT_NHNNTCTD_TYPE_EDITING, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, DONE_CREATING, SELECT_ROW, UPDATE_HISTORY } from './constants'
import * as Base from '~/_settings';
import { _Date, getCurrentDate } from '@utils';

const initState: State = {
    history: [],
    filters: {
        ...getDefaultFilters(),
        queryButton: {
            isLoading: false,
        },
    },
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
                    orgsId: action.data,
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
                    orgsSelected: action.data,
                },
            }
        case SELECT_ORGS_CODE_EDITING:
            return {
                ...state,
                selectedItem: {
                    ...state.selectedItem,
                    orgsSelected: action.data,
                },
            }
        case SELECT_NHNNTCTD_TYPE_CREATING:
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    nnhnTctdTypeSelected: action.data,
                },
            }
        case SELECT_NHNNTCTD_TYPE_EDITING:
            return {
                ...state,
                selectedItem: {
                    ...state.selectedItem,
                    nnhnTctdTypeSelected: action.data,
                },
            }
        case SELECT_ROW:
            const newQueryResult = state.queryResult.data.map(mapToNewQueryResult(action.data))
            const newData = mapToNewData(action.data)
            return {
                ...state,
                selectedItem: newData,
                editingPopup: newData,
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
        case CHANGE_TYPE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    nnhnTctdCode: action.data.nnhnTctdCode,
                },
            }
        default:
            return state
    }
}

function getDefaultPopupActions() {
    return {
        nnhnTctdTypeSelected: {
            text: 'Phân loại NHNN/TCTD',
            value: '',
        },
        orgsSelected: {
            text: 'Tên đơn vị quản lý',
            value: '',
        },
    }
}
function getDefaultFilters() {
    return {
        orgsId: {
            text: 'Tên đơn vị quản lý',
            value: '',
        },
        nnhnTctdCode: '',
    }
}

const mapToNewData = (item) => {
    return {
        ...item,
        nnhnTctdTypeSelected: {
            text: item.nnhnTctdType,
            value: item.nnhnTctdType,
        },
        orgsSelected: {
            text: item.categoryOrgs.orgsName,
            value: item.categoryOrgs.id,
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

const preprocessQueryResult = (data) => ({
    ...data,
    createddate: getCurrentDate(data.createddate),
    updateddate: getCurrentDate(data.updateddate),
})