import { REQUEST_CREATING, REQUEST_EDITING, REQUEST_QUERY, UPDATE_HISTORY, FETCH_DATA, UPDATE_DATA, SELECT_AREA_FILTER, SELECT_ATMCDMSTATUS, State, REQUEST_RESET, CHANGE_CREATING_INPUT, CHANGE_EDITING_INPUT, SELECT_AREA_CREATING, SELECT_AREA_EDITING, SELECT_ORGS_PARENT_CREATING, SELECT_ORGS_PARENT_EDITING, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, DONE_CREATING, SELECT_ROW, CHANGE_ORGS_CODE_FILTER, SELECT_HISTORY_ROW, UPDATE_HISTORY_DETAIL, SEARCHORGS_SELECT_UPDATE } from './constants'
import { SELECT_ROW as SEARCHORGS_SELECT_ROW } from '~stores/authority/searchOrgs/constants'
import * as Base from '~/_settings';
import { getCurrentDate, _Date } from '@utils';

import Config from '@config';
const initState: State = {
    history: [],
    detailPopup: [],
    filters: {
        ...getDefaultFilters(),
        queryButton: {
            isLoading: false,
        },
    },
    editingButton: {
        isDisabled: true,
    },
    queryResult: {
        total: 0,
    },
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
        case SELECT_AREA_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    area: action.data,
                },
            }
        case SELECT_ATMCDMSTATUS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    atmCdmStatus: action.data,
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
        case SELECT_HISTORY_ROW:
            const newQueryResultHistory = state.history.data.map(mapToNewQueryResult(action.data))
            return {
                ...state,
                selectedItem: action.data,
                history: {
                    ...state.history,
                    data: newQueryResultHistory,
                }
            }
        case UPDATE_HISTORY_DETAIL:
            const historyDetailData = action.data?.data ? action.data.data?.map(preprocessQueryResult) : [];
            return {
                ...state,
                isLoading: false,
                history: {
                    ...state.history,
                    data: historyDetailData,
                    total: action.data.total,
                }
            }
        case CHANGE_ORGS_CODE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    orgsCode: action.data.orgsCode,
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
        case SEARCHORGS_SELECT_ROW:
            return {
                ...state,
                selectedOrgs: {
                    text: action.data.orgsName,
                    value: action.data.id,
                },
            }
        case SEARCHORGS_SELECT_UPDATE:
            return {
                ...state,
                creatingPopup: {
                    ...state.creatingPopup,
                    orgsParentSelected: {
                        ...state['selectedOrgs'],
                    }
                },
                editingPopup: {
                    ...state.editingPopup,
                    orgsParentSelected: {
                        ...state['selectedOrgs'],
                    }
                },
                selectedItem: {
                    ...state.selectedItem,
                    orgsParentSelected: {
                        ...state['selectedOrgs'],
                    }
                },
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
            text: '',
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
        orgsCode: '',
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
            text: item.categoryOrgsParent?.orgsName,
            value: item.categoryOrgsParent?.id,
        }
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
    createddate: _Date.getDate(data.createddate),
    updateddate: _Date.getDateTime(data.updateddate),
})