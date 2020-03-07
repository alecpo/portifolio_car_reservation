import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER
} from '~/store/actions/actionTypes';

const initialState = {
  isLoading: false,
  userToken: undefined
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOGGED_IN:
      return {
        ...state,
        ...action.payload
      };
    case USER_LOGGED_OUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
