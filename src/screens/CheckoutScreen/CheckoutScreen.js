/* eslint-disable camelcase */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState, useLayoutEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import styled from 'styled-components/native';

import Camera from '#/components/Camera';
import Icon from '#/components/Icon';
import SubmitButton from '#/components/SubmitButton';
import Label from '#/components/Label';
import FeedBackForm from './FeedBackForm';
import PictureButton from './PictureButton';

import { API, SERVER_URL } from '#/config/api';

import STRINGS from '#/utils/strings';
import SPACING from '#/utils/spacing';
import COLORS from '#/utils/colors';
import TYPOGRAPHY from '#/utils/typography';
import { MCI } from '#/utils/enums/ICON_FAMILY';

import {
  getToken,
  onCheckoutReservation,
  onGetReservations,
  onCloseDoors
} from '#/store/actions/reservationsActions';

import success from '#/assets/svgAnimations/success';

const CheckoutScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [vehicleRequest, setVehicleRequest] = useState(false);
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [pictureID, setPictureID] = useState(undefined);
  const [observation, setObservation] = useState(true);
  const [checkinFields, setCheckinFields] = useState([]);
  const [estepeField, setEstepeField] = useState({});
  const [isSendingEstepe, setIsSendingSelfie] = useState(false);

  const {
    reservations: { vehicleRequests }
  } = useSelector(({ reservations }) => reservations);

  const initialValues = {
    rating: 0,
    odorCarro: '',
    estadoCarroDefeito: '',
    obsDefeitoCarro: '',
    obsOutras: '',
    estadoInterno: '',
    estadoExterno: ''
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    // eslint-disable-next-line no-use-before-define
    onSubmit: () => onClickToCheckout()
  });

  const onFinishCheckout = async () => {
    await dispatch(onCheckoutReservation(id, formik.values));
    await navigation.pop();
    await dispatch(onGetReservations());
  };

  const onClickToCloseDoors = async () => {
    await dispatch(onCloseDoors(vehicleRequest.vehicle.id));
    navigation.navigate('PublicModals', {
      screen: 'LoadingModal',
      params: {
        lottieJson: success,
        title: STRINGS.reservations.openCloseDoorAgainSuccessMessage,
        finishSuccessAnimation: () =>
          navigation.navigate('OnlineModals', {
            screen: 'ConfirmModal',
            params: {
              title:
                STRINGS.reservations.checkoutScreen.feedbackForm.isDoorsClose,
              icon: () => (
                <Icon iconName='lock' size={55} color={COLORS.darkGray} />
              ),
              onCancel: onClickToCloseDoors,
              onSubmit: onFinishCheckout
            }
          })
      }
    });
  };

  const onClickToCheckout = async () => {
    navigation.navigate('OnlineModals', {
      screen: 'ConfirmModal',
      params: {
        title:
          STRINGS.reservations.checkoutScreen.feedbackForm.areYouInTheCarTitle,
        desc:
          STRINGS.reservations.checkoutScreen.feedbackForm
            .areYouInTheCarMessage,
        icon: () => (
          <Icon
            iconName='alert-octagon-outline'
            iconFamily={MCI}
            size={65}
            color={COLORS.darkGray}
          />
        ),
        hasCancelButton: false,
        submitButtonLabel: STRINGS.reservations.closeDoors,
        onSubmit: onClickToCloseDoors
      }
    });
  };

  const onOpenCamera = selectedPictureID => {
    setPictureID(selectedPictureID);
    setCameraOpen(true);
  };

  const closeCamera = () => {
    setPictureID(undefined);
    setCameraOpen(false);
  };

  const onSendPicture = base64 => {
    const isSelfie = pictureID === estepeField.id;

    if (isSelfie) setIsSendingSelfie(true);

    const {
      id: form_field_id,
      default: defaultImage,
      description: stepName
    } = isSelfie
      ? estepeField
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
              setEstepeField({ ...estepeField, hasContent: true });
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

  useLayoutEffect(() => {
    const reservation = vehicleRequests.find(
      vehicleResquest => vehicleResquest.id === id
    );

    setVehicleRequest(reservation);

    const { reservationConfiguration } = reservation || false;

    if (reservationConfiguration) {
      const mandatorySelfie = reservationConfiguration.find(
        config => config.description.toLowerCase() === 'estepe'
      );

      setEstepeField({ ...mandatorySelfie, hasContent: false });

      setCheckinFields(
        reservationConfiguration
          .filter(config => config.description.toLowerCase() !== 'estepe')
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
          type='back'
          onSendPicture={onSendPicture}
          closeCamera={closeCamera}
        />
      ) : (
        <StyledContainer>
          <StyledScrollView>
            <Label
              content={STRINGS.reservations.checkCarSides}
              color={COLORS.primary}
              marginTop={SPACING.smallPlus}
              marginBottom={SPACING.smallPlus}
              typography={TYPOGRAPHY.mediumLabelBold}
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
            <Label
              content={STRINGS.reservations.checkoutScreen.takeAEstepePicture}
              color={COLORS.primary}
              marginTop={SPACING.smallPlus}
              marginBottom={SPACING.smallPlus}
              typography={TYPOGRAPHY.mediumLabelBold}
            />
            <PictureButton
              size={90}
              imageName={estepeField.default}
              hasContent={estepeField.hasContent}
              onOpenCamera={() => onOpenCamera(estepeField.id)}
            />
            <StyledTextInput
              value={observation}
              onChangeText={setObservation}
              placeholder={STRINGS.observation}
              placeholderTextColor={COLORS.darkGray}
              multiline
              selectTextOnFocus
              selectionColor={COLORS.primary}
              autoCorrect={false}
            />
            <Label
              content={STRINGS.feedback}
              color={COLORS.primary}
              marginTop={SPACING.smallPlus}
              marginBottom={SPACING.smallPlus}
              typography={TYPOGRAPHY.mediumLabelBold}
            />
            <FeedBackForm formik={formik} />
            <SubmitButton
              typographyLabel={TYPOGRAPHY.mediumLabelBold}
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
            onPress={formik.handleSubmit}
            disabled={!estepeField.hasContent || !formik.values.rating}
            color={
              estepeField.hasContent && formik.values.rating
                ? COLORS.primary
                : COLORS.backgroundModal
            }
          >
            {isSendingEstepe ? (
              <ActivityIndicator size='small' color={COLORS.secondary} />
            ) : (
              <Label
                typography={TYPOGRAPHY.mediumLabelBold}
                textAlign='center'
                content={STRINGS.reservations.toCheckOut}
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

export default CheckoutScreen;
