/* eslint-disable camelcase */
import React from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native/';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import EditModal from '~/components/EditModal';
import SubmitButton from '~/components/SubmitButton';
import ProfileEditableCard from '~/components/ProfileEditableCard';

import STRINGS from '~/utils/strings';
import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';
import DATA_CARD_LABELS from '~/utils/enums/profileEditDataCard';
import ADDRESS_CARD_LABELS from '~/utils/enums/profileEditAddressCard';

import { logout } from '~/store/actions/userActions';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { name, cpf, drive_license, birthday, phone, email } = useSelector(
    ({ user }) => user
  );

  const dataList = [
    `${name}`,
    `${cpf}`,
    `${drive_license}`,
    `${moment(birthday).format('DD/MM/YYYY')}`,
    `${phone}`,
    `${email}`
  ];

  const addressList = [];

  const onLogout = async () => {
    await dispatch(logout());
  };

  const StyledLogoutIcon = () => (
    <Icon name='md-exit' color={COLORS.secondary} size={20} />
  );

  return (
    <>
      <StyledContainer>
        {/* <Modal
          presentationStyle='overFullScreen'
          animationType='slide'
          transparent={false}
          visible={true}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <EditModal />
        </Modal> */}

        <ProfileEditableCard
          onPress={() => navigation.navigate('EditModal')}
          labelList={DATA_CARD_LABELS}
          contentList={dataList}
          title={STRINGS.profile.data}
        />
        <ProfileEditableCard
          labelList={ADDRESS_CARD_LABELS}
          contentList={addressList}
          title={STRINGS.ADDRESS}
        />
        <ProfileEditableCard title={STRINGS.password} />
        <SubmitButton
          icon={StyledLogoutIcon}
          submit={onLogout}
          title={STRINGS.LOGOUT}
          backgroundColor={COLORS.cancelButton}
        />
      </StyledContainer>
      {/* <EditModal /> */}
    </>
  );
};

const StyledContainer = styled.ScrollView`
  padding: ${SPACING.small};
`;

export default ProfileScreen;
