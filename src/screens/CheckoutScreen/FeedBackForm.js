import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
import styled from 'styled-components/native';

import Label from '#/components/Label';
import CheckCircle from '#/components/CheckCircle';

import STRINGS from '#/utils/strings';
import SPACING from '#/utils/spacing';
import COLORS from '#/utils/colors';
import formikPropType from '#/utils/customPropTypes/formikPropType';
import { REVIEW, DIRTY } from '#/utils/enums/FEEDBACK_RATING';

const FeedBackForm = ({ formik }) => {
  return (
    <StyledContainer>
      <Label
        content={
          STRINGS.reservations.checkoutScreen.feedbackForm.howWasTheExperience
        }
        marginTop={SPACING.small}
        marginBottom={SPACING.small}
        color={COLORS.primary}
      />
      <AirbnbRating
        count={5}
        reviews={REVIEW}
        defaultRating={formik.values.rating}
        reviewSize={22}
        size={30}
        reviewColor={COLORS.star}
        selectedColor={COLORS.star}
        onFinishRating={value => formik.setFieldValue('rating', value)}
      />

      <Label
        content={
          STRINGS.reservations.checkoutScreen.feedbackForm.insideCarState
        }
        marginTop={SPACING.small}
        marginBottom={SPACING.small}
        color={COLORS.primary}
      />
      {DIRTY.map(item => (
        <CheckCircle
          key={`estadoInterno_${item}`}
          label={item}
          isChecked={item === formik.values.estadoInterno}
          unCheckedColor={COLORS.darkBlueFont}
          checkedColor={COLORS.successButton}
          onPress={() => formik.setFieldValue('estadoInterno', item)}
          marginVertical={SPACING.small}
        />
      ))}
      <Label
        content={
          STRINGS.reservations.checkoutScreen.feedbackForm.outsideCarState
        }
        marginTop={SPACING.small}
        marginBottom={SPACING.small}
        color={COLORS.primary}
      />
      {DIRTY.map(item => (
        <CheckCircle
          key={`estadoExterno_${item}`}
          label={item}
          isChecked={item === formik.values.estadoExterno}
          unCheckedColor={COLORS.darkBlueFont}
          checkedColor={COLORS.successButton}
          onPress={() => formik.setFieldValue('estadoExterno', item)}
          marginVertical={SPACING.small}
        />
      ))}
      <Label
        content={STRINGS.reservations.checkoutScreen.feedbackForm.badSmell}
        marginTop={SPACING.small}
        marginBottom={SPACING.small}
        color={COLORS.primary}
      />
      <StyledRowView>
        <CheckCircle
          label={STRINGS.yes}
          isChecked={formik.values.odorCarro === STRINGS.yes.toLowerCase()}
          unCheckedColor={COLORS.darkBlueFont}
          checkedColor={COLORS.successButton}
          onPress={() =>
            formik.setFieldValue('odorCarro', STRINGS.yes.toLowerCase())
          }
          marginVertical={SPACING.small}
        />
        <CheckCircle
          label={STRINGS.no}
          isChecked={formik.values.odorCarro === STRINGS.no.toLowerCase()}
          unCheckedColor={COLORS.darkBlueFont}
          checkedColor={COLORS.successButton}
          onPress={() =>
            formik.setFieldValue('odorCarro', STRINGS.no.toLowerCase())
          }
          marginVertical={SPACING.small}
        />
      </StyledRowView>
      <Label
        content={STRINGS.reservations.checkoutScreen.feedbackForm.carDefect}
        marginTop={SPACING.small}
        marginBottom={SPACING.small}
        color={COLORS.primary}
      />
      <StyledRowView>
        <CheckCircle
          label={STRINGS.yes}
          isChecked={
            formik.values.estadoCarroDefeito === STRINGS.yes.toLowerCase()
          }
          unCheckedColor={COLORS.darkBlueFont}
          checkedColor={COLORS.successButton}
          onPress={() =>
            formik.setFieldValue(
              'estadoCarroDefeito',
              STRINGS.yes.toLowerCase()
            )
          }
          marginVertical={SPACING.small}
        />
        <CheckCircle
          label={STRINGS.no}
          isChecked={
            formik.values.estadoCarroDefeito === STRINGS.no.toLowerCase()
          }
          unCheckedColor={COLORS.darkBlueFont}
          checkedColor={COLORS.successButton}
          onPress={() =>
            formik.setFieldValue('estadoCarroDefeito', STRINGS.no.toLowerCase())
          }
          marginVertical={SPACING.small}
        />
      </StyledRowView>
      {formik.values.estadoCarroDefeito === STRINGS.yes.toLowerCase() && (
        <StyledTextInput
          value={formik.values.obsDefeitoCarro}
          onChangeText={value => formik.setFieldValue('obsDefeitoCarro', value)}
          placeholder={
            STRINGS.reservations.checkoutScreen.feedbackForm.carDefectObs
          }
          placeholderTextColor={COLORS.darkGray}
          multiline
          selectTextOnFocus
          selectionColor={COLORS.primary}
          autoCorrect={false}
        />
      )}
      <Label
        content={
          STRINGS.reservations.checkoutScreen.feedbackForm.othersObsPlaceHolder
        }
        marginTop={SPACING.small}
        marginBottom={SPACING.small}
        color={COLORS.primary}
      />
      <StyledTextInput
        value={formik.values.obsOutras}
        onChangeText={value => formik.setFieldValue('obsOutras', value)}
        placeholder={STRINGS.reservations.checkoutScreen.feedbackForm.othersObs}
        placeholderTextColor={COLORS.darkGray}
        multiline
        selectTextOnFocus
        selectionColor={COLORS.primary}
        autoCorrect={false}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledRowView = styled.View`
  flex-direction: row;
`;

const StyledTextInput = styled.TextInput`
  margin-vertical: ${SPACING.smallPlus}px;
  padding: ${SPACING.small}px;
  border-radius: 7px;
  border-width: 1px;
  border-color: ${COLORS.darkGray};
  font-size: 16px;
`;

FeedBackForm.propTypes = {
  formik: formikPropType.isRequired
};

export default FeedBackForm;
