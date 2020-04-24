/* eslint-disable camelcase */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState, useLayoutEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import styled from 'styled-components/native';

import Camera from '#/components/Camera';
import Icon from '#/components/Icon';
import SubmitButton from '#/components/SubmitButton';
import Label from '#/components/Label';
import PictureButton from './PictureButton';

import { API, SERVER_URL } from '#/config/api';

import STRINGS from '#/utils/strings';
import SPACING from '#/utils/spacing';
import COLORS from '#/utils/colors';
import TYPOGRAPHY from '#/utils/typography';
import { MCI } from '#/utils/enums/ICON_FAMILY';

import {
  getToken,
  onCheckinReservation,
  onGetReservations,
  onGetReservationConfiguration,
  onOpenDoors
} from '#/store/actions/reservationsActions';

const CheckinScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [vehicleRequest, setVehicleRequest] = useState(false);
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [pictureID, setPictureID] = useState(undefined);
  const [observation, setObservation] = useState(true);
  const [checkinFields, setCheckinFields] = useState([]);
  const [selfieField, setSelfieField] = useState({});
  const [isSendingSelfie, setIsSendingSelfie] = useState(false);

  const {
    reservations: { vehicleRequests }
  } = useSelector(({ reservations }) => reservations);

  const dispatch = useDispatch();

  const onOpenCamera = selectedPictureID => {
    setPictureID(selectedPictureID);
    setCameraOpen(true);
  };

  const closeCamera = () => {
    setPictureID(undefined);
    setCameraOpen(false);
  };

  const onSendPicture = base64 => {
    const isSelfie = pictureID === selfieField.id;

    if (isSelfie) setIsSendingSelfie(true);

    const {
      id: form_field_id,
      default: defaultImage,
      description: stepName
    } = isSelfie
      ? selfieField
      : checkinFields.find(field => field.id === pictureID);

    const stepContent = {
      form_field_id,
      defaultImage,
      stepName,
      img: {}
    };

    const form = {
      vehicle_request_id: id,
      step_id: vehicleRequest.step_id,
      stepContent,
      form_field_id
    };

    const formData = { form };
    formData[`formfieldid_${form_field_id}`] = base64;

    getToken()
      .then(token => {
        RNFetchBlob.fetch(
          'POST',
          `${SERVER_URL}/${API.photo}`,
          {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          [
            { name: 'form', data: JSON.stringify(form) },
            {
              name: `formfieldid_${form_field_id}`,
              filename: `checkin_${form_field_id}.png`,
              type: 'image/jpeg',
              data: base64
            }
          ]
        )
          .then(res => {
            if (isSelfie) {
              setSelfieField({ ...selfieField, hasContent: true });
              setIsSendingSelfie(false);
            } else {
              setCheckinFields(
                checkinFields.map(field =>
                  field.id === pictureID
                    ? { ...field, hasContent: true }
                    : field
                )
              );
            }
            console.log(res.data);
          })
          .catch(err => {
            setIsSendingSelfie(false);
            console.log('err: ', err);
          });
      })
      .catch(() => console.log('Erro ao tentar pegar token'));
  };

  const onSubmitKey = async () => {
    await navigation.pop();
    await dispatch(onGetReservations());
    await dispatch(onGetReservationConfiguration(id));
  };

  const onSubmitDoor = async () => {
    await navigation.navigate('ConfirmModal', {
      title: 'A chave está no porta-luvas',
      icon: () => (
        <Icon
          iconName='key'
          iconFaily={MCI}
          size={55}
          color={COLORS.darkGray}
        />
      ),
      hasCancelButton: false,
      onSubmit: onSubmitKey
    });
  };

  const onOpenDoorsAgain = () => {
    dispatch(onOpenDoors(vehicleRequest.vehicle.id));
  };

  const onCheckin = async () => {
    await dispatch(onCheckinReservation(id));
    navigation.navigate('ConfirmModal', {
      title: 'As portas do carro se abriram?',
      icon: () => (
        <Icon iconName='unlock-alt' size={55} color={COLORS.darkGray} />
      ),
      onCancel: onOpenDoorsAgain,
      onSubmit: onSubmitDoor
    });
  };

  useLayoutEffect(() => {
    const reservation = vehicleRequests.find(
      vehicleResquest => vehicleResquest.id === id
    );

    setVehicleRequest(reservation);

    const { reservationConfiguration } = reservation || false;

    if (reservationConfiguration) {
      const mandatorySelfie = reservationConfiguration.find(
        config => config.description.toLowerCase() === 'selfie'
      );

      setSelfieField({ ...mandatorySelfie, hasContent: false });

      setCheckinFields(
        reservationConfiguration
          .filter(config => config.description.toLowerCase() !== 'selfie')
          .map(configFiltered => ({
            ...configFiltered,
            hasContent: false
          }))
      );
    }
  }, [vehicleRequests, id]);

  return (
    <>
      {isCameraOpen ? (
        <Camera
          type={pictureID === selfieField.id ? 'front' : 'back'}
          onSendPicture={onSendPicture}
          closeCamera={closeCamera}
        />
      ) : (
        <StyledContainer>
          <StyledScrollView>
            <Label
              content={STRINGS.reservations.checkinScreen.checkCarSides}
              marginTop={SPACING.small}
              color={COLORS.darkBlueFont}
            />
            <StyledFlatListRow
              horizontal
              showsVerticalScrollIndicator={false}
              data={checkinFields}
              renderItem={({ item }) => (
                <PictureButton
                  size={90}
                  imageName={item.default}
                  hasContent={item.hasContent}
                  onOpenCamera={() => onOpenCamera(item.id)}
                />
              )}
              keyExtractor={item => item.id}
            />

            <StyledTitleRow>
              <Label
                content={STRINGS.reservations.checkinScreen.takeASelfie}
                color={COLORS.darkBlueFont}
              />
            </StyledTitleRow>

            <PictureButton
              size={90}
              imageName={selfieField.default}
              hasContent={selfieField.hasContent}
              onOpenCamera={() => onOpenCamera(selfieField.id)}
            />

            <StyledTextInput
              value={observation}
              onChangeText={setObservation}
              placeholder={STRINGS.reservations.checkinScreen.observation}
              placeholderTextColor={COLORS.darkGray}
              multiline
              selectTextOnFocus
              selectionColor={COLORS.primary}
              autoCorrect={false}
            />
            <SubmitButton
              typographyLabel={TYPOGRAPHY.regularLabelBold}
              submit={() => {
                navigation.pop();
              }}
              title={STRINGS.cancel}
              backgroundColor={COLORS.cancelButton}
              marginVertical={SPACING.regular}
            />
            <StyledSpacingView />
          </StyledScrollView>
          <StyledCheckinButton
            onPress={onCheckin}
            disabled={!selfieField.hasContent}
            color={
              selfieField.hasContent ? COLORS.primary : COLORS.backgroundModal
            }
          >
            {isSendingSelfie ? (
              <ActivityIndicator size='small' color={COLORS.secondary} />
            ) : (
              <Label
                typography={TYPOGRAPHY.regularLabelBold}
                textAlign='center'
                content={STRINGS.reservations.toCheckIn}
                color={COLORS.secondary}
              />
            )}
          </StyledCheckinButton>
        </StyledContainer>
      )}
    </>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${COLORS.secondary};
`;

const StyledScrollView = styled.ScrollView`
  padding-horizontal: ${SPACING.smallPlus}px;
  padding-vertical: ${SPACING.smallPlus}px;
`;

const StyledFlatListRow = styled.FlatList`
  flex-grow: 0;
`;

const StyledTitleRow = styled.View`
  flex-direction: row;
`;

const StyledTextInput = styled.TextInput`
  margin-vertical: ${SPACING.smallPlus}px;
  padding: ${SPACING.small}px;
  border-radius: 7px;
  border-width: 1px;
  border-color: ${COLORS.darkGray};
  font-size: 16px;
`;

const StyledSpacingView = styled.View`
  height: 70px;
  width: 70px;
`;

const StyledCheckinButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  bottom: 0px;
  background-color: ${({ color }) => color};
`;

export default CheckinScreen;
