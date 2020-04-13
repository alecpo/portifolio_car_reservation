/* eslint-disable camelcase */
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import API from '~/config/api';
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  UPDATING_USER,
  UPDATE_USER,
  UPDATE_USER_ADDRESS,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_FAILURE
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

export const updatingUser = () => ({
  type: UPDATING_USER
});

export const updateUser = partialUser => ({
  type: UPDATE_USER,
  payload: partialUser
});

export const updateUserAddress = address => ({
  type: UPDATE_USER_ADDRESS,
  payload: address
});

export const updateUserFailure = () => ({
  type: UPDATE_USER_FAILURE
});

export const updateUserPassword = () => ({
  type: UPDATE_USER_PASSWORD
});

export const onUpdateUser = partialUser => dispatch => {
  dispatch(updatingUser());
  getToken()
    .then(token => {
      axios({
        method: 'put',
        url: API.updateUserPartial,
        headers: { Authorization: `Bearer ${token}` },
        data: partialUser
      })
        .then(() => {
          dispatch(updateUser(partialUser));
        })
        .catch(e => {
          dispatch(updateUserFailure());
          console.log('erro ao tentar atualizar dados do usuário: ', e);
        });
    })
    .catch(() => {
      console.log('Erro ao recuperar token.');
    });
};

export const logout = () => async dispatch => {
  try {
    dispatch(loadingUser());
    await AsyncStorage.removeItem('@access_token');
    dispatch({
      type: USER_LOGGED_OUT
    });
  } catch (error) {
    console.log(`Error removing data${error}`);
  }
};

export const onUpdateUserAddress = address => dispatch => {
  dispatch(updatingUser());
  getToken()
    .then(token => {
      axios({
        method: 'put',
        url: `${API.address}/${address.id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: address
      })
        .then(() => {
          dispatch(updateUserAddress(address));
        })
        .catch(e => {
          dispatch(updateUserFailure());
          console.log('erro ao tentar atualizar dados do usuário: ', e);
        });
    })
    .catch(() => {
      console.log('Erro ao recuperar token.');
    });
};

export const onUpdatePassword = payload => dispatch => {
  dispatch(updatingUser());
  getToken()
    .then(token => {
      axios({
        method: 'put',
        url: `${API.changePassword}/${payload.user_id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: payload
      })
        .then(() => {
          dispatch(updateUserPassword());
        })
        .catch(e => {
          dispatch(updateUserFailure());
          console.log('erro ao tentar atualizar senha do usuário: ', e);
        });
    })
    .catch(() => {
      console.log('Erro ao recuperar token.');
    });
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
              data: {
                zip,
                address_formatted,
                state,
                city,
                street,
                number,
                neighborhood
              }
            } = resAddressUser;
            Object.assign(user, {
              address: {
                zip: zip.toString(),
                address_formatted,
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
            dispatch(userLoggedIn(user));
          });
      })
      .catch(() => {
        console.log('erro ao tentar recuperar usuário');
        dispatch(logout());
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
          .then(() => {
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
                      data: {
                        zip,
                        address_formatted,
                        state,
                        city,
                        street,
                        number,
                        neighborhood
                      }
                    } = resAddressUser;
                    Object.assign(user, {
                      address: {
                        zip: zip.toString(),
                        address_formatted,
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
                    dispatch(userLoggedIn(user));
                  });
              })
              .catch(() => {
                console.log('erro ao tentar recuperar usuário');
              });
          })
          .catch(() => {
            console.log('Erro ao utilizar async storage.');
          });
      }
    })
    .catch(() => {
      console.log('Erro ao recuperar token.');
    });
};
