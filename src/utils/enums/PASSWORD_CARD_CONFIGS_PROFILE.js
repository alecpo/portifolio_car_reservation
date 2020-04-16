import * as Yup from 'yup';
import STRINGS from '#/utils/strings';

const PASSWORD_CARD_CONFIGS_PROFILE = {
  editableFields: ['newPassword', 'confirmNewPassword'],

  validationSchema: Yup.object().shape({
    newPassword: Yup.string().required(
      STRINGS.payments.modalAddCard.messages.requiredField
    ),
    confirmNewPassword: Yup.string()
      .oneOf(
        [Yup.ref('newPassword'), null],
        STRINGS.payments.modalAddCard.messages.invalidPasswordConfirmaion
      )
      .required(STRINGS.payments.modalAddCard.messages.requiredField)
  }),

  labels: {
    isPassword: true,
    newPassword: {
      inputType: 'text',
      title: STRINGS.forgotPassword.newPassword,
      isPassword: true
    },
    confirmNewPassword: {
      inputType: 'text',
      title: STRINGS.forgotPassword.confirmNewPassword,
      isPassword: true
    }
  }
};

export default PASSWORD_CARD_CONFIGS_PROFILE;
