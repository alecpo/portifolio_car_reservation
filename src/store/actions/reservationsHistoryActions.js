/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import API from '~/config/api';
import {
  LOADING_RESERVATIONS,
  RESERVATIONS_LOADED,
  MORE_HISTORY_RESERVATIONS_LOADED,
  LOADING_MORE_HISTORY_RESERVATIONS
} from './actionTypes';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('@access_token');
  return token;
};

export const loadingReservations = () => ({ type: LOADING_RESERVATIONS });

export const reservationsLoaded = reservationsHistoryList => ({
  type: RESERVATIONS_LOADED,
  payload: reservationsHistoryList
});

export const loadingMoreHistoryReservations = () => ({
  type: LOADING_MORE_HISTORY_RESERVATIONS
});

export const moreHistoryReservationsLoaded = moreReservationsHistoryList => ({
  type: MORE_HISTORY_RESERVATIONS_LOADED,
  payload: moreReservationsHistoryList
});

export const onGetReservations = (page = 1, limit = 5) => dispatch => {
  dispatch(loadingReservations());
  getToken()
    .then(token => {
      axios({
        method: 'get',
        url: API.reservationsHistory,
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit }
      })
        .then(resReservation => {
          dispatch(reservationsLoaded(resReservation.data));
        })
        .catch(e => {
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
        url: API.reservationsHistory,
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit }
      })
        .then(resReservation => {
          dispatch(moreHistoryReservationsLoaded(resReservation.data));
        })
        .catch(e => {
          console.log(
            'erro ao tentar recuperar mais dados de historico de reservas: ',
            e
          );
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};
