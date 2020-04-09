/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import React from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';

import API from '~/config/api';

import Label from '~/components/Label';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import TYPOGRAPHY from '~/utils/typography';

const VehicleCard = ({
  vehicle_model: { model, url },
  plate,
  price_hour,
  price_km,
  doors_qtd,
  gearbox,
  direction_type,
  air_conditioning
}) => {
  const formatValue = (key, value) => {
    switch (key) {
      case 'perHour':
        return `R$ ${parseFloat((value ?? 0) / 100).toFixed(2)}/h`;
      case 'perKm':
        return `R$ ${parseFloat((value ?? 0) / 100).toFixed(2)}/km`;
      case 'door':
        return `${value} Portas`;
      default:
        return value;
    }
  };

  const renderIcon = (iconFamily, iconName) => {
    switch (iconFamily) {
      case 'MCI':
        return (
          <IconMCI name={iconName} size={18} color={COLORS.historyCardFont} />
        );
      default:
        return (
          <IconFA name={iconName} size={18} color={COLORS.historyCardFont} />
        );
    }
  };

  const renderCarInfo = (iconFamily, iconName, label, labelType) => (
    <StyledListInfoView>
      {renderIcon(iconFamily, iconName)}
      <Label
        typography={TYPOGRAPHY.regularLabel}
        content={formatValue(labelType, label)}
        color={COLORS.historyCardFont}
        marginLeft={SPACING.small}
      />
    </StyledListInfoView>
  );

  return (
    <StyledContainer>
      <StyledCarHeaderView>
        <Label
          content={model}
          color={COLORS.historyCardFont}
          typography={TYPOGRAPHY.mediumLabelBold}
        />
        <StyledImageCar source={{ uri: `${API.bucket.vehicleImg}/${url}` }} />
        <Label
          content={plate}
          color={COLORS.historyCardFont}
          typography={TYPOGRAPHY.mediumLabelBold}
        />
      </StyledCarHeaderView>

      <StyledCarInfoView>
        {renderCarInfo('FA', 'dollar', price_hour, 'perHour')}
        {renderCarInfo('FA', 'dollar', price_km, 'perKm')}
        {renderCarInfo('FA', 'gear', gearbox ? 'Automático' : 'Manual')}
        {renderCarInfo(
          'MCI',
          'steering',
          direction_type ? 'Manual' : 'Hidráulica'
        )}
        {renderCarInfo('MCI', 'gas-station', 'flex')}
        {renderCarInfo('MCI', 'car-door', doors_qtd, 'door')}
        {air_conditioning &&
          renderCarInfo('MCI', 'snowflake', 'Ar-condicionado')}
      </StyledCarInfoView>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 14;
  flex-direction: row;
  align-items: center;
`;

const StyledCarHeaderView = styled.View`
  flex: 8;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${SPACING.regularPlus}px;
`;

const StyledCarInfoView = styled.View`
  flex: 6;
  margin-left: ${SPACING.small}px;
`;

const StyledListInfoView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${SPACING.verySmall}px;
`;

const StyledImageCar = styled.Image`
  width: ${Dimensions.get('window').width / 2.3}px;
  height: ${Dimensions.get('window').width / 4}px;
  resize-mode: contain;
`;

VehicleCard.propTypes = PropTypes.shape({
  model: PropTypes.string,
  plate: PropTypes.string,
  begin_date: PropTypes.string,
  end_date: PropTypes.string,
  code: PropTypes.string,
  valor_pre_autorizado: PropTypes.number
}).isRequired;

export default VehicleCard;
