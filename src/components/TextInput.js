import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';

import Label from '~/components/Label';

import COLORS from '../utils/colors';
import SPACING from '../utils/spacing';

const TextInput = props => {
  const {
    hasLabel = false,
    label,
    labelColor,
    hasShowPassword,
    secureTextEntry,
    marginLeft = '0px',
    marginRight = '0px',
    marginTop = SPACING.regularPlus,
    marginBottom = '0px'
  } = props;
  const [passwordIsVisible, setPasswordVisible] = useState(!secureTextEntry);
  return (
    <StyledContainer
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      {hasLabel && (
        <Label
          content={label}
          textAlign='center'
          color={labelColor}
          marginBottom={SPACING.small}
        />
      )}
      <StyledInputView>
        <StyledTextInput {...props} secureTextEntry={!passwordIsVisible} />
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

const StyledTextInput = styled.TextInput`
  width: 100%;
  border-radius: 7px;
  font-size: 16px;
  background-color: ${COLORS.secondary};
  padding: 10px;
`;

const StyledShowPasswordButton = styled.TouchableOpacity`
  right: ${SPACING.mediumPlus};
`;

export default TextInput;
