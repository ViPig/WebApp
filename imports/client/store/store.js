import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../../../imports/client/reducers/rootReducer';

const logger = createLogger();

const enhancers = [
  applyMiddleware(ReduxThunk, logger),
];

const Store = createStore(rootReducer, {}, compose(...enhancers));

export default Store;
