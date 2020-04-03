/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';
import { TextInputMask, MaskService } from 'react-native-masked-text';

import Label from '~/components/Label';
import DivisorLine from '~/components/DivisorLine';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import TYPOGRAPHY from '~/utils/typography';

const TextInputLine = ({
  testID,
  value,
  setInputFieldValue,
  onChangeText,
  hasError,
  defaultTextInputProps,
  hasLabel,
  label,
  labelTypography,
  hasShowPassword,
  mask,
  textColor,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom
}) => {
  const { onBlur, secureTextEntry } = defaultTextInputProps;

  const [passwordIsVisible, setPasswordVisible] = useState(!secureTextEntry);

  const [focused, setFocused] = useState(false);
  const [color, setColor] = useState(COLORS.defaultGray);
  const [localValue, setLocalValue] = useState(value);

  const defineInputColor = useCallback(() => {
    if (hasError) return COLORS.red;

    if (focused) return COLORS.primary;

    return COLORS.defaultGray;
  }, [hasError, focused]);

  useEffect(() => {
    setColor(defineInputColor());
  }, [defineInputColor]);

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
          typography={focused ? TYPOGRAPHY.defaultLabelBold : labelTypography}
          content={label}
          color={color}
        />
      )}
      <StyledInputView>
        {mask ? (
          <StyledTextInputLineWithMask
            {...defaultTextInputProps}
            onBlur={() => {
              setInputFieldValue(
                MaskService.toRawValue(mask.type, localValue, mask.type)
              );
              onBlur();
              setFocused(false);
            }}
            value={localValue}
            onFocus={() => setFocused(true)}
            textColor={textColor}
            type={mask.type}
            options={mask.settings}
            secureTextEntry={!passwordIsVisible}
            onChangeText={newValue => {
              setLocalValue(newValue);
              const unMaskedValue = MaskService.toRawValue(
                mask.type,
                newValue,
                mask.type
              );
              setInputFieldValue(
                MaskService.toRawValue(mask.type, unMaskedValue, mask.type)
              );
            }}
          />
        ) : (
          <StyledTextInputLine
            {...defaultTextInputProps}
            onBlur={() => {
              onBlur();
              setFocused(false);
            }}
            value={value}
            onFocus={() => setFocused(true)}
            textColor={textColor}
            onChangeText={onChangeText}
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
      <DivisorLine color={color} thickness={focused ? 2 : 1} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  margin-left: ${({ marginLeft }) => marginLeft}px;
  margin-right: ${({ marginRight }) => marginRight}px;
  margin-top: ${({ marginTop }) => marginTop}px;
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
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
  padding-vertical: ${SPACING.verySmall}px;
`;

const StyledTextInputLineWithMask = styled(TextInputMask)`
  width: 100%;
  border-radius: 7px;
  font-size: 16px;
  color: ${({ textColor }) => textColor};
  padding-vertical: ${SPACING.verySmall}px;
`;

const StyledShowPasswordButton = styled.TouchableOpacity`
  right: ${SPACING.mediumPlus}px;
`;

TextInputLine.defaultProps = {
  hasLabel: false,
  value: '',
  hasShowPassword: false,
  secureTextEntry: false,
  hasError: false,
  testID: '',
  label: '',
  labelTypography: TYPOGRAPHY.defaultLabel,
  textColor: COLORS.defaultText,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  onBlur: () => {}
};

TextInputLine.propTypes = {
  hasLabel: PropTypes.bool,
  hasShowPassword: PropTypes.bool,
  value: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  hasError: PropTypes.bool,
  testID: PropTypes.string,
  label: PropTypes.string,
  labelTypography: PropTypes.shape({
    weight: PropTypes.string,
    size: PropTypes.string
  }),
  textColor: PropTypes.string,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  defaultTextInputProps: PropTypes.object.isRequired,
  setInputFieldValue: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func.isRequired
};

export default TextInputLine;
