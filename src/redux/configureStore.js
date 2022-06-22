import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { covidReducer } from './covid/reducer';

const reducers = combineReducers({
  details: covidReducer,
});

const middlewares = [thunk, logger];

const store = createStore(
  reducers,
  applyMiddleware(...middlewares),
);

export default store;
