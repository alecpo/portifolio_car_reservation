import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import SubmitButton from '#/components/SubmitButton';
import STRINGS from '#/utils/strings';
import SPACING from '#/utils/spacing';
import COLORS from '#/utils/colors';

const PictureModal = ({ picture, closeModal, closeCamera, onSendPicture }) => {
  const { uri, base64 } = picture;

  const setImageAndCloseModal = async () => {
    await onSendPicture(base64);
    await closeModal();
    await closeCamera();
  };

  return (
    <StyledContainer>
      <StyledImage source={{ uri }} />
      <StyledButtonsRow>
        <StyledSubmitButtonView>
          <SubmitButton
            submit={closeModal}
            title={STRINGS.cancel}
            backgroundColor={COLORS.cancelButton}
            marginVertical={SPACING.regular}
            testID='loginButtonLoginScreen'
          />
        </StyledSubmitButtonView>
        <StyledSubmitButtonView>
          <SubmitButton
            submit={setImageAndCloseModal}
            title={STRINGS.send}
            backgroundColor={COLORS.successButton}
            marginVertical={SPACING.regular}
            testID='loginButtonLoginScreen'
          />
        </StyledSubmitButtonView>
      </StyledButtonsRow>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  width: ${Dimensions.get('window').width * 0.9}px;
  height: ${Dimensions.get('window').width * 1.1}px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
`;

const StyledImage = styled.Image`
  width: ${Dimensions.get('window').width * 0.8}px;
  height: ${Dimensions.get('window').width * 0.8}px;
  border-radius: 7px;
`;

const StyledButtonsRow = styled.View`
  width: ${Dimensions.get('window').width * 0.8}px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const StyledSubmitButtonView = styled.View`
  flex: 0.4;
`;

PictureModal.propTypes = PropTypes.shape({
  picture: PropTypes.shape({ uri: PropTypes.string, base64: PropTypes.string }),
  closeModal: PropTypes.func,
  closeCamera: PropTypes.func,
  onSendPicture: PropTypes.func
}).isRequired;

export default PictureModal;
