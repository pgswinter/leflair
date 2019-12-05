import {
    REQUEST_LOAD_CART,
    REQUEST_ADD_CART,
    REQUEST_EMPTY_CART,
    REQUEST_REMOVE_CART,
    REQUEST_ASC_QUANTITY,
    REQUEST_DESC_QUANTITY
} from './actionTypes';

// *********************************************************
// REQUEST CART
// *********************************************************
export const reqLoadCart = (data) => ({
    type: REQUEST_LOAD_CART,
    data
})
export const reqAddCart = (data) => ({
    type: REQUEST_ADD_CART,
    data
})
export const reqEmptyCart = (data) => ({
    type: REQUEST_EMPTY_CART,
    data
})
export const reqRemoveCart = (data) => ({
    type: REQUEST_REMOVE_CART,
    data
})

export const reqAscCart = (data) => ({
    type: REQUEST_ASC_QUANTITY,
    data
})

export const reqDescCart = (data) => ({
    type: REQUEST_DESC_QUANTITY,
    data
})