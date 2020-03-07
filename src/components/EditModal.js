import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import STRINGS from '~/utils/strings';
import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';

const EditModal = () => (
  <StyledContainer>
    <StyledModalBody />
  </StyledContainer>
);

const StyledContainer = styled.View`
  position: absolute;
  align-items: center;
  width: ${Dimensions.get('screen').width};
  height: ${Dimensions.get('screen').height};
  background-color: ${COLORS.backgroundModal};
`;

const StyledModalBody = styled.View`
margin-top: ${SPACING.huge}
  width: ${Dimensions.get('window').width * 0.8};
  height: ${Dimensions.get('window').width * 1.2};
  background-color: white;
`;

export default EditModal;
