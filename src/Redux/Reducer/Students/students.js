import * as ActionTypes from '../../ActionTypes';

export const Students = (state = {
    isLoading: false,
    errMess: null,
    students: []
}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_STUDENTS:
            return { ...state, isLoading: false, errMess: null, students: action.payload };
        case ActionTypes.STUDENTS_LOADING:
            return { ...state, isLoading: true, errMess: null, students: [] };
        case ActionTypes.STUDENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, students: [] };
        default:
            return state;
    }
};