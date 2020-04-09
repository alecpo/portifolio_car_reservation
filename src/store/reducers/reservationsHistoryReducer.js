import {
  LOADING_RESERVATIONS,
  RESERVATIONS_LOADED,
  LOADING_MORE_HISTORY_RESERVATIONS,
  MORE_HISTORY_RESERVATIONS_LOADED
} from '~/store/actions/actionTypes';

const initialState = {
  isLoading: false,
  reservationsHistory: {
    next: {
      page: null,
      limit: null
    },
    previous: {
      page: null,
      limit: null
    },
    vehicleRequests: [
      {
        id: 0,
        begin_date: '',
        end_date: '',
        total_km_value: null,
        penalty_value: null,
        beginOdometer: null,
        endOdometer: null,
        vehicle_id: null,
        step_id: null,
        vehicle: {
          id: null,
          plate: '',
          price_hour: null,
          price_km: null,
          pre_authorization_value: null,
          doors_qtd: null,
          air_conditioning: false,
          direction_type: null,
          gearbox: null,
          model_id: null,
          vehicle_model: {
            id: 1,
            model: '',
            brand: '',
            url: ''
          }
        },
        step: {
          code: ''
        },
        transaction: [
          {
            valor_pre_autorizado: '',
            reservation_value: null,
            infraction_value: null,
            total_value_charged: null
          }
        ],
        formFeedback: null,
        formAnswered: []
      }
    ]
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_RESERVATIONS:
      return { ...state, isLoading: true };
    case LOADING_MORE_HISTORY_RESERVATIONS:
      return { ...state, isLoading: true };
    case RESERVATIONS_LOADED:
      return {
        ...state,
        reservationsHistory: action.payload,
        isLoading: false
      };
    case MORE_HISTORY_RESERVATIONS_LOADED:
      return {
        ...state,
        reservationsHistory: {
          previrous: action.payload.previous,
          next: action.payload.next,
          vehicleRequests: state.reservationsHistory.vehicleRequests.concat(
            action.payload.vehicleRequests
          )
        },
        isLoading: false
      };
    default:
      return state;
  }
}
