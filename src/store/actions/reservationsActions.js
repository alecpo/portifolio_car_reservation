/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '#/config/api';
import {
  LOADING_RESERVATIONS,
  RESERVATIONS_LOADED_SUCCESS,
  RESERVATIONS_LOADED_FAILURE,
  REFRESHING_RESERVATIONS,
  RESERVATIONS_REFRESHED_SUCCESS,
  RESERVATIONS_REFRESHED_FAILURE,
  LOADING_MORE_HISTORY_RESERVATIONS,
  MORE_HISTORY_RESERVATIONS_LOADED_SUCCESS,
  MORE_HISTORY_RESERVATIONS_LOADED_FAILURE,
  CANCEL_RESERVATION_SUCCESS,
  CANCEL_RESERVATION_FAILURE,
  START_ANIMATION,
  FINISH_ANIMATION,
  GET_RESERVATION_CONFIGURATION_SUCCESS,
  GET_RESERVATION_CONFIGURATION_FAILURE,
  CHECKIN_SUCCESS,
  CHECKIN_SUCCESS_FAILURE,
  OPEN_VEHICLE_SUCCESS,
  OPEN_VEHICLE_FAILURE
} from './actionTypes';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('@access_token');
  return token;
};

export const loadingReservations = () => ({ type: LOADING_RESERVATIONS });

export const reservationsLoadedSuccess = reservationsHistoryList => ({
  type: RESERVATIONS_LOADED_SUCCESS,
  payload: reservationsHistoryList
});

export const reservationsLoadedFailure = () => ({
  type: RESERVATIONS_LOADED_FAILURE
});

export const refreshingReservations = () => ({ type: REFRESHING_RESERVATIONS });

export const reservationsRefreshedSuccess = reservationsHistoryList => ({
  type: RESERVATIONS_REFRESHED_SUCCESS,
  payload: reservationsHistoryList
});

export const reservationsRefreshedFailure = () => ({
  type: RESERVATIONS_REFRESHED_FAILURE
});

export const loadingMoreHistoryReservations = () => ({
  type: LOADING_MORE_HISTORY_RESERVATIONS
});

export const moreHistoryReservationsLoadedSuccess = moreReservationsHistoryList => ({
  type: MORE_HISTORY_RESERVATIONS_LOADED_SUCCESS,
  payload: moreReservationsHistoryList
});

export const moreHistoryReservationsLoadedFailure = () => ({
  type: MORE_HISTORY_RESERVATIONS_LOADED_FAILURE
});

export const startAnimation = () => ({
  type: START_ANIMATION
});

export const finishAnimation = () => ({
  type: FINISH_ANIMATION
});

export const cancelReservationSuccess = () => ({
  type: CANCEL_RESERVATION_SUCCESS
});

export const cancelReservationFailure = () => ({
  type: CANCEL_RESERVATION_FAILURE
});

export const getReservationConfigurationSuccess = (
  idReservation,
  reservationConfiguration
) => ({
  type: GET_RESERVATION_CONFIGURATION_SUCCESS,
  payload: { idReservation, reservationConfiguration }
});
export const getReservationConfigurationFailure = () => ({
  type: GET_RESERVATION_CONFIGURATION_FAILURE
});

export const checkinReservationSucces = () => ({
  type: CHECKIN_SUCCESS
});
export const checkinReservationFailure = () => ({
  type: CHECKIN_SUCCESS_FAILURE
});

export const openVehicleSuccess = () => ({
  type: OPEN_VEHICLE_SUCCESS
});
export const openVehicleFailure = () => ({
  type: OPEN_VEHICLE_FAILURE
});

export const onGetReservationConfiguration = idReservation => dispatch => {
  getToken()
    .then(token => {
      axios({
        method: 'get',
        url: `${API.reservationConfig}/${idReservation}`,
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          dispatch(getReservationConfigurationSuccess(idReservation, res.data));
        })
        .catch(e => {
          dispatch(getReservationConfigurationFailure());
          console.log('erro ao tentar cancelar reserva: ', e);
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};

export const onGetReservations = (page = 1, limit = 5) => dispatch => {
  dispatch(loadingReservations());
  getToken()
    .then(token => {
      axios({
        method: 'get',
        url: API.reservations,
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit }
      })
        .then(resReservation => {
          dispatch(reservationsLoadedSuccess(resReservation.data));
        })
        .catch(e => {
          dispatch(reservationsLoadedFailure());
          console.log('erro ao tentar recuperar historico de reservas: ', e);
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};

export const onRefresh = (page = 1, limit = 5) => dispatch => {
  dispatch(refreshingReservations());
  getToken()
    .then(token => {
      axios({
        method: 'get',
        url: API.reservations,
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit }
      })
        .then(resReservation => {
          dispatch(reservationsRefreshedSuccess(resReservation.data));
        })
        .catch(e => {
          dispatch(reservationsRefreshedFailure());
          console.log('erro ao tentar recuperar historico de reservas: ', e);
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};

export const onLoadMoreReservation = ({ page, limit }) => dispatch => {
  dispatch(loadingMoreHistoryReservations());
  getToken()
    .then(token => {
      axios({
        method: 'get',
        url: API.reservations,
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit }
      })
        .then(resReservation => {
          dispatch(moreHistoryReservationsLoadedSuccess(resReservation.data));
        })
        .catch(e => {
          dispatch(moreHistoryReservationsLoadedFailure());
          console.log(
            'erro ao tentar recuperar mais dados de historico de reservas: ',
            e
          );
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};

export const onCancelReservation = (id, motive) => dispatch => {
  dispatch(startAnimation());
  getToken()
    .then(token => {
      axios({
        method: 'post',
        url: `${API.cancelReservation}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: motive
      })
        .then(res => {
          dispatch(cancelReservationSuccess());
          if (res.status === 200) dispatch(onGetReservations());
        })
        .catch(e => {
          dispatch(cancelReservationFailure());
          console.log('erro ao tentar cancelar reserva: ', e);
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};

export const onClickToCheckin = id => dispatch => {
  dispatch(onGetReservationConfiguration(id));
};

export const onOpenDoors = vehicle_id => dispatch => {
  getToken()
    .then(token => {
      axios({
        method: 'post',
        url: API.changeStatus,
        headers: { Authorization: `Bearer ${token}` },
        data: { option: 'unlock', vehicle_id }
      })
        .then(res => {
          if (res.status === 200) dispatch(openVehicleSuccess());
        })
        .catch(e => {
          dispatch(openVehicleFailure());
          console.log('erro ao abrir portas: ', e);
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};

export const onCheckinReservation = vehicle_request_id => dispatch => {
  getToken()
    .then(token => {
      axios({
        method: 'post',
        url: API.newFormAnswered,
        headers: { Authorization: `Bearer ${token}` },
        data: { vehicle_request_id }
      })
        .then(res => {
          if (res.status === 200) dispatch(checkinReservationSucces());
        })
        .catch(e => {
          dispatch(checkinReservationFailure());
          console.log('erro ao tentar fazer checkin: ', e);
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};
