import React from 'react';
import { StatusBar, Dimensions, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import STRINGS from '~/utils/strings';
import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';

const EditModalScreen = () => (
  <StyledContainer>
    <StatusBar hidden />
    <StyledModalBody />
  </StyledContainer>
);

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundModal};
`;

const StyledModalBody = styled.View`
  width: ${Dimensions.get('window').width * 0.8};
  height: ${Dimensions.get('window').width * 1.2};
  background-color: white;
`;

export default EditModalScreen;
