import React from 'react';
import styled from 'styled-components/native';

import Label from '~/components/Label';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

const SubmitButton = ({ title, submit = () => {} }) => (
  <StyledButton onPress={submit}>
    <Label
      content={title}
      color={COLORS.secondary}
      marginTop={SPACING.smallPlus}
      marginBottom={SPACING.smallPlus}
    />
  </StyledButton>
);

const StyledButton = styled.TouchableOpacity`
  align-items: center;
  border-radius: 5px;
  background-color: ${COLORS.loginButton};
`;

export default SubmitButton;
