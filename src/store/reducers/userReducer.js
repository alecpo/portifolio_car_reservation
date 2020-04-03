import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  UPDATING_USER,
  UPDATE_USER,
  UPDATE_USER_ADDRESS,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_FAILURE
} from '~/store/actions/actionTypes';

const initialState = {
  isLoading: false,
  isUpdating: false,
  userToken: undefined,
  id: undefined,
  name: '',
  cpf: '',
  drive_license: '',
  email: '',
  status: false,
  phone: '',
  birthday: '',
  id_pagarme: '',
  id_address: undefined,
  manager_id: null,
  hasForPasswordChange: false,
  addres_register_client: '',
  type_client: '',
  approved: false,
  cnh_url: '',
  address: {
    city: '',
    street: '',
    number: '',
    neighborhood: '',
    zip: '',
    address_formatted: '',
    state: ''
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: true
      };
    case UPDATING_USER:
      return { ...state, isUpdating: true };
    case USER_LOGGED_IN:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case USER_LOGGED_OUT:
      return {
        ...initialState,
        userToken: null,
        isLoading: false
      };
    case UPDATE_USER:
      return { ...state, ...action.payload, isUpdating: false };
    case UPDATE_USER_ADDRESS:
      return {
        ...state,
        address: { ...action.payload },
        isUpdating: false
      };
    case UPDATE_USER_FAILURE:
    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        isUpdating: false,
        isLoading: false
      };
    default:
      return state;
  }
}
