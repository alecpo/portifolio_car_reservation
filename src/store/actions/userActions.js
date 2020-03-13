/* eslint-disable camelcase */
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import API from '~/config/api';
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  UPDATE_USER
} from './actionTypes';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('@access_token');
  return token;
};

export const loadingUser = () => ({
  type: LOADING_USER
});

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  payload: user
});

export const updateUser = partialUser => ({
  type: UPDATE_USER,
  payload: partialUser
});

export const onUpdateUser = (apiRoute, partialUser) => dispatch => {
  /*  dispatch(loadingUser());
  getToken()
    .then(token => {
      axios
        .put(apiRoute, {
          headers: { Authorization: `Bearer ${token}` },
          data: { ...partialUser }
        })
        .then(res => {
          console.log('res: ', res);
          dispatch(updateUser(partialUser));
        })
        .catch(e => {
          console.log('erro ao tentar atualizar dados do usuário: ', e);
        });
    })
    .catch(); */
};

export const logout = () => async dispatch => {
  try {
    dispatch(loadingUser());
    await AsyncStorage.removeItem('@access_token');
    dispatch({
      type: USER_LOGGED_OUT
    });
  } catch (error) {
    console.log('Error removing data' + error);
  }
};

export const getUser = token => async dispatch => {
  try {
    await dispatch(loadingUser());
    axios
      .get(`${API.user}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(resUser => {
        const user = {
          ...resUser.data.user,
          userToken: token
        };
        delete user.password;

        axios
          .get(`${API.address}/${user.id_address}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(resAddressUser => {
            const {
              data: { zip, state, city, street, number, neighborhood }
            } = resAddressUser;
            Object.assign(user, {
              address: {
                zip,
                state,
                city,
                street,
                number,
                neighborhood
              }
            });
            dispatch(userLoggedIn(user));
          })
          .catch(() => {
            console.log('erro ao tentar recuperar endereço do usuário');
          });
      })
      .catch(() => {
        console.log('erro ao tentar recuperar usuário');
      });
  } catch (e) {
    console.log('Erro: ', e);
  }
};

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
              .then(resUser => {
                const user = {
                  ...resUser.data.user,
                  userToken: access_token
                };
                delete user.password;

                axios
                  .get(`${API.address}/${user.id_address}`, {
                    headers: { Authorization: `Bearer ${access_token}` }
                  })
                  .then(resAddressUser => {
                    const {
                      data: { zip, state, city, street, number, neighborhood }
                    } = resAddressUser;
                    Object.assign(user, {
                      address: {
                        zip,
                        state,
                        city,
                        street,
                        number,
                        neighborhood
                      }
                    });
                    dispatch(userLoggedIn(user));
                  })
                  .catch(() => {
                    console.log('erro ao tentar recuperar endereço do usuário');
                  });
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
