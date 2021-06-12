import * as ActionTypes from '../../ActionTypes';
export const Notifications = (state = {
    isLoading: false,
    errMess: null,
    notifications: []
}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_NOTIFY:
            return { ...state, isLoading: false, errMess: null, notifications: action.payload };
        case ActionTypes.NOTIFY_LOADING:
            return { ...state, isLoading: true, errMess: null, notifications: [] };
        case ActionTypes.NOTIFY_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, notifications: [] };
        default:
            return state;
    }
};