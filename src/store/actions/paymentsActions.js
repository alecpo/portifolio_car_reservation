/* eslint-disable camelcase */
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '#/config/api';
import {
  LOADING_CREDIT_CARDS,
  CREDIT_CARDS_LOADED_SUCCESS,
  CREDIT_CARDS_LOADED_FAILURE,
  /* ADD_CREDIT_CARD_SUCCESS, */
  ADD_CREDIT_CARD_FAILURE,
  DELETING_CREDIT_CARD,
  CREDIT_CARD_DELETED_SUCCESS,
  CREDIT_CARD_DELETED_FAILURE
} from './actionTypes';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('@access_token');
  return token;
};

//  TO DO - Otimizar actions de adicionar para não realizar duas requisições. (backend deve estar preparado)

/* export const addCreditCardSuccess = creditCard => ({
  type: ADD_CREDIT_CARD_SUCCESS,
  payload: creditCard
}); */

export const addCreditCardFailure = () => ({
  type: ADD_CREDIT_CARD_FAILURE
});

export const loadingCreditCard = () => ({ type: LOADING_CREDIT_CARDS });
export const creditCardsLoadedSuccess = creditCardsList => ({
  type: CREDIT_CARDS_LOADED_SUCCESS,
  payload: creditCardsList
});
export const creditCardsLoadedFailure = () => ({
  type: CREDIT_CARDS_LOADED_FAILURE
});

export const deletingCreditCard = () => ({ type: DELETING_CREDIT_CARD });
export const creditCardDeletedSuccess = id => ({
  type: CREDIT_CARD_DELETED_SUCCESS,
  payload: id
});
export const creditCardDeletedFailure = () => ({
  type: CREDIT_CARD_DELETED_FAILURE
});

export const onGetCreditCards = () => dispatch => {
  dispatch(loadingCreditCard());
  getToken()
    .then(token => {
      axios({
        method: 'get',
        url: API.creditCard,
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          dispatch(creditCardsLoadedSuccess(res.data));
        })
        .catch(e => {
          dispatch(creditCardsLoadedFailure());
          console.log('erro ao tentar recuperar cartões: ', e);
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};

export const onAddCreditCard = cardValues => dispatch => {
  dispatch(loadingCreditCard());
  getToken()
    .then(token => {
      axios({
        method: 'post',
        url: API.creditCard,
        headers: { Authorization: `Bearer ${token}` },
        data: cardValues
      })
        .then(() => {
          dispatch(onGetCreditCards());
        })
        .catch(e => {
          dispatch(addCreditCardFailure());
          console.log('erro ao tentar cadastrar cartão: ', e);
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};

export const onDeleteCreditCard = id => dispatch => {
  dispatch(deletingCreditCard());
  getToken()
    .then(token => {
      axios({
        method: 'delete',
        url: `${API.creditCard}/${id}`,
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          dispatch(creditCardDeletedSuccess(id));
        })
        .catch(e => {
          dispatch(creditCardDeletedFailure());
          console.log('erro ao tentar deletar cartão: ', e);
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};
