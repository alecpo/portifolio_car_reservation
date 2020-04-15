/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
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

const now = moment(new Date());

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
  const [isCheckinDisabled, setCheckinDisabled] = useState(true);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onCancel = reservationId => {
    dispatch(onCancelReservation(reservationId));
  };

  useEffect(() => {
    const timeLeftToCheckin = moment(begin_date)
      .subtract(10, 'minutes')
      .diff(now);

    if (timeLeftToCheckin < 0) setCheckinDisabled(false);
    else if (timeLeftToCheckin / 60000 <= 25)
      setInterval(() => setCheckinDisabled(false), timeLeftToCheckin);
  }, []);

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
        submit={() => {
          navigation.navigate('DeleteModalWithJustification', {
            title: STRINGS.reservations.cancelModal.title,
            successMessage: STRINGS.reservations.cancelModal.successMessage,
            placeholder: STRINGS.reservations.cancelModal.placeholder,
            finishSuccessAnimation: () => {
              dispatch(finishAnimation());
            },
            onSubmit: motive => onCancel(id, motive)
          });
        }}
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
