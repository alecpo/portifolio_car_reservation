import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

import whiteLogo from '~/assets/img/logo_branco.png';

const SplashScreen = () => (
  <StyledLinearGradient
    colors={[
      COLORS.nonLoggedBackgroundColor1,
      COLORS.nonLoggedBackgroundColor2
    ]}
  >
    <StyledLogo source={whiteLogo} />
  </StyledLinearGradient>
);

const StyledLinearGradient = styled(LinearGradient)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: ${SPACING.big};
`;

const StyledLogo = styled.Image`
  width: 250px;
  height: 250px;
  resize-mode: contain;
`;

export default SplashScreen;
