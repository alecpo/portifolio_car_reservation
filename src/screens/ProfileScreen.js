/* eslint-disable camelcase */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native/';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import SubmitButton from '~/components/SubmitButton';
import ProfileEditableCard from '~/components/ProfileEditableCard';

import STRINGS from '~/utils/strings';
import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import DATA_CARD_CONFIGS_PROFILE from '~/utils/enums/DATA_CARD_CONFIGS_PROFILE';
import ADDRESS_CARD_CONFIGS_PROFILE from '~/utils/enums/ADDRESS_CARD_CONFIGS_PROFILE';
import PASSWORD_CARD_CONFIGS_PROFILE from '~/utils/enums/PASSWORD_CARD_CONFIGS_PROFILE';

import API from '~/config/api';

import { logout } from '~/store/actions/userActions';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const {
    name,
    cpf,
    drive_license,
    birthday,
    phone,
    email,
    address: { city, street, number, neighborhood }
  } = useSelector(({ user }) => user);

  const userInfoCard = {
    name,
    cpf,
    drive_license,
    birthday: `${moment(birthday).format('DD/MM/YYYY')}`,
    phone,
    email
  };

  const userAddressCard = { street, number, neighborhood, city };

  const passwordCard = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  const onLogout = async () => {
    await dispatch(logout());
  };

  const StyledLogoutIcon = () => (
    <Icon name='md-exit' color={COLORS.secondary} size={20} />
  );

  return (
    <StyledScrollView contentContainerStyle={[{ alignItems: 'center' }]}>
      <ProfileEditableCard
        editableFields={DATA_CARD_CONFIGS_PROFILE.editableFields}
        labelsObject={DATA_CARD_CONFIGS_PROFILE.labels}
        valuesObject={userInfoCard}
        modalTitle={`${
          STRINGS.editModal.edit
        } ${STRINGS.profile.data.toLowerCase()}`}
        title={STRINGS.profile.data}
        submitButtonText={STRINGS.editModal.save}
        apiRoute={API.updateUserPartial}
      />
      <ProfileEditableCard
        editableFields={ADDRESS_CARD_CONFIGS_PROFILE.editableFields}
        labelsObject={ADDRESS_CARD_CONFIGS_PROFILE.labels}
        valuesObject={userAddressCard}
        modalTitle={`${
          STRINGS.editModal.edit
        } ${STRINGS.ADDRESS.toLowerCase()}`}
        title={STRINGS.ADDRESS}
        submitButtonText={STRINGS.editModal.save}
        apiRoute={API.address}
      />
      <ProfileEditableCard
        editableFields={PASSWORD_CARD_CONFIGS_PROFILE.editableFields}
        labelsObject={PASSWORD_CARD_CONFIGS_PROFILE.labels}
        valuesObject={passwordCard}
        modalTitle={`${
          STRINGS.editModal.change
        } ${STRINGS.password.toLowerCase()}`}
        title={STRINGS.password}
        submitButtonText={STRINGS.editModal.save}
      />
      <StyledButtonView>
        <SubmitButton
          icon={StyledLogoutIcon}
          submit={onLogout}
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
`;

const StyledButtonView = styled.View`
  width: 100%;
  padding-horizontal: ${SPACING.small}px;
`;

export default ProfileScreen;
