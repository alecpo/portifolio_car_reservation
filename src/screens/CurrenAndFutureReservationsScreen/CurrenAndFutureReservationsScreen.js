import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native/';

import NoRegisterDataCard from '#/components/NoRegisterDataCard';
import ReservationCard from './ReservationCard';

import STRINGS from '#/utils/strings';
import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import { MI } from '#/utils/enums/ICON_FAMILY';

const CurrenAndFutureReservationsScreen = ({ navigation }) => {
  const { userToken } = useSelector(({ user }) => user);
  const {
    isLoading,
    isAnimating,
    reservations: { vehicleRequests }
  } = useSelector(({ reservations }) => reservations);

  useEffect(() => {
    if (userToken)
      if (isLoading && !isAnimating) {
        navigation.navigate('LoadingModal');
      } else if (!navigation.isFocused() && !isAnimating) navigation.pop();
  }, [userToken, isLoading, navigation, isAnimating]);

  return (
    <StyledContainer>
      {!vehicleRequests.filter(
        vehicleRequest =>
          vehicleRequest.step.code &&
          ['cancel', 'auto-cancel', 'complete'].indexOf(
            vehicleRequest.step.code
          ) < 0
      ).length ? (
        <NoRegisterDataCard
          desc={STRINGS.reservations.noActiveOrFutureReservation}
          labelButton={STRINGS.reservations.newReservation}
          onSubmit={() => {
            navigation.navigate('Home');
          }}
          iconFamily={MI}
          iconName='alarm-off'
        />
      ) : (
        <StyledFlatList
          showsVerticalScrollIndicator={false}
          data={vehicleRequests.filter(
            vehicleRequest =>
              vehicleRequest.step.code &&
              ['cancel', 'auto-cancel', 'complete'].indexOf(
                vehicleRequest.step.code
              ) < 0
          )}
          renderItem={({ item }) => <ReservationCard {...item} />}
          keyExtractor={item => item.id}
        />
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  padding: ${SPACING.verySmall}px;
  background-color: ${COLORS.secondary};
`;

const StyledFlatList = styled.FlatList`
  padding-horizontal: ${SPACING.verySmall}px;
`;

export default CurrenAndFutureReservationsScreen;
