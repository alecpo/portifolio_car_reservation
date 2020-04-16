import React, { useState } from 'react';
import styled from 'styled-components/native/';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TextInputBox from '#/components/TextInputBox';
import Label from '#/components/Label';

import API from '#/config/api';
import STRINGS from '#/utils/strings';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';
import COLORS from '#/utils/colors';

import background from '#/assets/img/background.png';

const ForgotPasswordScreen = ({ navigation }) => {
  const [isRememberPasswordChecked, setRememberPasswordChecked] = useState(
    false
  );
  return <></>;
};

const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

const StyledImageBackground = styled.ImageBackground`
  flex: 1;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
`;

const StyledHelpButton = styled.TouchableOpacity`
  position: absolute;
  margin-top: ${SPACING.regular}px;
  right: 6px;
`;

const StyledLogoView = styled.View`
  width: 100%;
  align-items: center;
  margin-top: ${SPACING.huge}px;
`;

const StyledInputsView = styled.View`
  width: 100%;
  margin-top: ${SPACING.big}px;
`;

const StyledLogo = styled.Image`
  width: 120px;
  height: 120px;
  resize-mode: contain;
`;

const StyledCheckButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const StyledActionsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledLoginButton = styled.TouchableOpacity`
  align-items: center;
  border-radius: 7px;
  background-color: ${COLORS.loginButton};
  margin-top: ${SPACING.medium}px;
`;

const StyledActionButton = styled.TouchableOpacity`
  align-items: center;
  border-radius: 7px;
  background-color: ${COLORS.loginScreenActionButtons};
  margin-top: ${SPACING.regular}px;
  padding-top: ${SPACING.small}px;
  padding-right: ${SPACING.regular}px;
  padding-left: ${SPACING.regular}px;
  padding-bottom: ${SPACING.small}px;
`;

export default ForgotPasswordScreen;
