import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import COLORS from '~/utils/colors';

const DatePickerModalScreen = ({ route, navigation }) => {
  const { IOSDateTimePicker } = route.params;

  return (
    <StyledContainer
      activeOpacity={1}
      onPress={() => {
        navigation.pop();
      }}
    >
      <StatusBar hidden />
      <StyledModalContent>{IOSDateTimePicker()}</StyledModalContent>
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundModal};
`;

const StyledModalContent = styled.View`
  width: ${Dimensions.get('window').width}px;
  background-color: white;
`;

export default DatePickerModalScreen;
