import STRINGS from '~/utils/strings';

const ADDRESS_CARD_CONFIGS_PROFILE = {
  editableFields: ['street', 'number', 'neighborhood', 'city'],
  labels: {
    street: { title: STRINGS.address.street },
    number: {
      title: STRINGS.address.number
    },
    neighborhood: { title: STRINGS.address.neighborhood },
    city: {
      title: STRINGS.address.city
    }
  }
};

export default ADDRESS_CARD_CONFIGS_PROFILE;
