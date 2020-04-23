import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from '#/components/Icon';

import { API } from '#/config/api';

import SPACING from '#/utils/spacing';
import COLORS from '#/utils/colors';
import { MCI } from '#/utils/enums/ICON_FAMILY';

const PictureButton = ({ hasContent, imageName, size, onOpenCamera }) => {
  return (
    <StyledPictureCard disabled={hasContent} onPress={onOpenCamera}>
      <StyledIconPNG
        imageStyle={{ height: size, width: size, resizeMode: 'contain' }}
        size={size}
        source={{ uri: `${API.bucket.vehicleSidesImg}/${imageName}` }}
      >
        <Icon
          iconFamily={MCI}
          iconName={hasContent ? 'checkbox-marked-circle-outline' : 'camera'}
          size={size * 0.5}
          color={hasContent ? COLORS.successCheck : COLORS.backgroundModal}
        />
      </StyledIconPNG>
    </StyledPictureCard>
  );
};

const StyledPictureCard = styled.TouchableOpacity`
  height: 100px;
  width: 100px;
  justify-content: center;
  align-content: center;
  align-self: center;
  padding: ${SPACING.small}px;
  margin-horizontal: ${SPACING.smallPlus}px;
  margin-vertical: ${SPACING.regularPlus}px;
  border-radius: 7px;
  background-color: ${COLORS.secondary};
  elevation: 5;
  box-shadow: 3px 2px 3px rgba(0, 0, 0, 0.3);
`;

const StyledIconPNG = styled.ImageBackground`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

PictureButton.propTypes = PropTypes.shape({
  hasContent: PropTypes.bool,
  imageName: PropTypes.string,
  size: PropTypes.number,
  onOpenCamera: PropTypes.func
}).isRequired;

export default PictureButton;
