/* eslint-disable camelcase */
import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Label from '~/components/Label';
import SubmitButton from '~/components/SubmitButton';
import VehicleCard from '~/components/VehicleCard';
import DivisorLine from '~/components/DivisorLine';

import STRINGS from '~/utils/strings';
import COLORS from '~/utils/colors';
import TYPOGRAPHY from '~/utils/typography';
import SPACING from '~/utils/spacing';

import {
  onCancelReservation,
  finishAnimation
} from '~/store/actions/reservationsActions';

const renderRow = (label, value) => (
  <StyledRowView>
    <Label
      typography={TYPOGRAPHY.regularLabelBold}
      content={label}
      color={COLORS.historyCardFont}
    />
    <Label
      typography={TYPOGRAPHY.regularLabel}
      content={moment(value).format('DD/MM/YYYY HH:mm')}
      color={COLORS.historyCardFont}
    />
  </StyledRowView>
);

const ReservationCard = ({ id, vehicle, begin_date, end_date }) => {
  const navigation = useNavigation();

  const [isCheckinDisabled, setCheckinDisabled] = useState(true);

  const [
    isCancellingAfterAllowedTime,
    setCancellingAfterAllowedTime
  ] = useState(false);

  const {
    configuration: {
      limit_minutes_before_checkin: { value: limitCheckin },
      limit_minutes_before_cancelation: { value: limitCancellation }
    }
  } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const onCancel = reservationId => {
    dispatch(onCancelReservation(reservationId));
  };

  useLayoutEffect(() => {
    // Ambas as datas para o mesmo formato (PM)
    const now = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
    const formatedBeginDate = moment(begin_date)
      .subtract(parseInt(limitCancellation, 10) ?? 15, 'minutes')
      .format('YYYY-MM-DD hh:mm:ss');

    const timeLeftToCheckinBecomeAvailable = moment(formatedBeginDate).diff(
      moment(now)
    );

    const timeLeftToCheckinBecomeAvailableInMinutes =
      timeLeftToCheckinBecomeAvailable / 60000;

    if (timeLeftToCheckinBecomeAvailableInMinutes <= 0.5)
      setCancellingAfterAllowedTime(true);
    else if (timeLeftToCheckinBecomeAvailableInMinutes <= 25)
      setInterval(
        () => setCancellingAfterAllowedTime(true),
        timeLeftToCheckinBecomeAvailable
      );
  }, [begin_date, limitCancellation]);

  useLayoutEffect(() => {
    // Ambas as datas para o mesmo formato (PM)
    const now = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
    const formatedBeginDate = moment(begin_date)
      .subtract(parseInt(limitCheckin, 10) ?? 15, 'minutes')
      .format('YYYY-MM-DD hh:mm:ss');

    const timeLeftToCheckinBecomeAvailable = moment(formatedBeginDate).diff(
      moment(now)
    );

    const timeLeftToCheckinBecomeAvailableInMinutes =
      timeLeftToCheckinBecomeAvailable / 60000;

    if (timeLeftToCheckinBecomeAvailableInMinutes <= 0.5)
      setCheckinDisabled(false);
    else if (timeLeftToCheckinBecomeAvailableInMinutes <= 25)
      setInterval(
        () => setCheckinDisabled(false),
        timeLeftToCheckinBecomeAvailable
      );
  }, [begin_date, limitCheckin]);

  return (
    <StyledContainer>
      <VehicleCard {...vehicle} />
      <DivisorLine marginVertical={SPACING.small} />
      {renderRow(STRINGS.checkin, begin_date)}
      {renderRow(STRINGS.checkout, end_date)}
      <DivisorLine marginVertical={SPACING.small} />
      <SubmitButton
        submit={() => {}}
        disabled={isCheckinDisabled}
        backgroundColor={COLORS.primary}
        title={STRINGS.reservations.checkin}
        marginVertical={SPACING.verySmall}
      />
      <SubmitButton
        submit={
          isCancellingAfterAllowedTime
            ? async () => {
                await navigation.navigate('CancellingAfterTimeModal', {
                  title: STRINGS.reservations.cancelModal.title,
                  successMessage:
                    STRINGS.reservations.cancelModal.successMessage,
                  placeholder: STRINGS.reservations.cancelModal.placeholder,
                  finishSuccessAnimation: () => {
                    dispatch(finishAnimation());
                  },
                  onSubmit: motive => onCancel(id, motive)
                });
              }
            : () => {
                navigation.navigate('DeleteWithJustificationModal', {
                  title: STRINGS.reservations.cancelModal.title,
                  successMessage:
                    STRINGS.reservations.cancelModal.successMessage,
                  placeholder: STRINGS.reservations.cancelModal.placeholder,
                  finishSuccessAnimation: () => {
                    dispatch(finishAnimation());
                  },
                  onSubmit: motive => onCancel(id, motive)
                });
              }
        }
        backgroundColor={COLORS.red}
        title={STRINGS.reservations.cancel}
        marginVertical={SPACING.verySmall}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  height: ${Dimensions.get('window').width * 1.1}px;
  justify-content: center;
  padding: ${SPACING.small}px;
  margin-vertical: ${SPACING.small}px;
  margin-horizontal: ${SPACING.verySmall}px;
  border-radius: 7px;
  background-color: ${COLORS.secondary};
  elevation: 5;
  box-shadow: 3px 2px 3px rgba(0, 0, 0, 0.3);
`;

const StyledRowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${SPACING.verySmall}px;
`;

ReservationCard.propTypes = PropTypes.shape({
  onSubmit: PropTypes.func,
  desc: PropTypes.string,
  iconFamily: PropTypes.string,
  iconName: PropTypes.strings
}).isRequired;

export default ReservationCard;
