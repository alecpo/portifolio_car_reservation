import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Label from '#/components/Label';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';

const CheckCircle = props => {
  const { label, isChecked } = props;
  return (
    <StyledView {...props}>
      <Icon
        size={30}
        name={isChecked ? 'radio-button-checked' : 'radio-button-unchecked'}
        color={isChecked ? COLORS.secondary : COLORS.black}
      />
      <Label
        color={COLORS.secondary}
        content={label}
        marginLeft={SPACING.small}
        typography={TYPOGRAPHY.defaultLabel}
      />
    </StyledView>
  );
};

const StyledView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: ${SPACING.regular}px;
`;

CheckCircle.defaultProps = {
  isChecked: false
};

CheckCircle.propTypes = {
  isChecked: PropTypes.bool,
  label: PropTypes.string.isRequired
};

export default CheckCircle;
