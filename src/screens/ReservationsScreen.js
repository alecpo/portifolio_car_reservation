import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native/';
import NoRegisterDataCard from '~/components/NoRegisterDataCard';

import STRINGS from '~/utils/strings';
import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import { MI } from '~/utils/enums/ICON_FAMILY';

const ReservationsScreen = ({ navigation }) => {
  const {
    reservationsHistory: { vehicleRequests }
  } = useSelector(({ reservationsHistory }) => reservationsHistory);

  const [
    activeOrFutureReservationsList,
    setActiveOrFutureReservationsList
  ] = useState([]);

  useLayoutEffect(() => {
    setActiveOrFutureReservationsList(
      vehicleRequests.filter(
        vehicleRequest =>
          ['cancel', 'auto-cancel', 'complete'].indexOf(
            vehicleRequest.step.code
          ) >= 0
      )
    );
  }, [vehicleRequests]);

  useEffect(() => {
    console.log(
      'activeOrFutureReservationsList: ',
      activeOrFutureReservationsList
    );
  }, [activeOrFutureReservationsList]);

  return (
    <StyledContainer>
      {!activeOrFutureReservationsList.length && (
        <NoRegisterDataCard
          desc={STRINGS.reservations.noActiveOrFutureReservation}
          labelButton={STRINGS.reservations.newReservation}
          onSubmit={() => {
            navigation.navigate('Home');
          }}
          iconFamily={MI}
          iconName='alarm-off'
        />
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  padding: ${SPACING.smallPlus}px;
  background-color: ${COLORS.secondary};
`;

export default ReservationsScreen;
