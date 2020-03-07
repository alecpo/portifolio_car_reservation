import STRINGS from '~/utils/strings';

const profileEditDataCard = [
  { title: STRINGS.name },
  { title: STRINGS.federalRegister, mask: { type: 'cpf' } },
  { title: STRINGS.driverLicency },
  {
    title: STRINGS.birthday,
    mask: {
      type: 'datetime',
      settings: {
        format: 'DD/MM/YYYY'
      }
    }
  },
  {
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
  { title: STRINGS.email }
];

export default profileEditDataCard;
