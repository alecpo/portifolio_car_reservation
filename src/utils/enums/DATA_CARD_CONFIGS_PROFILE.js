import * as Yup from 'yup';
import STRINGS from '#/utils/strings';

const DATA_CARD_CONFIGS_PROFILE = {
  editableFields: ['phone', 'birthday'],

  validationSchema: Yup.object().shape({
    phone: Yup.string()
      .min(10, STRINGS.payments.modalAddCard.messages.invalidNumber)
      .max(11, STRINGS.payments.modalAddCard.messages.invalidNumber)
      .required(STRINGS.payments.modalAddCard.messages.requiredField),
    birthday: Yup.date().required(
      STRINGS.payments.modalAddCard.messages.requiredField
    )
  }),

  labels: {
    name: { inputType: 'text', title: STRINGS.name },
    id: { inputType: 'text' },
    cpf: {
      inputType: 'text',
      title: STRINGS.federalRegister,
      mask: { type: 'cpf' }
    },
    drive_license: { inputType: 'text', title: STRINGS.driverLicency },
    birthday: {
      inputType: 'date-picker',
      title: STRINGS.birthday
    },
    phone: {
      inputType: 'text',
      title: STRINGS.phone,
      mask: {
        type: 'cel-phone',
        settings: {
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) '
        }
      }
    },
    email: { inputType: 'text', title: STRINGS.email }
  }
};

export default DATA_CARD_CONFIGS_PROFILE;
