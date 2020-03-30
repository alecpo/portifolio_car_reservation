import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import COLORS from '~/utils/colors';

import loadingCard from '~/assets/svgAnimations/loadingCard';

const LoadingModalScreen = ({ route, navigation }) => {
  const { lottieJson } = route.params ?? loadingCard;

  return (
    <StyledContainer>
      <StatusBar hidden />
      <StyledModalContent>
        <LottieView
          source={lottieJson}
          autoPlay
          loop={false}
          onAnimationFinish={() => navigation.pop()}
        />
      </StyledModalContent>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundModal};
`;

const StyledModalContent = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').width / 1.7}px;
  background-color: white;
`;

export default LoadingModalScreen;
