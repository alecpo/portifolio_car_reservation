import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

import TextInput from '../components/TextInput';
import Label from '../components/Label';

import API from '../config/api';

import STRINGS from '../utils/strings';
import SPACING from '../utils/spacing';
import TYPOGRAPHY from '../utils/typography';
import COLORS from '../utils/colors';

import background from '../assets/img/background.png';

const LoginScreen = () => {
  return (
    <StyledImageBackground source={background}>
      <StyledScrollView>
        <StyledLogoView>
          <StyledLogo source={{ uri: `${API.LOGOS}/usecargocolorido.png` }} />
        </StyledLogoView>
        <StyledInputsView>
          <Label
            content={STRINGS.login.email}
            typography={TYPOGRAPHY.textInputLabel}
            textAlign='center'
          />
          <TextInput
            testID='emailInput'
            placeholder={STRINGS.login.emailPlaceholder}
            autoCapitalize={'none'}
            keyboardType='email-address'
          />
          <Label
            content={STRINGS.login.password}
            typography={TYPOGRAPHY.textInputLabel}
            textAlign='center'
          />
          <TextInput
            testID='passwordInput'
            placeholder={STRINGS.login.passwordPlaceHolder}
            secureTextEntry
            autoCapitalize={'none'}
            hasShowPassword
          />
        </StyledInputsView>
      </StyledScrollView>
    </StyledImageBackground>
  );
};

const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

const StyledImageBackground = styled.ImageBackground`
  flex: 1;
  align-items: center;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
`;

const StyledLogoView = styled.View`
  width: 100%;
  align-items: center;
  margin-top: ${SPACING.huge};
`;

const StyledInputsView = styled.View`
  width: 100%;
  margin-top: ${SPACING.big};
`;

const StyledLogo = styled.Image`
  width: 120px;
  height: 120px;
  resize-mode: contain;
`;

export default LoginScreen;
