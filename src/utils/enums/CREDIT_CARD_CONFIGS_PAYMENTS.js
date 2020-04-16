import * as Yup from 'yup';
import valid from 'card-validator';
import STRINGS from '#/utils/strings';
import cardCompanies from '#/utils/cardCompanies';

const CREDIT_CARD_CONFIGS_PAYMENTS = {
  editableFields: ['number', 'name', 'month', 'year', 'cvv', 'flag'],

  validationSchema: Yup.object().shape({
    number: Yup.string()
      .test(
        'test-number',
        STRINGS.payments.modalAddCard.messages.invalidNumber,
        value => valid.number(value).isValid
      )
      .required(STRINGS.payments.modalAddCard.messages.requiredField),
    name: Yup.string()
      .uppercase(STRINGS.payments.modalAddCard.messages.upperLetters)
      .strict()
      .matches(
        /[A-Z][A-Z]* [A-Z][A-Z]*/,
        STRINGS.payments.modalAddCard.messages.invalidName
      )
      .required(STRINGS.payments.modalAddCard.messages.requiredField),
    month: Yup.string()
      .test(
        'test-number',
        STRINGS.payments.modalAddCard.messages.invalidMonth,
        value => valid.expirationMonth(value).isValid
      )
      .length(2, STRINGS.payments.modalAddCard.messages.invalidMonth)
      .required(STRINGS.payments.modalAddCard.messages.requiredField),
    year: Yup.string()
      .test(
        'test-number',
        STRINGS.payments.modalAddCard.messages.invalidYear,
        value => valid.expirationYear(value).isValid
      )
      .length(2, STRINGS.payments.modalAddCard.messages.invalidYear)
      .required(STRINGS.payments.modalAddCard.messages.requiredField),
    cvv: Yup.string()
      .test(
        'test-number',
        STRINGS.payments.modalAddCard.messages.invalidCVV,
        value => valid.cvv(value).isValid
      )
      .required(STRINGS.payments.modalAddCard.messages.requiredField)
  }),

  labels: {
    number: {
      inputType: 'text',
      title: STRINGS.payments.modalAddCard.number,
      defaultTextInputProps: { maxLength: 16 },
      mask: {
        type: 'only-numbers'
      }
    },
    name: {
      inputType: 'text',
      title: STRINGS.payments.modalAddCard.name,
      defaultTextInputProps: {
        autoCapitalize: 'characters',
        autoCorrect: false
      }
    },
    month: {
      inputType: 'text',
      title: STRINGS.payments.modalAddCard.month,
      defaultTextInputProps: { maxLength: 2 },
      mask: {
        type: 'only-numbers'
      }
    },
    year: {
      inputType: 'text',
      title: STRINGS.payments.modalAddCard.year,
      defaultTextInputProps: { maxLength: 2 },
      mask: {
        type: 'only-numbers'
      }
    },
    cvv: {
      inputType: 'text',
      title: STRINGS.payments.modalAddCard.cvv,
      defaultTextInputProps: { maxLength: 3 },
      mask: {
        type: 'only-numbers'
      }
    },
    flag: {
      inputType: 'picker',
      title: STRINGS.payments.modalAddCard.flag,
      options: cardCompanies
    }
  }
};

export default CREDIT_CARD_CONFIGS_PAYMENTS;
