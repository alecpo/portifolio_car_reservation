import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import Label from '#/components/Label';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';

import defaultAnimation from '#/assets/svgAnimations/default';

const LoadingModalScreen = ({ route, navigation }) => {
  const { lottieJson = null, title = null, finishSuccessAnimation = () => {} } =
    route.params ?? {};

  return (
    <StyledContainer>
      <StatusBar hidden />
      <StyledContentView>
        {title && (
          <Label
            textAlign='center'
            typography={TYPOGRAPHY.hugeLabelBold}
            content={title}
            marginBottom={SPACING.smallPlus}
          />
        )}
        <StyleLottieView
          resizeMode='contain'
          source={lottieJson || defaultAnimation}
          autoPlay
          loop={!lottieJson}
          onAnimationFinish={async () => {
            await navigation.pop();
            await finishSuccessAnimation();
          }}
        />
      </StyledContentView>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundModal};
`;

const StyledContentView = styled.View`
  width: ${Dimensions.get('window').width * 0.9}px;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.secondary};
  border-radius: 5px;
  padding: ${SPACING.regularPlus}px;
`;

const StyleLottieView = styled(LottieView)`
  width: 150px;
`;

export default LoadingModalScreen;
