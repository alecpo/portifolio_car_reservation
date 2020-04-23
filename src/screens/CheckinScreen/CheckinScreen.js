/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState, useLayoutEffect } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components/native/';

import Camera from '#/components/Camera';
import SubmitButton from '#/components/SubmitButton';
import Label from '#/components/Label';
import PictureButton from './PictureButton';

import STRINGS from '#/utils/strings';
import SPACING from '#/utils/spacing';
import COLORS from '#/utils/colors';
import TYPOGRAPHY from '#/utils/typography';

const CheckinScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [isCameraOpen, setCameraOpen] = useState(false);
  const [pictureID, setPictureID] = useState(undefined);
  const [observation, setObservation] = useState(true);
  const [checkinFields, setCheckinFields] = useState([]);
  const [selfieField, setSelfieField] = useState({});

  const {
    reservations: { vehicleRequests }
  } = useSelector(({ reservations }) => reservations);

  const onOpenCamera = selectedPictureID => {
    setPictureID(selectedPictureID);
    setCameraOpen(true);
  };

  const closeCamera = () => {
    setPictureID(undefined);
    setCameraOpen(false);
  };

  const onSendPicture = image64 => {
    if (pictureID === selfieField.id)
      setSelfieField({ ...selfieField, hasContent: true });
    else {
      setCheckinFields(
        checkinFields.map(field =>
          field.id === pictureID ? { ...field, hasContent: true } : field
        )
      );
    }
    console.log('imagem: ', image64);
  };

  useLayoutEffect(() => {
    const vehicleRequest = vehicleRequests.find(
      vehicleResquest => vehicleResquest.id === id
    );

    const { reservationConfiguration } = vehicleRequest || false;

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
            disabled={!selfieField.hasContent}
            color={
              selfieField.hasContent ? COLORS.primary : COLORS.backgroundModal
            }
          >
            <Label
              typography={TYPOGRAPHY.regularLabelBold}
              textAlign='center'
              content={STRINGS.reservations.toCheckIn}
              color={COLORS.secondary}
            />
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
