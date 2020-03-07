/* eslint-disable camelcase */
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import API from '~/config/api';
import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER } from './actionTypes';

export const loadingUser = () => {
  return {
    type: LOADING_USER
  };
};

export const userLoggedIn = user => {
  return {
    type: USER_LOGGED_IN,
    payload: user
  };
};

export const logout = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('@access_token');
    dispatch({
      type: USER_LOGGED_OUT
    });
  } catch (error) {
    console.log('Error removing data' + error);
  }
};

/* export const getUser = () => async dispatch => {
  //recupera user
  try {
    const token = await AsyncStorage.getItem('@access_token');
    axios
      .get(`${API.user}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(async resUser => {
        const user = {
          ...resUser.data.user,
          userToken: token
        };
        delete user.password;

        dispatch(userLoggedIn(user));
      })
      .catch(() => {
        console.log('erro ao tentar recuperar usuário');
      });
  } catch (e) {
    console.log('Erro: ', e);
  }
}; */

const setToken = async value => {
  try {
    await AsyncStorage.setItem('@access_token', `${value}`);
    console.log('Token setado!');
  } catch (e) {
    console.log('Erro: ', e);
  }
};

export const login = ({ email, password }) => dispatch => {
  dispatch(loadingUser());
  axios
    .post(`${API.token}`, {
      email,
      password
    })
    .then(res => {
      const {
        data: { access_token }
      } = res;
      if (access_token) {
        setToken(access_token)
          .then(
            axios
              .get(`${API.user}`, {
                headers: { Authorization: `Bearer ${access_token}` }
              })
              .then(async resUser => {
                const user = {
                  ...resUser.data.user,
                  userToken: access_token
                };
                delete user.password;

                dispatch(userLoggedIn(user));
              })
              .catch(() => {
                console.log('erro ao tentar recuperar usuário');
              })
          )
          .catch(() => {
            console.log('Erro ao utilizar async storage.');
          });
      }
    })
    .catch(() => {
      console.log('Erro ao recuperar token.');
    });
};
