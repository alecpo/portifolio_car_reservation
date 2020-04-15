import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native/';

import ReservationHistoryCard from '~/screens/ReservationsHistoryScreen/ReservationHistoryCard';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

import {
  onRefresh,
  onLoadMoreReservation
} from '~/store/actions/reservationsActions';

const ReservationsHistoryScreen = () => {
  const {
    isLoading,
    reservations: { next, vehicleRequests }
  } = useSelector(({ reservations }) => reservations);

  const { userToken } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const onLoadMore = () => {
    if (userToken && !isLoading && next) {
      dispatch(onLoadMoreReservation(next));
    }
  };

  const onRefreshList = () => {
    if (userToken) {
      dispatch(onRefresh());
    }
  };

  return (
    <StyledContainer>
      <StyledFlatList
        showsVerticalScrollIndicator={false}
        data={vehicleRequests}
        renderItem={({ item }) => (
          <ReservationHistoryCard transactionData={item} />
        )}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={onLoadMore}
        scrollEventThrottle={400}
        refreshing={isLoading}
        onRefresh={onRefreshList}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.secondary};
`;

const StyledFlatList = styled.FlatList`
  padding-horizontal: ${SPACING.small}px;
`;

export default ReservationsHistoryScreen;
