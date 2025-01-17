import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import COLORS from '#/utils/colors';

const DatePickerModalScreen = ({ route, navigation }) => {
  const { IOSDateTimePicker, onCloseModal = () => {} } = route.params;

  return (
    <StyledContainer
      activeOpacity={1}
      onPress={async () => {
        await navigation.pop();
        onCloseModal();
      }}
    >
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
  background-color: ${COLORS.secondary};
`;

export default DatePickerModalScreen;
