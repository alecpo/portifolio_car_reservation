/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    hasLabel,
    label,
    labelColor,
    labelTypography,
    hasShowPassword,
    secureTextEntry,
    mask,
    textColor,
    value,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom
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
  margin-left: ${({ marginLeft }) => marginLeft}px;
  margin-right: ${({ marginRight }) => marginRight}px;
  margin-top: ${({ marginTop }) => marginTop};
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
`;

const StyledTextInputLineWithMask = styled(TextInputMask)`
  width: 100%;
  border-radius: 7px;
  font-size: 16px;
  color: ${({ textColor }) => textColor};
`;

const StyledShowPasswordButton = styled.TouchableOpacity`
  right: ${SPACING.mediumPlus}px;
`;

TextInputLine.defaultProps = {
  hasLabel: false,
  hasShowPassword: false,
  secureTextEntry: false,
  testID: '',
  label: '',
  labelColor: '',
  labelTypography: TYPOGRAPHY.small,
  textColor: COLORS.defaultText,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0
};

TextInputLine.propTypes = {
  hasLabel: PropTypes.bool,
  hasShowPassword: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  testID: PropTypes.string,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  labelTypography: PropTypes.shape({
    weight: PropTypes.string,
    size: PropTypes.string
  }),
  textColor: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number
};

export default TextInputLine;
