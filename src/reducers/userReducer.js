/* eslint-disable no-case-declarations */
import {
    REQUEST_SAVE_LOCAL_STORAGE,
    REQUEST_LOAD_LOCAL_STORAGE
} from '../actions/user/actionTypes';

const initialState = {
    error: null,
    data: null,
    isLoaded: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        // *** LOAD
        case REQUEST_LOAD_LOCAL_STORAGE:
            let lsUserLoad = JSON.parse(localStorage.getItem('user_info'));
            return {
                ...state,
                ...{
                    data: lsUserLoad,
                    isLoaded: true
                }
            }
        // *** SAVE
        case REQUEST_SAVE_LOCAL_STORAGE:
            const userInfo = action.data;
            localStorage.setItem('user_info', JSON.stringify(userInfo));
            return {
                ...state,
                ...{
                    data: userInfo,
                    isLoaded: true
                }
            }
        default:
            return state;
    }
}