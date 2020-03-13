import React from 'react';
import styled from 'styled-components/native';

import Label from '~/components/Label';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

const SubmitButton = ({
  title,
  labelColor = COLORS.secondary,
  backgroundColor = COLORS.loginButton,
  submit = () => {},
  icon = () => {},
  marginVertical = '0px',
  testID
}) => (
  <StyledButton
    onPress={submit}
    marginVertical={marginVertical}
    backgroundColor={backgroundColor}
    testID={testID}
  >
    <Label
      content={title}
      color={labelColor}
      marginRight={icon ? SPACING.small : '0px'}
    />
    {icon()}
  </StyledButton>
);

const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  margin-vertical: ${({ marginVertical }) => marginVertical};
  padding-vertical: ${SPACING.smallPlus};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export default SubmitButton;
