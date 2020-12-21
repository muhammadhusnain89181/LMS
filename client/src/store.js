import { createStore, applyMiddleware, compose } from "redux";
// import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import createSagaMiddleware from 'redux-saga';
// import rootReducer from './reducers/index';
// import rootSaga from './sagas/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__
    //     ? window.__REDUX_DEVTOOLS_EXTENSION__()
    //     : f => f
    // composeWithDevTools(applyMiddleware(sagaMiddleware))

    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   )
);

export default store;