import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import userReducer from '~/store/reducers/userReducer';
import paymentsReducer from '~/store/reducers/paymentsReducer';
import reservationsHistoryReducer from '~/store/reducers/reservationsHistoryReducer';

const logger = createLogger({ collapsed: true });

const middleware = [thunk];

if (__DEV__) {
  middleware.push(logger);
}

const reducers = combineReducers({
  user: userReducer,
  payments: paymentsReducer,
  reservationsHistory: reservationsHistoryReducer
});

const storeConfig = () => {
  return createStore(reducers, applyMiddleware(...middleware));
};

export default storeConfig;
