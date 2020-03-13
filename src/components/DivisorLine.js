import React from 'react';
import styled from 'styled-components/native';

import COLORS from '~/utils/colors';

const DivisorLine = ({ marginVertical = '0px' }) => (
  <StyledDivisorLine marginVertical={marginVertical} />
);

const StyledDivisorLine = styled.View`
  height: 0.6px;
  margin-vertical: ${({ marginVertical }) => marginVertical};
  background-color: ${COLORS.defaultGray};
`;

export default DivisorLine;
