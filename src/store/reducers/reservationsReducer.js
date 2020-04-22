import {
  LOADING_RESERVATIONS,
  RESERVATIONS_LOADED_SUCCESS,
  RESERVATIONS_LOADED_FAILURE,
  LOADING_MORE_HISTORY_RESERVATIONS,
  MORE_HISTORY_RESERVATIONS_LOADED_SUCCESS,
  MORE_HISTORY_RESERVATIONS_LOADED_FAILURE,
  REFRESHING_RESERVATIONS,
  RESERVATIONS_REFRESHED_SUCCESS,
  RESERVATIONS_REFRESHED_FAILURE,
  START_ANIMATION,
  FINISH_ANIMATION,
  GET_RESERVATION_CONFIGURATION_SUCCESS
} from '#/store/actions/actionTypes';

const initialState = {
  isLoading: false,
  isLoadingMore: false,
  isAnimating: false,
  isRefreshing: false,
  reservations: {
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
          id: null,
          code: null
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
        formAnswered: [],
        reservationConfiguration: []
      }
    ]
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_RESERVATIONS:
      return { ...state, isLoading: true };
    case RESERVATIONS_LOADED_SUCCESS:
      return {
        ...state,
        reservations: action.payload,
        isLoading: false
      };
    case RESERVATIONS_LOADED_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case REFRESHING_RESERVATIONS:
      return { ...state, isRefreshing: true };
    case RESERVATIONS_REFRESHED_SUCCESS:
      return {
        ...state,
        reservations: action.payload,
        isRefreshing: false
      };
    case RESERVATIONS_REFRESHED_FAILURE:
      return {
        ...state,
        isRefreshing: false
      };
    case LOADING_MORE_HISTORY_RESERVATIONS:
      return { ...state, isLoadingMore: true };
    case MORE_HISTORY_RESERVATIONS_LOADED_SUCCESS:
      return {
        ...state,
        reservations: {
          previrous: action.payload.previous,
          next: action.payload.next,
          vehicleRequests: state.reservations.vehicleRequests.concat(
            action.payload.vehicleRequests
          )
        },
        isLoadingMore: false
      };
    case MORE_HISTORY_RESERVATIONS_LOADED_FAILURE:
      return {
        ...state,
        isLoadingMore: false
      };
    case START_ANIMATION:
      return { ...state, isAnimating: true };
    case FINISH_ANIMATION:
      return { ...state, isAnimating: false };
    case GET_RESERVATION_CONFIGURATION_SUCCESS:
      return {
        ...state,
        reservations: {
          ...state.reservations,
          vehicleRequests: state.reservations.vehicleRequests.map(
            vehicleRequest =>
              vehicleRequest.id === action.payload.idReservation
                ? {
                    ...vehicleRequest,
                    reservationConfiguration:
                      action.payload.reservationConfiguration
                  }
                : vehicleRequest
          )
        }
      };
    default:
      return state;
  }
}
