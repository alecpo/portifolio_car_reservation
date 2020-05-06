import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import Label from '#/components/Label';
import SubmitButton from '#/components/SubmitButton';

import STRINGS from '#/utils/strings';
import TYPOGRAPHY from '#/utils/typography';
import SPACING from '#/utils/spacing';
import COLORS from '#/utils/colors';

const CancellingAfterTimeModalScreen = ({ route, navigation }) => {
  const {
    title,
    successMessage,
    placeholder,
    finishSuccessAnimation,
    onSubmit
  } = route.params;
  return (
    <StyledContainer>
      <StyledModalContent>
        <Label
          content='É necessário confirmar'
          textAlign='center'
          typography={TYPOGRAPHY.mediumLabelBold}
          color={COLORS.black}
          marginBottom={SPACING.smallPlus}
        />
        <Label
          content='Essa reserva possui prazo de cancelamento posterior ao permitido e terá seu valor integral cobrado. Deseja continuar?'
          textAlign='justify'
          typography={TYPOGRAPHY.regularLabel}
          color={COLORS.black}
          marginBottom={SPACING.regular}
        />

        <StyledActionBar>
          <StyledButtonView>
            <SubmitButton
              submit={async () => {
                await navigation.pop();
                await navigation.navigate('OnlineModals', {
                  screen: 'DeleteWithJustificationModal',
                  params: {
                    title,
                    successMessage,
                    placeholder,
                    finishSuccessAnimation,
                    onSubmit
                  }
                });
              }}
              title={STRINGS.ok}
              backgroundColor={COLORS.successButton}
            />
          </StyledButtonView>
          <StyledButtonView>
            <SubmitButton
              submit={() => {
                navigation.pop();
              }}
              title={STRINGS.cancel}
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

const StyledActionBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledButtonView = styled.View`
  width: 40%;
`;

export default CancellingAfterTimeModalScreen;
