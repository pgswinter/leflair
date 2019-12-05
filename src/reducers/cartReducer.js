/* eslint-disable no-case-declarations */
import {
    REQUEST_LOAD_CART,
    REQUEST_ADD_CART,
    REQUEST_EMPTY_CART,
    REQUEST_REMOVE_CART,
    REQUEST_ASC_QUANTITY,
    REQUEST_DESC_QUANTITY,
} from '../actions/cart/actionTypes';
import { message } from '../const/alert';

const initialState = {
    error: null,
    data: null,
    isLoaded: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        // *** FETCH
        case REQUEST_LOAD_CART:
            if(localStorage.getItem('cart') === '') {
                return {
                    ...state,
                    ...{
                        data: [],
                        isLoaded: true
                    }
                } 
            } else {
                let lsCartLoad = JSON.parse(localStorage.getItem('cart'));
                return {
                    ...state,
                    ...{
                        data: lsCartLoad,
                        isLoaded: true
                    }
                }
            }
        case REQUEST_ASC_QUANTITY:
            let lsCartAsc = JSON.parse(localStorage.getItem('cart'));
            const cartItemAsc = action.data;

            lsCartAsc = lsCartAsc.map(item => {
                if (item.name === cartItemAsc.name) {
                    item.orderItem += 1;
                    if (item.orderItem > item.quantity) {
                        item.orderItem = item.quantity;
                        item.message = message.overQuantity;
                    }
                    item['totalPrice'] = item.price * item.orderItem
                }
                return item;
            })
            localStorage.setItem('cart', JSON.stringify(lsCartAsc));
            return {
                ...state,
                ...{
                    data: lsCartAsc,
                    isLoaded: true
                }
            }
        case REQUEST_DESC_QUANTITY:
            let lsCartDesc = JSON.parse(localStorage.getItem('cart'));
            const cartItemDesc = action.data;

            const duplicateItemDesc = lsCartDesc.filter(item => item.name === cartItemDesc.name);
            if (duplicateItemDesc[0]['orderItem'] <= 1) {
                lsCartDesc = lsCartDesc.filter(item => item.name !== cartItemDesc.name);
            } else {
                lsCartDesc = lsCartDesc.map(item => {
                    if (item.name === cartItemDesc.name) {
                        item.orderItem -= 1;
                        item['totalPrice'] = item.price * item.orderItem;
                        item.message = null;
                    }
                    return item;
                })
            }
            localStorage.setItem('cart', JSON.stringify(lsCartDesc))

            return {
                ...state,
                ...{
                    data: lsCartDesc,
                    isLoaded: true
                }
            }
        case REQUEST_ADD_CART:
            let lsCart = localStorage.getItem('cart') === '' ? [] : JSON.parse(localStorage.getItem('cart'));
            const cartItem = action.data;

            if (lsCart !== null && lsCart.length > 0) {
                const duplicateItem = lsCart.filter(item => item.name === cartItem.name);
                const isExisted = duplicateItem.length > 0 ? true : false;
                if (!isExisted) {
                    cartItem['orderItem'] = cartItem.quantity === 0 ? cartItem.quantity : 1;
                    lsCart = [...lsCart, cartItem];
                } else {
                    lsCart = lsCart.map(item => {
                        if (item.name === cartItem.name) {
                            item.orderItem += 1;
                            if (item.orderItem > item.quantity) {
                                item.orderItem = item.quantity;
                                item.message = message.overQuantity;
                            }
                            item['totalPrice'] = item.price * item.orderItem
                        }
                        return item;
                    })
                }
                localStorage.setItem('cart', JSON.stringify(lsCart));
                return {
                    ...state,
                    ...{
                        data: lsCart,
                        isLoaded: true
                    }
                }
            } else {
                lsCart = cartItem;
                lsCart['orderItem'] = 1;
                localStorage.setItem('cart', JSON.stringify([lsCart]));
                return {
                    ...state,
                    ...{
                        data: [lsCart],
                    }
                }
            }
        case REQUEST_EMPTY_CART:
            localStorage.setItem('cart', [])
            return {
                ...state,
                ...{
                    data: [],
                    isLoaded: true
                }
            }
        case REQUEST_REMOVE_CART:
            let lsCartRemove = JSON.parse(localStorage.getItem('cart'));
            const cartItemRemove = action.data;
            lsCartRemove = lsCartRemove.filter(item => item.name !== cartItemRemove.name);
            localStorage.setItem('cart', JSON.stringify(lsCartRemove))

            return {
                ...state,
                ...{
                    data: lsCartRemove,
                    isLoaded: true
                }
            }
        default:
            return state;
    }
}