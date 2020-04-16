import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import userReducer from '#/store/reducers/userReducer';
import paymentsReducer from '#/store/reducers/paymentsReducer';
import reservationsReducer from '#/store/reducers/reservationsReducer';

const logger = createLogger({ collapsed: true });

const middleware = [thunk];

if (__DEV__) {
  middleware.push(logger);
}

const reducers = combineReducers({
  user: userReducer,
  payments: paymentsReducer,
  reservations: reservationsReducer
});

const storeConfig = () => {
  return createStore(reducers, applyMiddleware(...middleware));
};

export default storeConfig;
