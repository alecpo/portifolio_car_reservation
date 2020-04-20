/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native/';
import Icon from 'react-native-vector-icons/Ionicons';

import SubmitButton from '#/components/SubmitButton';
import ProfileEditableCard from '#/components/ProfileEditableCard';

import STRINGS from '#/utils/strings';
import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import DATA_CARD_CONFIGS_PROFILE from '#/utils/enums/DATA_CARD_CONFIGS_PROFILE';
import ADDRESS_CARD_CONFIGS_PROFILE from '#/utils/enums/ADDRESS_CARD_CONFIGS_PROFILE';
import PASSWORD_CARD_CONFIGS_PROFILE from '#/utils/enums/PASSWORD_CARD_CONFIGS_PROFILE';

import API from '#/config/api';

import {
  onLogout,
  onUpdateUser,
  onUpdateUserAddress,
  onUpdatePassword
} from '#/store/actions/userActions';

const ProfileScreen = ({ navigation }) => {
  const {
    editableFields: dataEditableFields,
    labels: dataLabelsObject,
    validationSchema: dataValidationSchema
  } = DATA_CARD_CONFIGS_PROFILE;

  const {
    editableFields: addressEditableFields,
    labels: addressLabelsObject,
    validationSchema: addressValidationSchema
  } = ADDRESS_CARD_CONFIGS_PROFILE;

  const {
    editableFields: passwordEditableFields,
    labels: passwordLabelsObject,
    validationSchema: passwordValidationSchema
  } = PASSWORD_CARD_CONFIGS_PROFILE;

  const dispatch = useDispatch();

  const { userToken, isUpdating } = useSelector(({ user }) => user);

  const onSavePartialData = values => {
    console.log('values: ', values);
    dispatch(onUpdateUser(values));
  };

  const onSaveUserAddress = values => {
    dispatch(onUpdateUserAddress(values));
  };

  const {
    name,
    id,
    id_address,
    cpf,
    drive_license,
    birthday,
    phone,
    email,
    address: {
      zip,
      street,
      number,
      address_formatted,
      neighborhood,
      city,
      state
    }
  } = useSelector(({ user }) => user);

  const userInfoCard = {
    name,
    id,
    cpf,
    drive_license,
    birthday,
    phone,
    email
  };

  const userAddressCard = {
    zip,
    street,
    number,
    address_formatted,
    neighborhood,
    city,
    state,
    id: id_address
  };

  const onSaveNewPassword = ({ newPassword }) => {
    dispatch(
      onUpdatePassword({
        user_id: id,
        password: newPassword,
        hasForPasswordChange: false
      })
    );
  };

  const passwordCard = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  const logout = async () => {
    await dispatch(onLogout());
  };

  useEffect(() => {
    if (userToken)
      if (isUpdating) {
        navigation.navigate('LoadingModal');
      } else if (!navigation.isFocused()) navigation.pop();
  }, [userToken, isUpdating, navigation]);

  const dataEditable = () => {
    if (drive_license === '') {
      if (cpf === '') return [...dataEditableFields, 'cpf', 'drive_license'];
      return [...dataEditableFields, 'drive_license'];
    }
    if (cpf === '') return [...dataEditableFields, 'cpf'];
    return dataEditableFields;
  };

  return (
    <StyledScrollView contentContainerStyle={[{ alignItems: 'center' }]}>
      <ProfileEditableCard
        editableFields={dataEditable()}
        labelsObject={dataLabelsObject}
        valuesObject={userInfoCard}
        modalTitle={`${
          STRINGS.editModal.edit
        } ${STRINGS.profile.data.toLowerCase()}`}
        title={STRINGS.profile.data}
        submitButtonText={STRINGS.editModal.save}
        validationSchema={dataValidationSchema}
        onSavePartialData={onSavePartialData}
      />
      <ProfileEditableCard
        editableFields={addressEditableFields}
        labelsObject={addressLabelsObject}
        valuesObject={userAddressCard}
        modalTitle={`${
          STRINGS.editModal.edit
        } ${STRINGS.ADDRESS.toLowerCase()}`}
        title={STRINGS.ADDRESS}
        submitButtonText={STRINGS.editModal.save}
        validationSchema={addressValidationSchema}
        onSavePartialData={onSaveUserAddress}
      />
      <ProfileEditableCard
        editableFields={passwordEditableFields}
        labelsObject={passwordLabelsObject}
        valuesObject={passwordCard}
        modalTitle={`${
          STRINGS.editModal.change
        } ${STRINGS.password.toLowerCase()}`}
        title={STRINGS.password}
        submitButtonText={STRINGS.editModal.save}
        validationSchema={passwordValidationSchema}
        onSavePartialData={onSaveNewPassword}
      />
      <StyledButtonView>
        <SubmitButton
          rightIcon={() => (
            <Icon name='md-exit' color={COLORS.secondary} size={20} />
          )}
          submit={logout}
          title={STRINGS.LOGOUT}
          backgroundColor={COLORS.cancelButton}
          marginVertical={SPACING.small}
          testID='logoutButtonProfileScreen'
        />
      </StyledButtonView>
    </StyledScrollView>
  );
};

const StyledScrollView = styled.ScrollView`
  top: ${SPACING.verySmall}px;
  background-color: ${COLORS.secondary};
`;

const StyledButtonView = styled.View`
  width: 100%;
  padding-horizontal: ${SPACING.small}px;
`;

export default ProfileScreen;
