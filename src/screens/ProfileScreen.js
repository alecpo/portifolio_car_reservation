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
import DATA_CARD_CONFIGS from '~/utils/enums/DATA_CARD_CONFIGS';
import ADDRESS_CARD_CONFIGS from '~/utils/enums/ADDRESS_CARD_CONFIGS';

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

  const dataList = {
    name,
    cpf,
    drive_license,
    birthday: `${moment(birthday).format('DD/MM/YYYY')}`,
    phone,
    email
  };

  const addressList = { street, number, neighborhood, city };

  const onLogout = async () => {
    await dispatch(logout());
  };

  const StyledLogoutIcon = () => (
    <Icon name='md-exit' color={COLORS.secondary} size={20} />
  );

  return (
    <StyledScrollView contentContainerStyle={[{ alignItems: 'center' }]}>
      <ProfileEditableCard
        editableFields={DATA_CARD_CONFIGS.editableFields}
        labelList={DATA_CARD_CONFIGS.labels}
        contentList={dataList}
        title={STRINGS.profile.data}
        apiRoute={API.updateUserPartial}
      />
      <ProfileEditableCard
        editableFields={ADDRESS_CARD_CONFIGS.editableFields}
        labelList={ADDRESS_CARD_CONFIGS.labels}
        contentList={addressList}
        title={STRINGS.ADDRESS}
        apiRoute={API.address}
      />
      {/* <ProfileEditableCard title={STRINGS.password} /> */}
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
  top: ${SPACING.verySmall};
`;

const StyledButtonView = styled.View`
  width: 100%;
  padding-horizontal: ${SPACING.small};
`;

export default ProfileScreen;
