import {
    put,
    call,
    takeLatest,
    all,
    fork,
} from "redux-saga/effects";
import es6promise from 'es6-promise';
import {
    REQUEST_FETCH_BY_ID,
    REQUEST_FETCH
} from '../actions/leflair/actionTypes';
import {
    reqFetchByIdSuccess,
    reqFetchByIdFail,
    reqFetchSuccess,
    reqFetchFail
} from '../actions/leflair/actions';

import api from '../services/api';

es6promise.polyfill();
// *********************************************************
// REQUEST FETCH BY ID
// *********************************************************
function* reqFetchById(params) {
    const paramId = params.params;
    try {
        const { data } = yield call(() => api.Leflair.getJson());
        const itemById = data.data.filter(item => parseFloat(item.id) === parseFloat(paramId))[0];
        yield put(reqFetchByIdSuccess(itemById));
    } catch (error) {
        console.log(error);
        yield put(reqFetchByIdFail(error))
    }
}
function* watchReqFetchById() {
    yield takeLatest(REQUEST_FETCH_BY_ID, reqFetchById);
}
// *********************************************************
// REQUEST FETCH
// *********************************************************
function* reqFetch() {
    try {
        const { data } = yield call(() => api.Leflair.getJson());
        yield put(reqFetchSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(reqFetchFail(error))
    }
}
function* watchReqFetch() {
    yield takeLatest(REQUEST_FETCH, reqFetch);
}

export default function* () {
    yield all([
        fork(watchReqFetch),
        fork(watchReqFetchById)
    ])
}
