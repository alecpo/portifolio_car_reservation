/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import React from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { API } from '#/config/api';

import Label from '#/components/Label';
import Icon from '#/components/Icon';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';
import { MCI } from '#/utils/enums/ICON_FAMILY';

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

const renderCarInfo = (iconName, label, labelType, iconFamily) => (
  <StyledListInfoView>
    <Icon
      iconFamily={iconFamily}
      iconName={iconName}
      size={18}
      color={COLORS.darkBlueFont}
    />
    <Label
      typography={TYPOGRAPHY.regularLabel}
      content={formatValue(labelType, label)}
      color={COLORS.darkBlueFont}
      marginLeft={SPACING.small}
    />
  </StyledListInfoView>
);

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
  return (
    <StyledContainer>
      <StyledCarHeaderView>
        <Label
          content={model}
          color={COLORS.darkBlueFont}
          typography={TYPOGRAPHY.mediumLabelBold}
        />
        <StyledImageCar source={{ uri: `${API.bucket.vehicleImg}/${url}` }} />
        <Label
          content={plate}
          color={COLORS.darkBlueFont}
          typography={TYPOGRAPHY.mediumLabelBold}
        />
      </StyledCarHeaderView>

      <StyledCarInfoView>
        {renderCarInfo('dollar', price_hour, 'perHour')}
        {renderCarInfo('dollar', price_km, 'perKm')}
        {renderCarInfo('gear', gearbox ? 'Automático' : 'Manual')}
        {renderCarInfo(
          'steering',
          direction_type ? 'Manual' : 'Hidráulica',
          'default',
          MCI
        )}
        {renderCarInfo('gas-station', 'flex', 'default', MCI)}
        {renderCarInfo('car-door', doors_qtd, 'door', MCI)}
        {air_conditioning && renderCarInfo('snowflake', 'Ar-condicionado', MCI)}
      </StyledCarInfoView>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledCarHeaderView = styled.View`
  width: 175px;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${SPACING.regularPlus}px;
`;

const StyledCarInfoView = styled.View`
  flex: 1;
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
