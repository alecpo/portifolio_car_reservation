import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native/';

import NoRegisterDataCard from '~/components/NoRegisterDataCard';
import ReservationCard from './ReservationCard';

import STRINGS from '~/utils/strings';
import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import { MI } from '~/utils/enums/ICON_FAMILY';

const ReservationsScreen = ({ navigation }) => {
  const { userToken } = useSelector(({ user }) => user);
  const {
    reservationsHistory: { vehicleRequests }
  } = useSelector(({ reservationsHistory }) => reservationsHistory);

  const [
    activeOrFutureReservationsList,
    setActiveOrFutureReservationsList
  ] = useState(vehicleRequests);

  const updateActiveAndFutureList = useCallback(() => {
    setActiveOrFutureReservationsList(
      vehicleRequests.filter(
        vehicleRequest =>
          vehicleRequest.step.code &&
          ['cancel', 'auto-cancel', 'complete'].indexOf(
            vehicleRequest.step.code
          ) < 0
      )
    );
  }, [vehicleRequests]);

  useEffect(() => {
    if (userToken) updateActiveAndFutureList();
  }, [updateActiveAndFutureList, userToken]);

  const teste = useCallback(
    () =>
      console.log(
        'activeOrFutureReservationsList: ',
        activeOrFutureReservationsList
      ),
    [activeOrFutureReservationsList]
  );

  useEffect(() => teste(), [teste]);

  return (
    <StyledContainer>
      {!activeOrFutureReservationsList.length ? (
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
          renderItem={({ item }) => (
            <ReservationCard
              vehicle={item.vehicle}
              begin_date={item.begin_date}
              end_date={item.end_date}
            />
          )}
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

export default ReservationsScreen;
