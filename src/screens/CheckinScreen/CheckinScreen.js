/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState, useLayoutEffect } from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components/native/';

import SubmitButton from '#/components/SubmitButton';
import PictureButton from './PictureButton';
import Label from '#/components/Label';

import STRINGS from '#/utils/strings';
import SPACING from '#/utils/spacing';
import COLORS from '#/utils/colors';

const CheckinScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [observation, setObservation] = useState(true);
  const [checkinFields, setCheckinFields] = useState([]);
  const [selfie, setSelfie] = useState(false);
  const [selfieField, setSelfieField] = useState({});

  const {
    reservations: { vehicleRequests }
  } = useSelector(({ reservations }) => reservations);

  useLayoutEffect(() => {
    const vehicleRequest = vehicleRequests.find(
      vehicleResquest => vehicleResquest.id === id
    );

    const { reservationConfiguration } = vehicleRequest || false;

    if (reservationConfiguration) {
      setSelfieField(
        reservationConfiguration.find(
          config => config.description.toLowerCase() === 'selfie'
        )
      );
      setCheckinFields(
        reservationConfiguration.filter(
          config => config.description.toLowerCase() !== 'selfie'
        )
      );
    }
  }, [vehicleRequests, id]);

  return (
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
            <PictureButton size={90} imageName={item.default} />
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
          isSelfie
          setSelfieCallback={() => setSelfie(!selfie)}
        />

        <StyledTextInput
          value={observation}
          onChangeText={setObservation}
          placeholder='Observação'
          placeholderTextColor={COLORS.darkGray}
          multiline
          selectTextOnFocus
          autoFocus
          selectionColor={COLORS.primary}
          autoCorrect={false}
        />
        <SubmitButton
          submit={() => {
            navigation.pop();
          }}
          title={STRINGS.cancel}
          backgroundColor={COLORS.cancelButton}
          marginVertical={SPACING.smallPlus}
          testID='loginButtonLoginScreen'
        />
        <StyledSpacingView />
      </StyledScrollView>
      <StyledCheckinButton
        disabled={!selfie}
        color={selfie ? COLORS.primary : COLORS.backgroundModal}
      >
        <Label
          textAlign='center'
          content={STRINGS.reservations.toCheckIn}
          color={COLORS.secondary}
        />
      </StyledCheckinButton>
    </StyledContainer>
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
  height: 50px;
  width: 50px;
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
