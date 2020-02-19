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

export default ForgotPasswordScreen;
