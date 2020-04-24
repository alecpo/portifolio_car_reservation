import React, { useEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Label from '#/components/Label';
import SubmitButton from '#/components/SubmitButton';

import STRINGS from '#/utils/strings';
import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';

import cardCompanies from '#/utils/cardCompanies';
import CREDIT_CARD_CONFIGS_PAYMENTS from '#/utils/enums/CREDIT_CARD_CONFIGS_PAYMENTS';

import {
  onAddCreditCard,
  onDeleteCreditCard,
  onGetCreditCards
} from '#/store/actions/paymentsActions';

import loadingCard from '#/assets/svgAnimations/loadingCard';
import deletingCard from '#/assets/svgAnimations/deletingCard';

const PaymentsScreen = ({ navigation }) => {
  const {
    editableFields,
    validationSchema,
    labels: labelsObject
  } = CREDIT_CARD_CONFIGS_PAYMENTS;

  const valuesObject = {};

  const { creditCardsList, isLoading, isDeletingCard } = useSelector(
    ({ payments }) => payments
  );

  const { userToken } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const onAddCard = values => {
    const nickname = `${values.flag} - ${values.number.substr(
      values.number.length - 4
    )}`;
    dispatch(onAddCreditCard({ ...values, nickname }));
  };

  const onDeleteCard = id => {
    dispatch(onDeleteCreditCard(id));
  };

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

      if (item[0] === 'flag') {
        const defaultFlag = cardCompanies[0].value;
        editedObjectToSubmit[item[0]] = defaultFlag;
      } else {
        editedObjectToSubmit[item[0]] = valuesObject[item[0]];
      }
    });

    const title = STRINGS.payments.modalAddCard.modalTitle;

    navigation.navigate('EditModal', {
      onSubmit: onAddCard,
      title,
      editableObject,
      editedObjectToSubmit,
      validationSchema
    });
  };

  const getCreditCards = useCallback(() => {
    dispatch(onGetCreditCards());
  }, [dispatch]);

  useEffect(() => {
    if (userToken) getCreditCards();
  }, [userToken, getCreditCards]);

  useEffect(() => {
    if (userToken)
      if (isLoading && !isDeletingCard) {
        navigation.navigate('LoadingModal', { lottieJson: loadingCard });
      } else if (isDeletingCard)
        navigation.navigate('LoadingModal', { lottieJson: deletingCard });
  }, [userToken, isLoading, isDeletingCard, navigation]);

  return (
    <StyledContainer>
      {!creditCardsList.length ? (
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
      ) : (
        <>
          <SubmitButton
            submit={onPressAddCardButton}
            title={STRINGS.payments.addCard}
            backgroundColor={COLORS.successButton}
            marginVertical={SPACING.smallPlus}
          />
          <StyledTitle>
            <Icon name='credit-card' size={30} color={COLORS.primary} />
            <Label
              typography={TYPOGRAPHY.defaultLabelBold}
              content={STRINGS.payments.creditCards}
              color={COLORS.primary}
              marginLeft={SPACING.small}
            />
          </StyledTitle>
          {creditCardsList[0].id &&
            creditCardsList.map(card => (
              <StyledCard key={card.id}>
                <Label
                  typography={TYPOGRAPHY.defaultLabelBold}
                  content={card.nickname}
                  color={COLORS.primary}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ConfirmModal', {
                      title: STRINGS.payments.confirmDeleteMessage,
                      icon: () => (
                        <Icon
                          name='credit-card'
                          size={55}
                          color={COLORS.darkGray}
                        />
                      ),
                      onSubmit: () => onDeleteCard(card.id)
                    });
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Icon name='delete' size={22} color={COLORS.primary} />
                </TouchableOpacity>
              </StyledCard>
            ))}
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.secondary};
  padding: ${SPACING.smallPlus}px;
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

const StyledTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${SPACING.small}px;
  margin-bottom: ${SPACING.verySmall}px;
  padding-left: ${SPACING.small}px;
`;

const StyledCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${SPACING.smallPlus}px;
  padding-vertical: ${SPACING.smallPlus}px;
  margin-vertical: ${SPACING.small}px;
  background-color: ${COLORS.secondary};
  elevation: 7;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
`;

export default PaymentsScreen;
