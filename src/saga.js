import {
  all,
  fork
} from 'redux-saga/effects';
import leflairSaga from './sagas/lefailrSagas';

export default function* rootSagas() {
  yield all([
    leflairSaga()
  ]);
}