/* eslint-disable camelcase */
import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Icon from '#/components/Icon';
import Label from '#/components/Label';
import SubmitButton from '#/components/SubmitButton';
import VehicleCard from '#/components/VehicleCard';
import DivisorLine from '#/components/DivisorLine';

import STRINGS from '#/utils/strings';
import COLORS from '#/utils/colors';
import TYPOGRAPHY from '#/utils/typography';
import SPACING from '#/utils/spacing';
import { MCI } from '#/utils/enums/ICON_FAMILY';

import {
  onCancelReservation,
  onGetReservationConfiguration,
  finishAnimation,
  onOpenDoors
} from '#/store/actions/reservationsActions';

import success from '#/assets/svgAnimations/success';

const renderRow = (label, value) => (
  <StyledRowView>
    <Label
      typography={TYPOGRAPHY.regularLabelBold}
      content={label}
      color={COLORS.darkBlueFont}
    />
    <Label
      typography={TYPOGRAPHY.regularLabel}
      content={moment(value).format('DD/MM/YYYY HH:mm')}
      color={COLORS.darkBlueFont}
    />
  </StyledRowView>
);

const ReservationCard = ({ id, step, vehicle, begin_date, end_date }) => {
  const navigation = useNavigation();

  const [isCheckinDisabled, setCheckinDisabled] = useState(true);
  const [vehicleRequest, setVehicleRequest] = useState({});

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

  const {
    reservations: { vehicleRequests }
  } = useSelector(({ reservations }) => reservations);

  const dispatch = useDispatch();

  const onCancel = motive => {
    dispatch(onCancelReservation(id, motive));
  };

  const onCheckout = async () => {
    await dispatch(onGetReservationConfiguration(id));
    await navigation.navigate('Checkout', { id });
    await navigation.navigate('OnlineModals', {
      screen: 'ConfirmModal',
      params: {
        title:
          STRINGS.reservations.checkoutScreen.feedbackForm
            .doYouHaveTheKeysTitle,
        desc:
          STRINGS.reservations.checkoutScreen.feedbackForm
            .doYouHaveTheKeysMessage,
        icon: () => (
          <Icon
            iconName='key'
            iconFaily={MCI}
            size={55}
            color={COLORS.darkGray}
          />
        ),
        hasCancelButton: false
      }
    });
  };

  const onOpenDoorsAgain = () => {
    dispatch(onOpenDoors(vehicleRequest.vehicle.id));
    navigation.navigate('PublicModals', {
      screen: 'LoadingModal',
      params: {
        lottieJson: success,
        title: STRINGS.reservations.openCloseDoorAgainSuccessMessage,
        finishSuccessAnimation: () =>
          navigation.navigate('OnlineModals', {
            screen: 'ConfirmModal',
            params: {
              title: STRINGS.reservations.isDoorsOpen,
              icon: () => (
                <Icon iconName='unlock-alt' size={55} color={COLORS.darkGray} />
              ),
              onCancel: onOpenDoorsAgain
            }
          })
      }
    });
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

  useLayoutEffect(() => {
    setVehicleRequest(
      vehicleRequests.find(vehicleResquest => vehicleResquest.id === id)
    );
  }, [id, vehicleRequests]);

  return (
    <StyledContainer>
      <VehicleCard {...vehicle} />
      <DivisorLine marginVertical={SPACING.small} />
      {renderRow(STRINGS.checkin, begin_date)}
      {renderRow(STRINGS.checkout, end_date)}
      <DivisorLine marginVertical={SPACING.small} />
      {step.code.toLowerCase() === 'check-in' ? (
        <>
          <SubmitButton
            submit={async () => {
              await dispatch(onGetReservationConfiguration(id));
              navigation.navigate('Checkin', { id });
            }}
            disabled={isCheckinDisabled}
            backgroundColor={COLORS.primary}
            title={STRINGS.reservations.toCheckIn}
            marginVertical={SPACING.verySmall}
          />
          <SubmitButton
            submit={
              isCancellingAfterAllowedTime
                ? async () => {
                    await navigation.navigate('OnlineModals', {
                      screen: 'CancellingAfterTimeModal',
                      params: {
                        title: STRINGS.reservations.cancelModal.title,
                        successMessage:
                          STRINGS.reservations.cancelModal.successMessage,
                        placeholder:
                          STRINGS.reservations.cancelModal.placeholder,
                        finishSuccessAnimation: () => {
                          dispatch(finishAnimation());
                        },
                        onSubmit: motive => onCancel(motive)
                      }
                    });
                  }
                : () => {
                    navigation.navigate('OnlineModals', {
                      screen: 'DeleteWithJustificationModal',
                      params: {
                        title: STRINGS.reservations.cancelModal.title,
                        successMessage:
                          STRINGS.reservations.cancelModal.successMessage,
                        placeholder:
                          STRINGS.reservations.cancelModal.placeholder,
                        finishSuccessAnimation: () => {
                          dispatch(finishAnimation());
                        },
                        onSubmit: motive => onCancel(motive)
                      }
                    });
                  }
            }
            backgroundColor={COLORS.cancelButton}
            title={STRINGS.reservations.cancel}
            marginVertical={SPACING.verySmall}
          />
        </>
      ) : (
        <>
          <SubmitButton
            submit={onCheckout}
            backgroundColor={COLORS.primary}
            title={STRINGS.reservations.toCheckOut}
            marginVertical={SPACING.verySmall}
          />
          <SubmitButton
            submit={onOpenDoorsAgain}
            backgroundColor={COLORS.successButton}
            title={STRINGS.reservations.openDors}
            marginVertical={SPACING.verySmall}
          />
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
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
