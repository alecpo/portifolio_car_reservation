import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import Label from '#/components/Label';
import Icon from '#/components/Icon';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';
import { MI } from '#/utils/enums/ICON_FAMILY';

const NextStepButton = ({
  isLoading,
  isDisabled,
  onSubmit,
  label,
  position,
  activeColor,
  activeIconFamily,
  activeIconName
}) => (
  <StyledCheckinButton
    onPress={onSubmit}
    disabled={isDisabled}
    color={isDisabled ? COLORS.backgroundModal : activeColor}
    position={position}
  >
    {isLoading ? (
      <ActivityIndicator size='small' color={COLORS.secondary} />
    ) : (
      <>
        {isDisabled ? (
          <Label
            typography={TYPOGRAPHY.regularLabelBold}
            textAlign='center'
            content={label}
            color={COLORS.secondary}
            marginRight={SPACING.small}
          />
        ) : (
          <StyledRowLabel>
            <Label
              typography={TYPOGRAPHY.regularLabelBold}
              textAlign='center'
              content={label}
              color={COLORS.secondary}
              marginRight={SPACING.small}
            />
            <Icon
              iconFamily={activeIconFamily}
              iconName={activeIconName}
              size={25}
              color={COLORS.secondary}
            />
          </StyledRowLabel>
        )}
      </>
    )}
  </StyledCheckinButton>
);

const StyledCheckinButton = styled.TouchableOpacity`
  position: ${({ position }) => position};
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  bottom: 0px;
  background-color: ${({ color }) => color};
`;

const StyledRowLabel = styled.View`
  flex-direction: row;
  align-items: center;
`;

NextStepButton.defaultProps = {
  isLoading: false,
  isDisabled: false,
  position: 'relative',
  activeColor: COLORS.primary,
  activeIconFamily: MI,
  activeIconName: 'keyboard-arrow-right'
};

NextStepButton.propTypes = {
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  position: PropTypes.string,
  activeColor: PropTypes.string,
  activeIconFamily: PropTypes.string,
  activeIconName: PropTypes.string
};

export default NextStepButton;
