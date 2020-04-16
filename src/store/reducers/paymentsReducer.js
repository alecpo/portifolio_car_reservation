import {
  LOADING_CREDIT_CARDS,
  CREDIT_CARDS_LOADED_SUCCESS,
  CREDIT_CARDS_LOADED_FAILURE,
  /* ADD_CREDIT_CARD_SUCCESS, */
  ADD_CREDIT_CARD_FAILURE,
  DELETING_CREDIT_CARD,
  CREDIT_CARD_DELETED_SUCCESS,
  CREDIT_CARD_DELETED_FAILURE
} from '#/store/actions/actionTypes';

const initialState = {
  isLoading: false,
  isDeletingCard: false,
  creditCardsList: [
    {
      id: null,
      id_user: null,
      nickname: '',
      flag: '',
      id_address: null,
      id_cielo: '',
      cvv: '',
      active: false,
      credit_card_owner: null
    }
  ]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_CREDIT_CARDS:
      return { ...state, isLoading: true };
    case CREDIT_CARDS_LOADED_SUCCESS:
      return {
        ...state,
        creditCardsList: action.payload,
        isLoading: false
      };
    case CREDIT_CARDS_LOADED_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    /* case ADD_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        creditCardsList: [...state.creditCardsList, action.payload],
        isLoading: false
      }; */
    case ADD_CREDIT_CARD_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case DELETING_CREDIT_CARD:
      return {
        ...state,
        isDeletingCard: true
      };
    case CREDIT_CARD_DELETED_SUCCESS:
      return {
        ...state,
        creditCardsList: [
          ...state.creditCardsList.filter(
            creditCard => creditCard.id !== action.payload
          )
        ],
        isDeletingCard: false
      };
    case CREDIT_CARD_DELETED_FAILURE:
      return {
        ...state,
        isDeletingCard: false
      };
    default:
      return state;
  }
}
