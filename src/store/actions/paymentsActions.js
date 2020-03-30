/* eslint-disable camelcase */
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import API from '~/config/api';
import {
  LOADING_CREDIT_CARDS,
  CREDIT_CARDS_LOADED,
  /* ADD_CREDIT_CARD,
  DELETE_CARD, */
  DELETING_CARD
} from './actionTypes';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('@access_token');
  return token;
};

//  TO DO - Otimizar actions de adicionar e remover cartão de crédito para não realizar duas requisições. (backend deve estar preparado)

/* export const addCreditCard = creditCard => ({
  type: ADD_CREDIT_CARD,
  payload: creditCard
});

export const deleteCard = id => ({
  type: DELETE_CARD,
  payload: id
}); */

export const loadingCreditCard = () => ({ type: LOADING_CREDIT_CARDS });

export const deletingCreditCard = () => ({ type: DELETING_CARD });

export const getCreditCards = creditCardsList => ({
  type: CREDIT_CARDS_LOADED,
  payload: creditCardsList
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
          dispatch(getCreditCards(res.data));
        })
        .catch(e => {
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
        .then(res => {
          console.log('res de add credit card: ', res);
          dispatch(onGetCreditCards());
        })
        .catch(e => {
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
        .then(res => {
          console.log('res de remove credit card: ', res);
          if (!res.error) dispatch(onGetCreditCards());
        })
        .catch(e => {
          console.log('erro ao tentar deletar cartão: ', e);
        });
    })
    .catch(() => console.log('Erro ao tentar pegar token'));
};
