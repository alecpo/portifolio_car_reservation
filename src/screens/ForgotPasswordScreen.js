import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import TextInputBox from '#/components/TextInputBox';
import SubmitButton from '#/components/SubmitButton';
import Label from '#/components/Label';

import STRINGS from '#/utils/strings';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';
import COLORS from '#/utils/colors';

import whiteLogo from '#/assets/img/logo_branco.png';
import success from '#/assets/svgAnimations/success';

import { onForgotPassword } from '#/store/actions/userActions';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async () => {
    await setIsLoading(true);
    dispatch(
      onForgotPassword(email, async () => {
        await setIsLoading(false);
        setEmail('');
      })
    );
  };

  const teste = useCallback(async () => {
    if (isLoading) {
      navigation.navigate('PublicModals', {
        screen: 'LoadingModal'
      });
    } else if (!navigation.isFocused()) {
      await navigation.pop();
      await navigation.navigate('PublicModals', {
        screen: 'LoadingModal',
        params: {
          lottieJson: success,
          title: STRINGS.forgotPassword.emailSentMessage
        }
      });
    }
  }, [isLoading, navigation]);

  useEffect(() => {
    teste();
  }, [teste]);

  return (
    <StyledLinearGradient
      colors={[
        COLORS.nonLoggedBackgroundColor1,
        COLORS.nonLoggedBackgroundColor2
      ]}
    >
      <StyledLogo source={whiteLogo} />
      <TextInputBox
        onChangeText={setEmail}
        value={email}
        hasLabel
        label={STRINGS.email}
        labelColor={COLORS.secondary}
        placeholder={STRINGS.emailPlaceholder}
        autoCapitalize='none'
        keyboardType='email-address'
        autoCorrect={false}
      />
      <StyledInstructionLabelView>
        <Label
          textAlign='justify'
          typography={TYPOGRAPHY.defaultLabel}
          content={STRINGS.forgotPassword.requestMessage}
          marginTop={SPACING.small}
          marginBottom={SPACING.small}
          color={COLORS.secondary}
        />
      </StyledInstructionLabelView>

      <SubmitButton
        submit={onSubmit}
        title={STRINGS.request.toUpperCase()}
        backgroundColor={COLORS.primary}
        marginVertical={SPACING.smallPlus}
      />
    </StyledLinearGradient>
  );
};

const StyledLinearGradient = styled(LinearGradient)`
  flex: 1;
  align-items: center;
  padding-horizontal: ${SPACING.regularPlus}px;
`;

const StyledLogo = styled.Image`
  margin-vertical: ${SPACING.smallPlus}px;
  width: 140px;
  height: 140px;
`;

const StyledInstructionLabelView = styled.View`
  padding-horizontal: ${SPACING.regular}px;
`;

export default ForgotPasswordScreen;
