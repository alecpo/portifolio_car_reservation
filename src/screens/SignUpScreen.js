import React, { useState } from 'react';
import styled from 'styled-components/native/';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import Label from '~/components/Label';
import StyledPicker from '~/components/StyledPicker';
import TextInputBox from '~/components/TextInputBox';
import CheckCircle from '~/components/CheckCircle';
import SubmitButton from '~/components/SubmitButton';

import API from '~/config/api';

import STRINGS from '~/utils/strings';
import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';
import TYPOGRAPHY from '~/utils/typography';

import originOptions from '~/utils/originOptions';

import background from '~/assets/img/background.png';

const SignUpScreen = ({ navigation }) => {
  const [state, setState] = useState({
    selectedOrigin: '',
    name: '',
    email: '',
    address: '',
    federalRegister: '',
    driverLicency: '',
    phone: '',
    birthday: '',
    password: '',
    confirmPassword: '',
    isResident: true
  });
  const {
    selectedOrigin,
    name,
    email,
    address,
    federalRegister,
    driverLicency,
    phone,
    birthday,
    password,
    confirmPassword,
    isResident
  } = state;

  const updateState = (field, value) => {
    setState({
      ...state,
      [field]: value
    });
  };

  return (
    <StyledLinearGradient
      colors={[
        COLORS.nonLoggedBackgroundColor1,
        COLORS.nonLoggedBackgroundColor2
      ]}
    >
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <StyledInputsView>
          <StyledPicker
            hasLabel
            label={`${STRINGS.origin} ${STRINGS.mandatory}`}
            labelColor={COLORS.secondary}
            dataList={originOptions}
            updateState={updateState}
            testID='originPickerSignUp'
          />

          <TextInputBox
            value={name}
            onChangeText={value => updateState('name', value)}
            hasLabel
            label={`${STRINGS.name} ${STRINGS.mandatory}`}
            labelColor={COLORS.secondary}
            placeholder={STRINGS.signup.namePlaceholder}
            testID='nameInputSignUp'
          />

          <TextInputBox
            value={email}
            onChangeText={value => updateState('email', value)}
            hasLabel
            label={`${STRINGS.email} ${STRINGS.mandatory}`}
            labelColor={COLORS.secondary}
            placeholder={STRINGS.emailPlaceholder}
            testID='emailInputSignUp'
          />

          <TextInputBox
            value={address}
            onChangeText={value => updateState('address', value)}
            hasLabel
            label={`${STRINGS.ADDRESS} ${STRINGS.mandatory}`}
            labelColor={COLORS.secondary}
            placeholder={STRINGS.signup.addressPlaceholder}
            testID='addressInputSignUp'
          />

          <StyledSelectUserTypeView>
            <CheckCircle
              label={STRINGS.resident}
              isChecked={isResident}
              onPress={() => updateState('isResident', true)}
            />
            <CheckCircle
              label={STRINGS.lessee}
              isChecked={!isResident}
              onPress={() => updateState('isResident', false)}
            />
          </StyledSelectUserTypeView>

          <TextInputBox
            value={federalRegister}
            onChangeText={value => updateState('federalRegister', value)}
            hasLabel
            label={`${STRINGS.federalRegister} ${STRINGS.mandatory}`}
            labelColor={COLORS.secondary}
            placeholder={STRINGS.signup.federalRegisterPlaceholder}
            testID='federalRegisterInputSignUp'
          />

          <TextInputBox
            value={driverLicency}
            onChangeText={value => updateState('driverLicency', value)}
            hasLabel
            label={STRINGS.driverLicency}
            labelColor={COLORS.secondary}
            placeholder={STRINGS.signup.driverLicencyPlaceholder}
            testID='driverLicencyInputSignUp'
          />

          <TextInputBox
            value={phone}
            onChangeText={value => updateState('phone', value)}
            hasLabel
            label={`${STRINGS.phone} ${STRINGS.mandatory}`}
            labelColor={COLORS.secondary}
            placeholder={STRINGS.signup.phonePlaceholder}
            testID='phoneInputSignUp'
          />

          <TextInputBox
            value={birthday}
            onChangeText={value => updateState('birthday', value)}
            hasLabel
            label={STRINGS.birthday}
            labelColor={COLORS.secondary}
            placeholder={STRINGS.signup.birthdayPlaceholder}
            testID='birthdayInputSignUp'
          />

          <TextInputBox
            value={password}
            onChangeText={value => updateState('password', value)}
            hasLabel
            label={`${STRINGS.password} ${STRINGS.mandatory}`}
            labelColor={COLORS.secondary}
            placeholder={STRINGS.passwordPlaceholder}
            secureTextEntry
            autoCapitalize='none'
            hasShowPassword
            testID='passwordInputSignUp'
          />

          <TextInputBox
            value={confirmPassword}
            onChangeText={value => updateState('confirmPassword', value)}
            placeholder={STRINGS.signup.confirmPasswordPlaceholder}
            secureTextEntry
            autoCapitalize='none'
            hasShowPassword
            testID='confirmPasswordSignUpInput'
          />
        </StyledInputsView>
        <SubmitButton
          title={STRINGS.SIGNUP}
          submit={() => console.log(state)}
        />
      </StyledScrollView>
    </StyledLinearGradient>
  );
};

const StyledLinearGradient = styled(LinearGradient)`
  flex: 1;
  padding-left: ${SPACING.regularPlus};
  padding-right: ${SPACING.regularPlus};
  padding-bottom: ${SPACING.regularPlus};
`;

const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

const StyledInputsView = styled.View`
  width: 100%;
  margin-top: ${SPACING.small};
  margin-bottom: ${SPACING.medium};
`;

const StyledSelectUserTypeView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${SPACING.regularPlus};
`;

export default SignUpScreen;
