import React, { useState } from 'react';
import { StatusBar, Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';

import Label from '~/components/Label';
import SubmitButton from '~/components/SubmitButton';

import STRINGS from '~/utils/strings';
import TYPOGRAPHY from '~/utils/typography';
import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';

import success from '~/assets/svgAnimations/success';

const DeleteModalWithJustificationScreen = ({ route, navigation }) => {
  const [motive, setMotive] = useState('');

  const {
    title = STRINGS.genericModalWithJustificative.title,
    successMessage,
    placeholder = STRINGS.genericModalWithJustificative.placeholder,
    finishSuccessAnimation = () => {},
    onSubmit = () => {}
  } = route.params ?? {};

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.select({
        ios: 'padding',
        android: null
      })}
      keyboardVerticalOffset={Platform.select({
        ios: -50,
        android: -100
      })}
    >
      <StatusBar hidden />
      <StyledModalContent>
        <Label
          content={title}
          textAlign='center'
          typography={TYPOGRAPHY.mediumLabelBold}
          color={COLORS.black}
        />
        <StyledTextInput
          value={motive}
          onChangeText={setMotive}
          placeholder={placeholder}
          placeholderTextColor={COLORS.darkGray}
          multiline
          selectTextOnFocus
          autoFocus
          selectionColor={COLORS.primary}
          autoCorrect={false}
        />
        <StyledActionBar>
          <StyledButtonView>
            <SubmitButton
              submit={() => {
                navigation.pop();
              }}
              backgroundColor={COLORS.red}
              title={STRINGS.no}
            />
          </StyledButtonView>
          <StyledButtonView>
            <SubmitButton
              submit={async () => {
                await onSubmit(motive);
                await navigation.pop();
                await navigation.navigate('LoadingModal', {
                  lottieJson: success,
                  title: successMessage,
                  finishSuccessAnimation
                });
              }}
              disabled={!motive}
              title={STRINGS.yes}
              backgroundColor={COLORS.successButton}
            />
          </StyledButtonView>
        </StyledActionBar>
      </StyledModalContent>
    </StyledKeyboardAvoidingView>
  );
};

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundModal};
`;

const StyledModalContent = styled.View`
  width: ${Dimensions.get('window').width * 0.8}px;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: ${SPACING.big}px;
`;

const StyledTextInput = styled.TextInput`
  height: ${Dimensions.get('window').width / 2}px;
  width: ${Dimensions.get('window').width / 1.6}px;
  margin-vertical: ${SPACING.medium}px;
  padding: ${SPACING.small}px;
  border-radius: 7px;
  border-width: 1.5px;
  font-size: 16px;
`;

const StyledActionBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledButtonView = styled.View`
  width: 40%;
`;

export default DeleteModalWithJustificationScreen;
