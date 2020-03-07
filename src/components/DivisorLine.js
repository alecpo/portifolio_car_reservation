import React from 'react';
import styled from 'styled-components/native';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

const DivisorLine = () => <StyledDivisorLine />;

const StyledDivisorLine = styled.View`
  height: 0.6px;
  margin-top: ${SPACING.small};
  margin-bottom: ${SPACING.small};
  background-color: ${COLORS.defaultGray};
  width: 100%;
`;

export default DivisorLine;
