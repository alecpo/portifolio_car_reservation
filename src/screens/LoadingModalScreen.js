import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import COLORS from '~/utils/colors';

import defaultAnimation from '~/assets/svgAnimations/default';

const LoadingModalScreen = ({ route, navigation }) => {
  const { lottieJson } = route.params;

  return (
    <StyledContainer>
      <StatusBar hidden />
      <StyledModalContent
        source={lottieJson || defaultAnimation}
        autoPlay
        loop={!lottieJson}
        onAnimationFinish={() => navigation.pop()}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundModal};
`;

const StyledModalContent = styled(LottieView)`
  height: ${Dimensions.get('window').width / 1.8}px;
  border-radius: ${Dimensions.get('window').width / 10}px;
  background-color: white;
`;

export default LoadingModalScreen;
