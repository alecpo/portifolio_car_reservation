import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';

import Label from '~/components/Label';

import COLORS from '../utils/colors';
import SPACING from '../utils/spacing';
import TYPOGRAPHY from '../utils/typography';

const TextInputBox = props => {
  const { testID } = props;
  const allProps = { ...props };
  delete allProps.testID;
  const {
    hasLabel = false,
    label,
    labelColor,
    labelPosition = 'center',
    labelTypography = TYPOGRAPHY.defaultLabelBold,
    hasShowPassword,
    secureTextEntry,
    marginLeft = '0px',
    marginRight = '0px',
    marginTop = '0px',
    marginBottom = '0px'
  } = props;
  const [passwordIsVisible, setPasswordVisible] = useState(!secureTextEntry);
  return (
    <StyledContainer
      testID={testID}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      {hasLabel && (
        <Label
          typography={labelTypography}
          content={label}
          textAlign={labelPosition}
          color={labelColor}
          marginBottom={SPACING.small}
        />
      )}
      <StyledInputView>
        <StyledTextInputBox
          {...allProps}
          secureTextEntry={!passwordIsVisible}
        />
        {hasShowPassword && (
          <StyledShowPasswordButton
            onPress={() => setPasswordVisible(!passwordIsVisible)}
          >
            <Icon
              name={passwordIsVisible ? 'eye-with-line' : 'eye'}
              size={22}
              color={COLORS.defaultGray}
            />
          </StyledShowPasswordButton>
        )}
      </StyledInputView>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;

const StyledInputView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledTextInputBox = styled.TextInput`
  width: 100%;
  border-radius: 7px;
  font-size: 16px;
  background-color: ${COLORS.secondary};
  padding: 10px;
`;

const StyledShowPasswordButton = styled.TouchableOpacity`
  right: ${SPACING.mediumPlus};
`;

export default TextInputBox;
