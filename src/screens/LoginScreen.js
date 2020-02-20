import React, { useState } from 'react';
import styled from 'styled-components/native/';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TextInput from '~/components/TextInput';
import Label from '~/components/Label';

import API from '~/config/api';
import STRINGS from '~/utils/strings';
import SPACING from '~/utils/spacing';
import TYPOGRAPHY from '~/utils/typography';
import COLORS from '~/utils/colors';

import background from '~/assets/img/background.png';

const LoginScreen = ({ navigation }) => {
  const [isRememberPasswordChecked, setRememberPasswordChecked] = useState(
    false
  );
  return (
    <StyledImageBackground source={background}>
      <StyledScrollView>
        <StyledHelpButton onPress={() => navigation.push('Help')}>
          <Icon
            name='help-circle-outline'
            size={35}
            color={COLORS.loginScreenActionButtons}
          />
        </StyledHelpButton>

        <StyledLogoView>
          <StyledLogo source={{ uri: `${API.LOGOS}/usecargocolorido.png` }} />
        </StyledLogoView>
        <StyledInputsView>
          <TextInput
            hasLabel
            label={STRINGS.email}
            testID='emailInput'
            placeholder={STRINGS.emailPlaceholder}
            autoCapitalize='none'
            keyboardType='email-address'
          />
          <TextInput
            hasLabel
            label={STRINGS.password}
            testID='passwordInput'
            placeholder={STRINGS.passwordPlaceholder}
            secureTextEntry
            autoCapitalize='none'
            hasShowPassword
          />
          <StyledCheckButton
            onPress={() =>
              setRememberPasswordChecked(!isRememberPasswordChecked)
            }
          >
            <Icon
              name={
                isRememberPasswordChecked
                  ? 'check-box-outline'
                  : 'checkbox-blank-outline'
              }
              size={25}
              color={COLORS.defaultText}
            />
            <Label
              content={STRINGS.login.rememberMe}
              marginLeft={SPACING.small}
              typography={TYPOGRAPHY.textInputLabel}
            />
          </StyledCheckButton>
        </StyledInputsView>

        <StyledLoginButton onPress={() => navigation.push('Main')}>
          <Label
            content={STRINGS.LOGIN}
            color={COLORS.secondary}
            marginTop={SPACING.small}
            marginBottom={SPACING.small}
          />
        </StyledLoginButton>

        <StyledActionsView>
          <StyledActionButton onPress={() => navigation.push('SignUp')}>
            <Label content={STRINGS.login.signup} color={COLORS.secondary} />
          </StyledActionButton>
          <StyledActionButton onPress={() => navigation.push('ForgotPassword')}>
            <Label
              content={STRINGS.login.forgotPassword}
              color={COLORS.secondary}
            />
          </StyledActionButton>
        </StyledActionsView>
      </StyledScrollView>
    </StyledImageBackground>
  );
};

const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

const StyledImageBackground = styled.ImageBackground`
  flex: 1;
  padding-left: ${SPACING.regularPlus};
  padding-right: ${SPACING.regularPlus};
  padding-bottom: ${SPACING.regularPlus};
`;

const StyledHelpButton = styled.TouchableOpacity`
  position: absolute;
  margin-top: ${SPACING.regular};
  right: 6px;
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

const StyledCheckButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: ${SPACING.regular};
`;

const StyledActionsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledLoginButton = styled.TouchableOpacity`
  align-items: center;
  border-radius: 6px;
  background-color: ${COLORS.loginButton};
  margin-top: ${SPACING.medium};
`;

const StyledActionButton = styled.TouchableOpacity`
  align-items: center;
  border-radius: 6px;
  background-color: ${COLORS.loginScreenActionButtons};
  margin-top: ${SPACING.regular};
  padding-top: ${SPACING.small};
  padding-right: ${SPACING.regular};
  padding-left: ${SPACING.regular};
  padding-bottom: ${SPACING.small};
`;

export default LoginScreen;
