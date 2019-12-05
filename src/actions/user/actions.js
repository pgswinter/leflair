import {
    REQUEST_LOAD_LOCAL_STORAGE,
    REQUEST_SAVE_LOCAL_STORAGE
} from './actionTypes';

// *********************************************************
// REQUEST USER
// *********************************************************
export const reqLoadUser = (data) => ({
    type: REQUEST_LOAD_LOCAL_STORAGE,
    data
})
export const reqSaveUser = (data) => ({
    type: REQUEST_SAVE_LOCAL_STORAGE,
    data
})