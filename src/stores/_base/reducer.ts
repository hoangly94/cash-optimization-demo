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
        },
        'atmCdm': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
        },
        'nhnnTctd': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
        },
        'vehicle': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
        },
        'person': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
        },
        'title': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
        },
        'currency': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
        },
        'priority': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
        },
        'region': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
        },
        'area': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
            },
        },
        'function': {
            'edit': {
                isDisabled: true,
            },
            'query': {
                isLoading: false,
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
