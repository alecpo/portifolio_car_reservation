/* eslint-disable camelcase */
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '#/config/api';
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
  LOADING_USER_ADDRESS,
  USER_ADDRESS_LOADED_SUCCESS,
  USER_ADDRESS_LOADED_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  LOADING_USER_CONFIGURATION,
  USER_CONFIGURATION_LOADED_SUCCESS,
  USER_CONFIGURATION_LOADED_FAILURE
} from './actionTypes';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('@access_token');
  return token;
};

export const loadingUser = () => ({
  type: LOADING_USER
});
export const userLoadedSuccess = user => ({
  type: USER_LOADED_SUCCESS,
  payload: user
});
export const userLoadedFailure = () => ({
  type: USER_LOADED_FAILURE
});

export const updatingUser = () => ({
  type: UPDATING_USER
});
export const updateUserSuccess = partialUser => ({
  type: UPDATE_USER_SUCCESS,
  payload: partialUser
});
export const updateUserFailure = () => ({
  type: UPDATE_USER_FAILURE
});

export const updateUserAddressSuccess = address => ({
  type: UPDATE_USER_ADDRESS_SUCCESS,
  payload: address
});
export const updateUserAddressFailure = () => ({
  type: UPDATE_USER_ADDRESS_FAILURE
});

export const updateUserPasswordSuccess = () => ({
  type: UPDATE_USER_PASSWORD_SUCCESS
});
export const updateUserPasswordFailure = () => ({
  type: UPDATE_USER_PASSWORD_FAILURE
});

export const loadingUserAddress = () => ({
  type: LOADING_USER_ADDRESS
});
export const userAddressLoadedSuccess = address => ({
  type: USER_ADDRESS_LOADED_SUCCESS,
  payload: address
});
export const userAddressLoadedFailure = () => ({
  type: USER_ADDRESS_LOADED_FAILURE
});

export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS
});
export const logoutUserFailure = () => ({
  type: LOGOUT_USER_FAILURE
});

export const loadingUserConfigurations = () => ({
  type: LOADING_USER_CONFIGURATION
});
export const userConfigurationsLoadedSuccess = configuration => ({
  type: USER_CONFIGURATION_LOADED_SUCCESS,
  payload: configuration
});
export const userConfigurationsLoadedFailure = () => ({
  type: USER_CONFIGURATION_LOADED_FAILURE
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
          dispatch(updateUserSuccess(partialUser));
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

export const onLogout = () => async dispatch => {
  dispatch(loadingUser());
  await AsyncStorage.removeItem('@access_token')
    .then(() => {
      console.log('Token removido!');
      dispatch(logoutUserSuccess());
    })
    .catch(e => {
      console.log('Erro: ', e);
      dispatch(logoutUserFailure());
    });
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
          dispatch(updateUserAddressSuccess(address));
        })
        .catch(e => {
          dispatch(updateUserAddressFailure());
          console.log('erro ao tentar atualizar endereço do usuário: ', e);
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
          dispatch(updateUserPasswordSuccess());
        })
        .catch(e => {
          dispatch(updateUserPasswordFailure());
          console.log('erro ao tentar atualizar senha do usuário: ', e);
        });
    })
    .catch(() => {
      console.log('Erro ao recuperar token.');
    });
};

export const onGetUserAddress = idAddress => dispatch => {
  dispatch(loadingUserAddress());
  getToken()
    .then(token => {
      axios
        .get(`${API.address}/${idAddress}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
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
          } = res;
          const address = {
            zip: zip.toString(),
            address_formatted,
            state,
            city,
            street,
            number,
            neighborhood
          };
          dispatch(userAddressLoadedSuccess(address));
        })
        .catch(() => {
          dispatch(userAddressLoadedFailure());
          console.log('erro ao tentar recuperar endereço do usuário');
        });
    })
    .catch(() => {
      console.log('Erro ao recuperar token.');
    });
};

export const onGetUserConfigurations = () => dispatch => {
  dispatch(loadingUserConfigurations());
  getToken()
    .then(token => {
      axios
        .get(API.configuration, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          const { data: configuration } = res;

          dispatch(userConfigurationsLoadedSuccess(configuration));
        })
        .catch(() => {
          dispatch(userConfigurationsLoadedFailure());
          console.log('erro ao tentar recuperar endereço do usuário');
        });
    })
    .catch(() => {
      console.log('Erro ao recuperar token.');
    });
};

export const onGetUser = token => dispatch => {
  dispatch(loadingUser());
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

      dispatch(userLoadedSuccess(user));

      dispatch(onGetUserAddress(user.id_address));

      dispatch(onGetUserConfigurations());
    })
    .catch(() => {
      console.log('erro ao tentar recuperar usuário');
      dispatch(userLoadedFailure());
      dispatch(onLogout());
    });
};

const setToken = async value => {
  await AsyncStorage.setItem('@access_token', `${value}`)
    .then(() => console.log('Token setado!'))
    .catch(e => console.log('Erro: ', e));
};

export const onLogin = ({ email, password }) => dispatch => {
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
          .then(() => dispatch(onGetUser(access_token)))
          .catch(() => {
            console.log('Erro ao utilizar async storage.');
          });
      }
    })
    .catch(() => {
      console.log('Erro ao recuperar token.');
    });
};
