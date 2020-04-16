/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Label from '~/components/Label';

import STRINGS from '~/utils/strings';
import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import TYPOGRAPHY from '~/utils/typography';

const ReservationHistoryCard = ({ transactionData }) => {
  const {
    vehicle: {
      vehicle_model: { model },
      plate
    },
    total_km_value,
    penalty_value,
    begin_date,
    end_date,
    step: { code },
    transaction
  } = transactionData;

  let total = 0;
  const pre_autorizado = parseInt(transaction[0]?.valor_pre_autorizado, 10);
  const total_km = parseInt(total_km_value, 10) * 100;
  const penalty = parseInt(penalty_value, 10) * 100;

  if (typeof pre_autorizado === 'number' && pre_autorizado > 0)
    total += total + pre_autorizado;
  if (typeof total_km === 'number' && total_km > 0) total += total + total_km;
  if (typeof penalty === 'number' && penalty > 0) total += total + penalty;

  total /= 100;

  const navigation = useNavigation();

  if (transactionData.transaction.length === 0)
    transactionData.transaction.push({
      valor_pre_autorizado: '0',
      total_value_charged: '0'
    });
  else {
    // eslint-disable-next-line no-param-reassign
    transactionData.transaction[0].total_value_charged = total;
  }

  const onClickCard = () => {
    navigation.navigate('ReservationHistoryDetailsModal', {
      title: STRINGS.ReservationHistoryDetailsModal.title,
      transactionData
    });
  };

  return (
    <StyledContainer
      onPress={onClickCard}
      disabled={code === 'auto-cancel' || code === 'cancel'}
    >
      <StyledRowView>
        <Label content={`${model} - ${plate}`} color={COLORS.historyCardFont} />
        {code === 'auto-cancel' || code === 'cancel' ? (
          <Label content={STRINGS.canceled} color={COLORS.red} />
        ) : (
          <Icon name='info' size={23} color={COLORS.historyCardFont} />
        )}
      </StyledRowView>
      <StyledRowView>
        <Label content={STRINGS.checkin} color={COLORS.historyCardFont} />
        <Label
          typography={TYPOGRAPHY.regularLabel}
          content={moment(begin_date).format('DD/MM/YYYY HH:mm')}
          color={COLORS.historyCardFont}
        />
      </StyledRowView>
      <StyledRowView>
        <Label content={STRINGS.checkout} color={COLORS.historyCardFont} />
        <Label
          typography={TYPOGRAPHY.regularLabel}
          content={moment(end_date).format('DD/MM/YYYY HH:mm')}
          color={COLORS.historyCardFont}
        />
      </StyledRowView>
      <StyledRowView>
        <Label content={STRINGS.total} color={COLORS.historyCardFont} />
        <Label
          content={`RS ${total.toFixed(2)}`}
          color={COLORS.historyCardFont}
        />
      </StyledRowView>
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  margin-vertical: ${SPACING.verySmall}px;
  padding: ${SPACING.small}px;
  border-radius: 7px;
  background-color: ${COLORS.secondary};
  elevation: 5;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
`;

const StyledRowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${SPACING.verySmall}px;
`;

ReservationHistoryCard.propTypes = PropTypes.shape({
  model: PropTypes.string,
  plate: PropTypes.string,
  begin_date: PropTypes.string,
  end_date: PropTypes.string,
  code: PropTypes.string,
  valor_pre_autorizado: PropTypes.number
}).isRequired;

export default ReservationHistoryCard;
