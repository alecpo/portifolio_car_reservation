import {
  LOADING_USER,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAILURE,
  UPDATING_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_FAILURE,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAILURE,
  USER_ADDRESS_LOADED_SUCCESS,
  USER_CONFIGURATION_LOADED_SUCCESS,
  LOGOUT_USER_SUCCESS
} from '~/store/actions/actionTypes';

const initialState = {
  isLoading: false,
  isUpdating: false,
  userToken: undefined,
  id: null,
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
  },
  configuration: {
    term_of_use: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    minute_step: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    request_end_wait_timespan_in_minutes: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    client_mulct_per_hour: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    limit_minutes_before_checkin: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    limit_minutes_before_cancelation: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    payment: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    proximity: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    map_visualization: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    radius_visualization: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    latitude_visualization: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    longitude_visualization: {
      id: null,
      key: '',
      value: '',
      description: '',
      display_name: ''
    },
    approval: {
      id: null,
      key: '',
      value: '',
      description: null,
      display_name: ''
    }
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case USER_LOADED_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case UPDATING_USER:
      return { ...state, isUpdating: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, ...action.payload, isUpdating: false };
    case UPDATE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        address: { ...action.payload },
        isUpdating: false
      };
    case UPDATE_USER_FAILURE:
    case UPDATE_USER_ADDRESS_FAILURE:
    case UPDATE_USER_PASSWORD_SUCCESS:
    case UPDATE_USER_PASSWORD_FAILURE:
      return { ...state, isUpdating: false };
    case USER_ADDRESS_LOADED_SUCCESS:
      return {
        ...state,
        address: { ...action.payload }
      };
    case USER_CONFIGURATION_LOADED_SUCCESS:
      return {
        ...state,
        configuration: { ...action.payload }
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...initialState,
        userToken: null
      };
    default:
      return state;
  }
}
