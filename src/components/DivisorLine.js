import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import COLORS from '~/utils/colors';

const DivisorLine = ({ marginVertical, thickness }) => (
  <StyledDivisorLine marginVertical={marginVertical} thickness={thickness} />
);

const StyledDivisorLine = styled.View`
  height: ${({ thickness }) => thickness}px;
  margin-vertical: ${({ marginVertical }) => marginVertical}px;
  background-color: ${COLORS.defaultGray};
`;

DivisorLine.defaultProps = {
  marginVertical: 0,
  thickness: 1
};

DivisorLine.propTypes = {
  marginVertical: PropTypes.number,
  thickness: PropTypes.number
};

export default DivisorLine;
