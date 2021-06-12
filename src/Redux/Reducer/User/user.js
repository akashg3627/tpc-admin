import * as ActionTypes from '../../ActionTypes';
export const User = (state = {
    user: localStorage.getItem('creds'),
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    isAuth: localStorage.getItem('token') ? true : false,
    isAdmin: localStorage.getItem('isAdmin') ? localStorage.getItem('isAdmin') : false
}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return { ...state, isAuth: true, user: action.user, token: action.token, isAdmin: action.isAdmin };
        case ActionTypes.LOGOUT:
            return { ...state, isAuth: false, user: null, token: '', isAdmin: false };
        default:
            return state;
    }
}