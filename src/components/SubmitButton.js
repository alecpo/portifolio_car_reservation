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
  icon = () => {}
}) => (
  <StyledButton onPress={submit} backgroundColor={backgroundColor}>
    <Label
      content={title}
      color={labelColor}
      marginTop={SPACING.smallPlus}
      marginBottom={SPACING.smallPlus}
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
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export default SubmitButton;
