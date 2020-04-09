/* eslint-disable camelcase */
import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import moment from 'moment';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Label from '~/components/Label';
import DivisorLine from '~/components/DivisorLine';
import VehicleCard from '~/components/VehicleCard';

import API from '~/config/api';

import STRINGS from '~/utils/strings';
import TYPOGRAPHY from '~/utils/typography';
import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';

const ReservationHistoryDetailsScreen = ({ route, navigation }) => {
  const { title, transactionData } = route.params ?? {};
  const stars = ['', '', '', '', ''];

  const {
    formFeedback,
    formAnswered,
    beginOdometer,
    endOdometer,
    vehicle,
    total_km_value,
    penalty_value,
    begin_date,
    end_date,
    transaction
  } = transactionData;

  const { valor_pre_autorizado, total_value_charged } = transaction[0];

  const formatValue = (key, value) => {
    switch (key) {
      case 'date':
        return moment(value).format('DD/MM/YYYY HH:mm');
      case 'price':
        return `R$ ${parseFloat(value ?? 0).toFixed(2)}`;
      case 'minutes':
        return `${value ?? 0} min`;
      case 'distance':
        return `${value} km`;
      default:
        return value;
    }
  };

  const renderStars = (value, index) => {
    if (value === 0)
      return <Icon name='star-border' color={COLORS.star} size={25} />;
    return (
      <Icon
        name={index <= value ? 'star' : 'star-border'}
        color={COLORS.star}
        size={30}
      />
    );
  };

  const renderRow = (label, value, type, isTotal) => (
    <StyledRowView>
      <Label
        typography={TYPOGRAPHY.smallLabelBold}
        content={label}
        color={COLORS.historyCardFont}
      />
      <Label
        typography={isTotal ? TYPOGRAPHY.smallLabelBold : TYPOGRAPHY.smallLabel}
        content={formatValue(type, value)}
        color={COLORS.historyCardFont}
      />
    </StyledRowView>
  );

  return (
    <StyledContainer>
      <StatusBar hidden />
      <StyledModalContent>
        <StyledHeader>
          <Label
            content={`${title}:`}
            typography={TYPOGRAPHY.mediumLabelBold}
            color={COLORS.black}
          />
          <StyledCloseButton
            onPress={() => {
              navigation.pop();
            }}
          >
            <Icon name='close' size={25} />
          </StyledCloseButton>
        </StyledHeader>
        <DivisorLine thickness={0.5} marginVertical={SPACING.verySmall} />

        <StyledScrollViewBody showsVerticalScrollIndicator={false}>
          <VehicleCard {...vehicle} />
          {formFeedback && (
            <>
              <DivisorLine thickness={0.5} marginVertical={SPACING.regular} />

              <StyledStarsView>
                {stars.map((item, index) =>
                  renderStars(formFeedback.form_date.rating, index + 1)
                )}
              </StyledStarsView>
            </>
          )}
          <DivisorLine thickness={0.5} marginVertical={SPACING.regular} />
          <>
            {renderRow(STRINGS.checkin, begin_date, 'date')}
            {renderRow(STRINGS.checkout, end_date, 'date')}
            {renderRow(
              STRINGS.ReservationHistoryDetails.reservationValue,
              parseFloat(valor_pre_autorizado) / 100,
              'price'
            )}
            {renderRow(
              STRINGS.ReservationHistoryDetails.mileageTraveled,
              endOdometer - beginOdometer,
              'distance'
            )}
            {renderRow(
              STRINGS.ReservationHistoryDetails.mileageAmountCharged,
              total_km_value,
              'price'
            )}
            {renderRow(
              STRINGS.ReservationHistoryDetails.delayTime,
              endOdometer,
              'minutes'
            )}
            {renderRow(
              STRINGS.ReservationHistoryDetails.latePenalty,
              penalty_value,
              'price'
            )}
            {renderRow(STRINGS.total, total_value_charged, 'price', true)}
          </>
          {formAnswered.length > 0 && (
            <>
              <DivisorLine thickness={0.5} marginVertical={SPACING.regular} />
              {formAnswered.map(({ answer }) => (
                <StyledImage source={{ uri: `${API.BUCKET}/${answer}` }} />
              ))}
            </>
          )}
        </StyledScrollViewBody>
      </StyledModalContent>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundModal};
`;

const StyledScrollViewBody = styled.ScrollView`
  margin-vertical: ${SPACING.regular}px;
`;

const StyledModalContent = styled.View`
  width: ${Dimensions.get('window').width * 0.88}px;
  height: ${Dimensions.get('window').width * 1.7}px;
  background-color: white;
  padding-vertical: ${SPACING.smallPlus}px;
  padding-horizontal: ${SPACING.regular}px;
`;

const StyledHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledCloseButton = styled.TouchableOpacity`
  padding-vertical: ${SPACING.verySmall}px;
`;

const StyledRowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${SPACING.verySmall}px;
`;

const StyledStarsView = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 140px;
  margin-vertical: ${SPACING.verySmall}px;
  border-radius: 10px;
`;

export default ReservationHistoryDetailsScreen;
