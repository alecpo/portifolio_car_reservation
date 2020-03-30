import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Label from '~/components/Label';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

const SubmitButton = ({
  title,
  labelColor,
  backgroundColor,
  submit,
  disabled,
  icon,
  marginVertical,
  testID
}) => (
  <StyledButton
    onPress={submit}
    marginVertical={marginVertical}
    backgroundColor={backgroundColor}
    disabled={disabled}
    testID={testID}
  >
    <Label
      content={title}
      color={labelColor}
      marginRight={icon() ? SPACING.small : 0}
    />
    {icon()}
  </StyledButton>
);

const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  margin-vertical: ${({ marginVertical }) => marginVertical}px;
  padding-vertical: ${SPACING.small}px;
  background-color: ${({ backgroundColor, disabled }) =>
    disabled ? COLORS.defaultGray : backgroundColor};
`;

SubmitButton.defaultProps = {
  disabled: false,
  icon: () => {},
  submit: () => {},
  labelColor: COLORS.secondary,
  backgroundColor: COLORS.loginButton,
  marginVertical: 0,
  testID: ''
};

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  submit: PropTypes.func,
  icon: PropTypes.func,
  title: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  marginVertical: PropTypes.number,
  testID: PropTypes.string
};

export default SubmitButton;
