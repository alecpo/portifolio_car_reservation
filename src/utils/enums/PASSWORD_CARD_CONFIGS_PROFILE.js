import STRINGS from '~/utils/strings';

const PASSWORD_CARD_CONFIGS_PROFILE = {
  editableFields: ['currentPassword', 'newPassword', 'confirmNewPassword'],
  labels: {
    currentPassword: { title: STRINGS.forgotPassword.currentPassword },
    newPassword: { title: STRINGS.forgotPassword.newPassword },
    confirmNewPassword: {
      title: STRINGS.forgotPassword.confirmNewPassword
    }
  }
};

export default PASSWORD_CARD_CONFIGS_PROFILE;
