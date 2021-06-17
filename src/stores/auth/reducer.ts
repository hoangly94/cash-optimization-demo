import { State } from './constants';


const initState: State = {
    token: '',
    csrf_token: '',
    user: {
        id: '23',
        code: '778609',
        name: 'NGUYỄN HỮU TRUNG',
    },
}

export default (state: State = initState, action) => {

    switch (action.type) {
        // case HANDLE_POPUP:
        //     console.log(state);
        //     if (!action.popupType)
        //         return state;
        //     return {
        //         ...state,
        //         popupType: action.popupType,
        //     }
        default:
            return state;
    }
}