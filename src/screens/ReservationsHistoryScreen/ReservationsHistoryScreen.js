import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native/';

import ReservationHistoryCard from '~/screens/ReservationsHistoryScreen/ReservationHistoryCard';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

import {
  onGetReservations,
  onLoadMoreReservation
} from '~/store/actions/reservationsHistoryActions';

const ReservationsHistoryScreen = () => {
  const {
    isLoading,
    reservationsHistory: { next, vehicleRequests }
  } = useSelector(({ reservationsHistory }) => reservationsHistory);

  const { userToken } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (userToken) dispatch(onGetReservations());
  }, [dispatch, userToken]);

  const onLoadMore = () => {
    if (userToken && !isLoading && next) {
      dispatch(onLoadMoreReservation(next));
    }
  };

  const onRefresh = () => {
    if (userToken) {
      dispatch(onGetReservations());
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
        onRefresh={onRefresh}
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
