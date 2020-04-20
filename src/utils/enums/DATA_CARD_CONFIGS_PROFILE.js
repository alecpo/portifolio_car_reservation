/* eslint-disable no-plusplus */
import * as Yup from 'yup';
import STRINGS from '#/utils/strings';

const isValidCPF = number => {
  let sum;
  let rest;
  sum = 0;
  if (number === '00000000000') return false;

  for (let i = 1; i <= 9; i++)
    sum += parseInt(number.substring(i - 1, i), 10) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(number.substring(9, 10), 10)) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(number.substring(i - 1, i), 10) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;

  if (rest !== parseInt(number.substring(10, 11), 10)) return false;
  return true;
};

const DATA_CARD_CONFIGS_PROFILE = {
  editableFields: ['phone', 'birthday'],

  validationSchema: Yup.object().shape({
    cpf: Yup.string()
      .test('test-number', 'CPF inválido', value => isValidCPF(value))
      .required(STRINGS.payments.modalAddCard.messages.requiredField),
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
    drive_license: {
      inputType: 'text',
      title: STRINGS.driverLicency,
      defaultTextInputProps: { maxLength: 11 },
      mask: {
        type: 'only-numbers'
      }
    },
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
