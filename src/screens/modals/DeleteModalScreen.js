import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import Label from '#/components/Label';
import SubmitButton from '#/components/SubmitButton';

import STRINGS from '#/utils/strings';
import TYPOGRAPHY from '#/utils/typography';
import SPACING from '#/utils/spacing';
import COLORS from '#/utils/colors';

const DeleteModalScreen = ({ route, navigation }) => {
  const { title = '', icon = () => {}, onSubmit = () => {} } =
    route.params ?? {};

  return (
    <StyledContainer>
      <StatusBar hidden />
      <StyledModalContent>
        <Label
          content={title ?? ''}
          textAlign='center'
          typography={TYPOGRAPHY.mediumLabelBold}
          color={COLORS.black}
        />
        <StyledIconView>{icon()}</StyledIconView>
        <StyledActionBar>
          <StyledButtonView>
            <SubmitButton
              submit={() => {
                navigation.pop();
              }}
              backgroundColor={COLORS.red}
              title={STRINGS.no}
            />
          </StyledButtonView>
          <StyledButtonView>
            <SubmitButton
              submit={async () => {
                await navigation.pop();
                onSubmit();
              }}
              title={STRINGS.yes}
              backgroundColor={COLORS.successButton}
            />
          </StyledButtonView>
        </StyledActionBar>
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
  width: ${Dimensions.get('window').width * 0.8}px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.secondary};
  padding: ${SPACING.big}px;
`;

const StyledIconView = styled.View`
  margin-vertical: ${SPACING.medium}px;
`;

const StyledActionBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledButtonView = styled.View`
  width: 40%;
`;

export default DeleteModalScreen;
