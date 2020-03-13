import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

import Label from '~/components/Label';
import DivisorLine from '~/components/DivisorLine';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import TYPOGRAPHY from '~/utils/typography';

const TextInputLine = props => {
  const { testID } = props;
  const allProps = { ...props };
  delete allProps.testID;
  const {
    hasLabel = false,
    label,
    labelColor,
    labelTypography = TYPOGRAPHY.small,
    hasShowPassword,
    secureTextEntry,
    mask,
    textColor = COLORS.defaultText,
    value,
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
          color={labelColor}
          marginBottom={SPACING.small}
        />
      )}
      <StyledInputView>
        {mask ? (
          <StyledTextInputLineWithMask
            {...allProps}
            textColor={textColor}
            value={value}
            type={mask.type}
            options={mask.settings}
            secureTextEntry={!passwordIsVisible}
          />
        ) : (
          <StyledTextInputLine
            {...allProps}
            textColor={textColor}
            value={value}
            secureTextEntry={!passwordIsVisible}
          />
        )}
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
      <DivisorLine />
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

const StyledTextInputLine = styled.TextInput`
  width: 100%;
  border-radius: 7px;
  font-size: 16px;
  color: ${({ textColor }) => textColor};
`;

const StyledTextInputLineWithMask = styled(TextInputMask)`
  width: 100%;
  border-radius: 7px;
  font-size: 16px;
  color: ${({ textColor }) => textColor};
`;

const StyledShowPasswordButton = styled.TouchableOpacity`
  right: ${SPACING.mediumPlus};
`;

export default TextInputLine;
