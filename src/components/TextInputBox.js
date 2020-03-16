/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    hasLabel,
    label,
    labelColor,
    labelPosition,
    labelTypography,
    hasShowPassword,
    secureTextEntry,
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
  margin-left: ${({ marginLeft }) => marginLeft}px;
  margin-right: ${({ marginRight }) => marginRight}px;
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
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
  right: ${SPACING.mediumPlus}px;
`;

TextInputBox.defaultProps = {
  hasLabel: false,
  hasShowPassword: false,
  secureTextEntry: false,
  testID: '',
  label: '',
  labelColor: '',
  labelPosition: 'center',
  labelTypography: TYPOGRAPHY.small,
  textColor: COLORS.defaultText,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0
};

TextInputBox.propTypes = {
  hasLabel: PropTypes.bool,
  hasShowPassword: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  testID: PropTypes.string,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  labelPosition: PropTypes.string,
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

export default TextInputBox;
