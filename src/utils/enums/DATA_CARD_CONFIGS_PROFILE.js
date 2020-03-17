import STRINGS from '~/utils/strings';

const DATA_CARD_CONFIGS_PROFILE = {
  editableFields: ['phone', 'birthday'],
  labels: {
    name: { title: STRINGS.name },
    cpf: {
      title: STRINGS.federalRegister,
      mask: { type: 'cpf' }
    },
    drive_license: { title: STRINGS.driverLicency },
    birthday: {
      title: STRINGS.birthday,
      mask: {
        type: 'datetime',
        settings: {
          format: 'DD/MM/YYYY'
        }
      }
    },
    phone: {
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
    email: { title: STRINGS.email }
  }
};

export default DATA_CARD_CONFIGS_PROFILE;
