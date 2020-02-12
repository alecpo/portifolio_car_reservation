import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';

import COLORS from '../utils/colors';

const TextInput = props => {
  const { hasShowPassword, secureTextEntry } = props;
  const [passwordIsVisible, setPasswordVisible] = useState(!secureTextEntry);
  return (
    <StyledView>
      <StyledTextInput {...props} secureTextEntry={!passwordIsVisible} />
      {hasShowPassword && (
        <StyledShowPasswordButton
          onPress={() => setPasswordVisible(!passwordIsVisible)}
        >
          <Icon
            name={passwordIsVisible ? 'eye' : 'eye-with-line'}
            size={22}
            color={COLORS.textInputBorderColorDefault}
          />
        </StyledShowPasswordButton>
      )}
    </StyledView>
  );
};

const StyledView = styled.View``;

const StyledTextInput = styled.TextInput`
  border-radius: 8px;
  font-size: 16px;
  margin-top: 20px;
  padding-left: 15px;
  background-color: ${COLORS.secondary};
  border-width: 1px;
  border-color: ${COLORS.textInputBorderColorDefault};
`;

const StyledShowPasswordButton = styled.TouchableOpacity`
  align-self: flex-end;
  bottom: 35px;
  right: 15px;
  width: 22px;
`;

const Styledicon = styled(Icon)``;

export default TextInput;
