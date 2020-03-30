import {
  LOADING_CREDIT_CARDS,
  CREDIT_CARDS_LOADED,
  ADD_CREDIT_CARD,
  DELETE_CARD,
  DELETING_CARD
} from '~/store/actions/actionTypes';

const initialState = {
  isLoading: false,
  isDeletingCard: false,
  creditCardsList: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_CREDIT_CARDS:
      return { ...state, isLoading: true };
    case CREDIT_CARDS_LOADED:
      return {
        ...state,
        creditCardsList: action.payload,
        isLoading: false,
        isDeletingCard: false
      };
    case ADD_CREDIT_CARD:
      return {
        ...state,
        creditCardsList: state.creditCardsList.push(action.payload),
        isLoading: false
      };
    case DELETE_CARD:
      return {
        ...state,
        creditCardsList: state.creditCardsList.filter(
          item => item.id !== action.payload
        ),
        isLoading: false
      };
    case DELETING_CARD:
      return {
        ...state,
        isDeletingCard: true
      };
    default:
      return state;
  }
}
