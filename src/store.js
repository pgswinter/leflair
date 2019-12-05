import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

// import rootReducer from './reducers/leflairReducer';
import rootReducer from './reducer'
import rootSaga from './saga'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  // store.sagaTask = sagaMiddleware.run(rootSaga)
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./reducer').default),
    );
  }

  return store
}

export default configureStore
