import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native/';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Label from '~/components/Label';
import SubmitButton from '~/components/SubmitButton';

import STRINGS from '~/utils/strings';
import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import TYPOGRAPHY from '~/utils/typography';
import CREDIT_CARD_CONFIGS_PAYMENTS from '~/utils/enums/CREDIT_CARD_CONFIGS_PAYMENTS';

const PaymentsScreen = ({ navigation }) => {
  const { editableFields } = CREDIT_CARD_CONFIGS_PAYMENTS;
  const labelsObject = CREDIT_CARD_CONFIGS_PAYMENTS.labels;
  const valuesObject = {};

  const onPressAddCardButton = () => {
    const labelsObjectFiltered = {};

    editableFields.forEach(
      // eslint-disable-next-line no-return-assign
      label => (labelsObjectFiltered[label] = labelsObject[label])
    );

    const editableObject = {};
    const editedObjectToSubmit = {};

    // eslint-disable-next-line array-callback-return
    Object.entries(labelsObjectFiltered).map(item => {
      editableObject[item[0]] = { ...item[1] };
      editedObjectToSubmit[item[0]] = valuesObject[item[0]];
    });

    const title = STRINGS.payments.modalAddCard.modalTitle;
    const apiRoute = 'apiAddCreditCard';

    navigation.navigate('EditModal', {
      apiRoute,
      title,
      editableObject,
      editedObjectToSubmit
    });
  };

  return (
    <StyledContainer>
      <StyledAddCardView>
        <Label
          typography={TYPOGRAPHY.mediumLabelBold}
          content={STRINGS.payments.emptyCard}
          color={COLORS.darkGray}
          marginBottom={SPACING.smallPlus}
        />
        <Icon name='credit-card' size={50} color={COLORS.darkGray} />
        <SubmitButton
          submit={onPressAddCardButton}
          title={STRINGS.payments.addCard}
          backgroundColor={COLORS.successButton}
          marginVertical={SPACING.smallPlus}
        />
      </StyledAddCardView>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  padding: ${SPACING.small}px;
`;

const StyledAddCardView = styled.View`
  justify-content: center;
  padding-horizontal: ${SPACING.small}px;
  padding-top: ${SPACING.smallPlus}px;
  padding-bottom: ${SPACING.verySmall}px;
  align-items: center;
  border-radius: 7px;
  background-color: ${COLORS.secondary};
  elevation: 5;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
`;

export default PaymentsScreen;
