import React from 'react';
import styled from 'styled-components/native';
import { MaskService } from 'react-native-masked-text';

import COLORS from '../utils/colors';
import TYPOGRAPHY from '../utils/typography';

const Label = props => {
  const {
    content,
    typography = TYPOGRAPHY.defaultLabelBold,
    textAlign = 'left',
    marginLeft = 0,
    marginRight = 0,
    marginTop = 0,
    marginBottom = 0,
    color = COLORS.defaultText,
    mask
  } = props;
  return (
    <StyledText
      {...props}
      typography={typography}
      textAlign={textAlign}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      color={color}
    >
      {mask ? MaskService.toMask(mask.type, content, mask.settings) : content}
    </StyledText>
  );
};

const StyledText = styled.Text`
  font-size: ${({ typography: { size } }) => size};
  font-weight: ${({ typography: { weight } }) => weight};
  text-align: ${({ textAlign }) => textAlign};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  color: ${({ color }) => color};
`;

export default Label;
