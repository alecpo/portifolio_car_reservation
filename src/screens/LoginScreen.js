import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native/';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconHelp from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import TextInput from '~/components/TextInput';
import Label from '~/components/Label';

import STRINGS from '~/utils/strings';
import SPACING from '~/utils/spacing';
import TYPOGRAPHY from '~/utils/typography';
import COLORS from '~/utils/colors';

import whiteLogo from '~/assets/img/logo_branco.png';

import { login } from '~/store/actions/userActions';

const LoginScreen = ({ navigation }) => {
  const [isRememberPasswordChecked, setRememberPasswordChecked] = useState(
    false
  );
  const [email, setEmail] = useState('novoclientehmg@teste.com.br');
  const [password, setPassword] = useState('dev');

  const dispatch = useDispatch();

  const onLogin = async () => {
    const user = {
      email,
      password
    };
    dispatch(login(user));
  };

  return (
    <StyledLinearGradient
      colors={[
        COLORS.nonLoggedBackgroundColor1,
        COLORS.nonLoggedBackgroundColor2
      ]}
    >
      <StyledScrollView>
        <StyledLogoView>
          <StyledLogo source={whiteLogo} />
        </StyledLogoView>
        <>
          <TextInput
            onChangeText={setEmail}
            value={email}
            hasLabel
            label={STRINGS.email}
            labelColor={COLORS.secondary}
            testID='emailInput'
            placeholder={STRINGS.emailPlaceholder}
            autoCapitalize='none'
            keyboardType='email-address'
          />
          <TextInput
            onChangeText={setPassword}
            value={password}
            hasLabel
            label={STRINGS.password}
            labelColor={COLORS.secondary}
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
              color={COLORS.secondary}
            />
            <Label
              content={STRINGS.login.rememberMe}
              marginLeft={SPACING.small}
              typography={TYPOGRAPHY.textInputLabel}
              color={COLORS.secondary}
            />
          </StyledCheckButton>
        </>

        <StyledLoginButton onPress={onLogin}>
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
        <StyledHelpButton onPress={() => navigation.push('Help')}>
          <Label
            content={STRINGS.help}
            color={COLORS.secondary}
            marginRight={SPACING.small}
          />
          <IconHelp name='help-circle' size={24} color={COLORS.secondary} />
        </StyledHelpButton>
      </StyledScrollView>
    </StyledLinearGradient>
  );
};

const StyledLinearGradient = styled(LinearGradient)`
  flex: 1;
  padding: ${SPACING.regularPlus};
`;

const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

const StyledHelpButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  align-self: center;
  margin: ${SPACING.regular};
`;

const StyledLogoView = styled.View`
  align-items: center;
  margin-top: ${SPACING.big};
`;

const StyledLogo = styled.Image`
  width: 250px;
  height: 250px;
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
  margin-top: ${SPACING.regular};
`;

const StyledLoginButton = styled.TouchableOpacity`
  align-items: center;
  border-radius: 7px;
  background-color: ${COLORS.primary};
  margin-top: ${SPACING.medium};
`;

const StyledActionButton = styled.TouchableOpacity`
  align-items: center;
  border-radius: 7px;
  padding: ${SPACING.small};
  border-color: ${COLORS.secondary};
  border-width: 1px;
`;

export default LoginScreen;
