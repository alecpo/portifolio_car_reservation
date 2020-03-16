import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import COLORS from '~/utils/colors';

const DivisorLine = ({ marginVertical }) => (
  <StyledDivisorLine marginVertical={marginVertical} />
);

const StyledDivisorLine = styled.View`
  height: 0.6px;
  margin-vertical: ${({ marginVertical }) => marginVertical}px;
  background-color: ${COLORS.defaultGray};
`;

DivisorLine.defaultProps = {
  marginVertical: 0
};

DivisorLine.propTypes = {
  marginVertical: PropTypes.number
};

export default DivisorLine;
