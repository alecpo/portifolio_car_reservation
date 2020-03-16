import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  UPDATE_USER
} from '~/store/actions/actionTypes';

const initialState = {
  isLoading: false,
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
  address: { city: '', street: '', number: '', neighborhood: '' }
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
      return { ...state, ...action.payload, isLoading: false };
    default:
      return state;
  }
}
