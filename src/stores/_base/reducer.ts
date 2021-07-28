import { State, HANDLE_BUTTON, HANDLE_POPUP, ADD_NOTI_ERROR, ADD_NOTI_SUCCESS, REMOVE_LAST_NOTI, REQUEST_NEW_BREACURMBS } from './constants'

const initState: State = {
    buttons: {
        'orgs': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'atmCdm': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'nhnnTctd': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'vehicle': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'person': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'title': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'currency': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'priority': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'region': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'area': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'function': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'searchPers': {
            'select': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'searchOrgs': {
            'select': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'registration': {
            'select': {
                isDisabled: true,
            },
            'edit': {
                isDisabled: true,
            },
            'detail': {
                isDisabled: true,
            },
            'validate': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'pycSearchPers': {
            'select': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'pycSearchOrgs': {
            'select': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'pycSearchOrgs2': {
            'select': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'pycRegistration': {
            'select': {
                isDisabled: true,
            },
            'edit': {
                isDisabled: true,
            },
            'detail': {
                isDisabled: true,
            },
            'historyDetail': {
                isDisabled: true,
            },
            'validate': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'specialDeleteCreating': {
                isDisabled: true,
            },
            'specialDeleteEditing': {
                isDisabled: true,
            },
            'orgsSearching': {
                isDisabled: true,
            },
        },

        'routeManagement': {
            'select': {
                isDisabled: true,
            },
            'edit': {
                isDisabled: true,
            },
            'detail': {
                isDisabled: true,
            },
            'historyDetail': {
                isDisabled: true,
            },
            'validate': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
            'specialDeleteCreating': {
                isDisabled: true,
            },
            'specialDeleteEditing': {
                isDisabled: true,
            },
            'orgsSearching': {
                isDisabled: true,
            },
        },
    },
    popups: {
        'orgs': {
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'atmCdm': {
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'nhnnTctd': {
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'vehicle': {
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'person': {
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'title': {
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'currency': {
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'priority': {
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'region': {
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'area': {
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'function': {
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'registration': {
            'searchOrgs': {
                isShown: false,
            },
            'searchPers': {
                isShown: false,
            },
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'detail': {
                isShown: false,
            },
            'validate': {
                isShown: false,
            },
            'historyDetail': {
                isDisabled: true,
            },
        },
        'pycRegistration': {
            'pycSearchOrgs': {
                isShown: false,
            },
            'pycSearchOrgs2': {
                isShown: false,
            },
            'pycSearchPers': {
                isShown: false,
            },
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'detail': {
                isShown: false,
            },
            'historyDetail': {
                isShown: false,
            },
            'validate': {
                isShown: false,
            },
            'orgsSearching': {
                isShown: false,
            },
            'validate1': {
                isShown: false,
            },
            'validate2': {
                isShown: false,
            },
            'validate3': {
                isShown: false,
            },
            'validateCancel1': {
                isShown: false,
            },
            'validateCancel2': {
                isShown: false,
            },
            'validateCancel3': {
                isShown: false,
            },
            'delete': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
        },
        'routeManagement': {
            'pycSearchOrgs': {
                isShown: false,
            },
            'pycSearchOrgs2': {
                isShown: false,
            },
            'pycSearchPers': {
                isShown: false,
            },
            'create': {
                isShown: false,
            },
            'edit': {
                isShown: false,
            },
            'detail': {
                isShown: false,
            },
            'historyDetail': {
                isShown: false,
            },
            'validate': {
                isShown: false,
            },
            'orgsSearching': {
                isShown: false,
            },
            'validate1': {
                isShown: false,
            },
            'validate2': {
                isShown: false,
            },
            'validate3': {
                isShown: false,
            },
            'validateCancel1': {
                isShown: false,
            },
            'validateCancel2': {
                isShown: false,
            },
            'validateCancel3': {
                isShown: false,
            },
            'delete': {
                isShown: false,
            },
            'history': {
                isShown: false,
            },
            'special': {
                isShown: false,
            },
            'searchVehiclePersPopup': {
                isShown: false,
            },
            'organizingPopup': {
                isShown: false,
            },
            'vehiclePopup': {
                isShown: false,
            },
            'persPopup': {
                isShown: false,
            },
            'destinationPointPopup': {
                isShown: false,
            },
            'mapPopup': {
                isShown: false,
            },
            'balanceSpecial': {
                isShown: false,
            },
        },
        'routeTracking': {
            'mapPopup': {
                isShown: false,
            },
        },
    },
    notis: [],
    breadcrumbs: [],
}

export default (state: State = initState, action) => {
    switch (action.type) {
        case HANDLE_BUTTON:
            const [n1, n2, n3] = action.keys;
            const buttons = state.buttons;
            return {
                ...state,
                buttons: {
                    ...buttons,
                    [n1]: {
                        ...buttons[n1],
                        [n2]: {
                            ...buttons[n2],
                            [n3]: action.value,
                        },
                    },
                },
            };
        case HANDLE_POPUP:
            const [p1, p2, p3] = action.keys;
            const popups = state.popups;
            return {
                ...state,
                popups: {
                    ...popups,
                    [p1]: {
                        ...popups[p1],
                        [p2]: {
                            ...popups[p2],
                            [p3]: action.value,
                        },
                    },
                },
            };
        case ADD_NOTI_ERROR:
            return {
                ...state,
                notis: [
                    ...state.notis,
                    {
                        type: 'error',
                        text: action.data,
                    }
                ],
            };
        case ADD_NOTI_SUCCESS:
            return {
                ...state,
                notis: [
                    ...state.notis,
                    {
                        type: 'success',
                        text: action.data,
                    }
                ],
            };
        case REMOVE_LAST_NOTI:
            return {
                ...state,
                notis: state.notis.slice(0, state.notis.length - 2),
            };
        case REQUEST_NEW_BREACURMBS:
            return {
                ...state,
                breadcrumbs: action.data,
            };
        default:
            return state
    }
}
