import * as Yup from 'yup';
import STRINGS from '#/utils/strings';

const ADDRESS_CARD_CONFIGS_PROFILE = {
  editableFields: [
    'zip',
    'street',
    'number',
    'address_formatted',
    'neighborhood',
    'city',
    'state'
  ],

  validationSchema: Yup.object().shape({
    zip: Yup.string().required(
      STRINGS.payments.modalAddCard.messages.requiredField
    ),
    number: Yup.string().required(
      STRINGS.payments.modalAddCard.messages.requiredField
    )
  }),

  labels: {
    zip: {
      inputType: 'text',
      title: STRINGS.address.zip,
      mask: {
        type: 'zip-code'
      }
    },
    street: { inputType: 'text', title: STRINGS.address.street },
    number: {
      inputType: 'text',
      title: STRINGS.address.number,
      defaultTextInputProps: { maxLength: 5 },
      mask: {
        type: 'only-numbers'
      }
    },
    address_formatted: {
      inputType: 'text',
      title: STRINGS.address.address_formatted
    },
    neighborhood: { inputType: 'text', title: STRINGS.address.neighborhood },
    city: {
      inputType: 'text',
      title: STRINGS.address.city
    },
    state: { inputType: 'text', title: STRINGS.address.state },
    id: { inputType: 'text' }
  }
};

export default ADDRESS_CARD_CONFIGS_PROFILE;
