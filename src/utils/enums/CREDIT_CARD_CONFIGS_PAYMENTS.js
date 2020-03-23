import STRINGS from '~/utils/strings';

const CREDIT_CARD_CONFIGS_PAYMENTS = {
  editableFields: ['number', 'name', 'month', 'year', 'cvv', 'flag'],
  labels: {
    number: {
      title: STRINGS.payments.modalAddCard.number,
      defaultTextInputProps: { keyboardType: 'numeric', maxLength: 17 }
    },
    name: {
      title: STRINGS.payments.modalAddCard.name,
      defaultTextInputProps: {
        autoCapitalize: 'characters',
        autoCorrect: false
      }
    },
    month: {
      title: STRINGS.payments.modalAddCard.month,
      defaultTextInputProps: { keyboardType: 'numeric', maxLength: 2 }
    },
    year: {
      title: STRINGS.payments.modalAddCard.year,
      defaultTextInputProps: { keyboardType: 'numeric', maxLength: 2 }
    },
    cvv: {
      title: STRINGS.payments.modalAddCard.cvv,
      defaultTextInputProps: { keyboardType: 'numeric', maxLength: 3 }
    },
    flag: {
      title: STRINGS.payments.modalAddCard.flag
    }
  }
};

export default CREDIT_CARD_CONFIGS_PAYMENTS;
