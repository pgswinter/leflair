import {
    REQUEST_FETCH_BY_ID,
    REQUEST_FETCH_BY_ID_SUCCESS,
    REQUEST_FETCH_BY_ID_FAIL
} from '../actions/leflair/actionTypes';

const initialState = {
    error: null,
    data: null,
    isLoaded: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        // *** FETCH
        case REQUEST_FETCH_BY_ID:
            return initialState
        case REQUEST_FETCH_BY_ID_SUCCESS:
            return {
                ...state,
                ...{
                    data: action.payload,
                    isLoaded: true
                }
            }
        case REQUEST_FETCH_BY_ID_FAIL:
            return {
                ...state,
                ...{
                    error: action,
                    isLoaded: true
                }
            }
        default:
            return state;
    }
}