import { CHANGE_ASSIGN_ROLE_INPUT, CHANGE_CHANGE_PASS_INPUT, CHANGE_FORGOT_INPUT, CHANGE_LOGIN_INPUT, CHANGE_REGISTER_INPUT, HANDLE_DUALTABLE_MOVE, REQUEST_ASSIGN_ROLE_QUERY, SELECT_ROLE_CONTENT_ROW, State, UPDATE_ASSIGN_ROLE, UPDATE_LOGIN, UPDATE_ROLES, UPDATE_USER, UPDATE_USER2 } from './constants';

const initState: State = {
    roles: [],
    user: {
        accessToken: '',
        csrfToken: '',
        id: '',
        code: '',
        username: '',
        persid: '',
        persCode: '',
        email: '',
        phone: '',
        fullname: '',
        orgsId: '',
        orgsCode: '',
        orgsName: '',
        authorities: [],
        active: false,
        userRole: [],
    },
    isAuthenticated: false,
    login: {
        loginType: '1',
        username: '',
        password: '',
    },
    register: {
        username: '',
        password: '',
        rePassword: '',
    },
    forgot: {
        username: '',
    },
    changePassword: {
        currentPassword: '',
        newPassword: '',
        reNewPassword: '',
    },
    assignRole: {
        filters: {
            username: '',
        },
        id: '',
        username: '',
        roleContent1: [],
        roleContent2: [],
    },
}

export default (state: State = initState, action) => {
    switch (action.type) {
        case CHANGE_LOGIN_INPUT:
            return {
                ...state,
                login: {
                    ...state.login,
                    ...action.data,
                },
            }
        case CHANGE_REGISTER_INPUT:
            return {
                ...state,
                register: {
                    ...state.register,
                    ...action.data,
                },
            }
        case CHANGE_FORGOT_INPUT:
            return {
                ...state,
                forgot: {
                    ...state.forgot,
                    ...action.data,
                },
            }
        case CHANGE_CHANGE_PASS_INPUT:
            return {
                ...state,
                changePassword: {
                    ...state.changePassword,
                    ...action.data,
                },
            }
        case CHANGE_ASSIGN_ROLE_INPUT:
            return {
                ...state,
                assignRole: {
                    ...state.assignRole,
                    filter: {
                        username: action.data,
                    }
                },
            }
        case UPDATE_LOGIN:
            return {
                ...state,
                user: {
                    ...state.user,
                    accessToken: action.data.accessToken,
                },
            }
        case UPDATE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    // id: action.data.persid,
                    code: action.data.persCode,
                    username: action.data.user_name,
                    persid: action.data.persid,
                    persCode: action.data.persCode,
                    email: action.data.email,
                    phone: action.data.phone,
                    fullname: action.data.fullname,
                    orgsId: action.data.orgsId,
                    orgsCode: action.data.orgsCode,
                    orgsName: action.data.orgsName,
                    authorities: action.data.authorities,
                    active: false,
                },
                isAuthenticated: true,
            }
        case UPDATE_ASSIGN_ROLE:
            const userRoleIdList = action.data.userRole.map(item => item.roleId);
            return {
                ...state,
                assignRole: {
                    ...state.assignRole,
                    id: action.data.id,
                    username: action.data.username,
                    roleContent1: state.roles.filter(item => !userRoleIdList.includes(item.id)),
                    roleContent2: state.roles.filter(item => userRoleIdList.includes(item.id)),
                },
            }
        // case UPDATE_USER_ROLE:
        //     return {
        //         ...state,
        //         user:{
        //             ...state.user,
        //             role: action.data,
        //         }
        //     }
        case UPDATE_ROLES:
            return {
                ...state,
                roles: action.data,
            }

        case SELECT_ROLE_CONTENT_ROW:
            return {
                ...state,
                assignRole: {
                    ...state.assignRole,
                    roleContent1: state.assignRole.roleContent1.map(mapToNewQueryResult(action.data))
                }
            }

        case HANDLE_DUALTABLE_MOVE:
            const moveNewData = function () {
                if (action.moveType === 'ONE_LEFT_TO_RIGHT') {
                    console.log(state);
                    return [
                        state.assignRole.roleContent1.filter(item => !item.isSelected),
                        [
                            ...state.assignRole.roleContent2,
                            ...state.assignRole.roleContent1.filter(item => item.isSelected).map(item => ({ ...item, isSelected: false })),
                        ],
                    ]
                }
                if (action.moveType === 'ONE_RIGHT_TO_LEFT') {
                    return [
                        [
                            ...state.assignRole.roleContent1,
                            ...state.assignRole.roleContent2.filter(item => item.isSelected).map(item => ({ ...item, isSelected: false })),
                        ],
                        state.assignRole.roleContent2.filter(item => !item.isSelected),
                    ]
                }
                if (action.moveType === 'ALL_LEFT_TO_RIGHT') {
                    return [
                        [],
                        [
                            ...state.assignRole.roleContent2.map(item => ({ ...item, isSelected: false })),
                            ...state.assignRole.roleContent1.map(item => ({ ...item, isSelected: false })),
                        ],
                    ]
                }
                if (action.moveType === 'ALL_RIGHT_TO_LEFT') {
                    return [
                        [
                            ...state.assignRole.roleContent1.map(item => ({ ...item, isSelected: false })),
                            ...state.assignRole.roleContent2.map(item => ({ ...item, isSelected: false })),
                        ],
                        [],
                    ]
                }
            }() || [];
            return {
                ...state,
                assignRole: {
                    ...state.assignRole,
                    roleContent1: moveNewData[0],
                    roleContent2: moveNewData[1],
                }
            }
        case REQUEST_ASSIGN_ROLE_QUERY:
            return {
                ...state,
                // roles: action.data,
            }
        default:
            return state;
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