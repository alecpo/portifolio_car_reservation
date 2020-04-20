import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native/';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconHelp from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import TextInputBox from '#/components/TextInputBox';
import SubmitButton from '#/components/SubmitButton';
import Label from '#/components/Label';

import STRINGS from '#/utils/strings';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';
import COLORS from '#/utils/colors';

import whiteLogo from '#/assets/img/logo_branco.png';

import { onLogin } from '#/store/actions/userActions';

const LoginScreen = ({ navigation }) => {
  const [isRememberPasswordChecked, setRememberPasswordChecked] = useState(
    false
  );
  const [email, setEmail] = useState('gustavo.pimenta@usecargo.mobi');
  const [password, setPassword] = useState('dev');

  const dispatch = useDispatch();

  const login = () => {
    const user = {
      email,
      password
    };
    dispatch(onLogin(user));
  };

  return (
    <StyledLinearGradient
      colors={[
        COLORS.nonLoggedBackgroundColor1,
        COLORS.nonLoggedBackgroundColor2
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <StyledLogoView>
          <StyledLogo source={whiteLogo} />
        </StyledLogoView>

        <>
          <TextInputBox
            marginBottom={10}
            onChangeText={setEmail}
            value={email}
            hasLabel
            label={STRINGS.email}
            labelColor={COLORS.secondary}
            placeholder={STRINGS.emailPlaceholder}
            autoCapitalize='none'
            keyboardType='email-address'
            testID='emailInputLoginScreen'
          />
          <TextInputBox
            onChangeText={setPassword}
            value={password}
            hasLabel
            label={STRINGS.password}
            labelColor={COLORS.secondary}
            placeholder={STRINGS.passwordPlaceholder}
            secureTextEntry
            autoCapitalize='none'
            hasShowPassword
            testID='passwordInput'
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
              color={COLORS.secondary}
            />
            <Label
              content={STRINGS.login.rememberMe}
              marginLeft={SPACING.small}
              typography={TYPOGRAPHY.TextInputBoxLabel}
              color={COLORS.secondary}
            />
          </StyledCheckButton>
        </>

        <>
          <SubmitButton
            submit={login}
            title={STRINGS.LOGIN}
            backgroundColor={COLORS.primary}
            marginVertical={SPACING.smallPlus}
            testID='loginButtonLoginScreen'
          />

          <StyledActionsView>
            <StyledActionButton onPress={() => navigation.push('SignUp')}>
              <Label content={STRINGS.login.signup} color={COLORS.secondary} />
            </StyledActionButton>
            <StyledActionButton
              onPress={() => navigation.push('ForgotPassword')}
            >
              <Label
                content={STRINGS.login.forgotPassword}
                color={COLORS.secondary}
              />
            </StyledActionButton>
          </StyledActionsView>

          <StyledHelpButton onPress={() => navigation.push('Help')}>
            <Label
              content={STRINGS.help}
              color={COLORS.secondary}
              marginRight={SPACING.small}
            />
            <IconHelp name='help-circle' size={24} color={COLORS.secondary} />
          </StyledHelpButton>
        </>
      </ScrollView>
    </StyledLinearGradient>
  );
};

const StyledLinearGradient = styled(LinearGradient)`
  flex: 1;
  padding-top: ${SPACING.big};
  padding-horizontal: ${SPACING.smallPlus}px;
`;

const StyledLogoView = styled.View`
  margin-vertical: ${SPACING.smallPlus}px;
  justify-content: center;
  align-items: center;
`;

const StyledHelpButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

const StyledLogo = styled.Image`
  width: 140px;
  height: 140px;
`;

const StyledCheckButton = styled.TouchableOpacity`
  margin-top: ${SPACING.smallPlus}px;
  flex-direction: row;
  align-items: center;
`;

const StyledActionsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${SPACING.smallPlus}px;
`;

const StyledActionButton = styled.TouchableOpacity`
  align-items: center;
  border-radius: 7px;
  padding: ${SPACING.small}px;
  border-color: ${COLORS.secondary};
  border-width: 1px;
`;

export default LoginScreen;
