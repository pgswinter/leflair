import {
    REQUEST_FETCH,
    REQUEST_FETCH_SUCCESS,
    REQUEST_FETCH_FAIL,

    REQUEST_FETCH_BY_ID,
    REQUEST_FETCH_BY_ID_SUCCESS,
    REQUEST_FETCH_BY_ID_FAIL
} from './actionTypes';

// *********************************************************
// REQUEST FETCH LEFLAIR
// *********************************************************
export const reqFetch = (params) => {
    return {
        type: REQUEST_FETCH,
        params
    }
}
export const reqFetchSuccess = (data) => {
    return {
        type: REQUEST_FETCH_SUCCESS,
        payload: data
    }
}
export const reqFetchFail = (error) => ({
    type: REQUEST_FETCH_FAIL,
    error
})
// *********************************************************
// REQUEST FETCH BY ID
// *********************************************************
export const reqFetchById = (params) => {
    return {
        type: REQUEST_FETCH_BY_ID,
        params
    }
}
export const reqFetchByIdSuccess = (data) => {
    return {
        type: REQUEST_FETCH_BY_ID_SUCCESS,
        payload: data
    }
}
export const reqFetchByIdFail = (error) => ({
    type: REQUEST_FETCH_BY_ID_FAIL,
    error
})