import React, { useState, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import styled from 'styled-components/native';

import PictureModal from './PictureModal';
import Icon from '#/components/Icon';

import COLORS from '#/utils/colors';
import { MI, MCI, SLI } from '#/utils/enums/ICON_FAMILY';

const Camera = ({ closeCamera, onSendPicture, type }) => {
  const [cameraType, setCameraType] = useState(type);
  const [flashMode, setFlashMode] = useState('off');
  const [flashIconName, setFlashIconName] = useState('flash-off');
  const [isImageCaptured, setImageCaptured] = useState(false);
  const [picture, setPicture] = useState({});

  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef) {
      const options = {
        quality: 0.5,
        base64: true,
        mirrorImage: cameraType === 'front',
        fixOrientation: cameraType === 'front'
      };
      setPicture(await cameraRef.current.takePictureAsync(options));
      setImageCaptured(true);
    }
  };

  const chooseFlashIconName = oldFlashIconName => {
    switch (oldFlashIconName) {
      case 'flash-on':
        return 'flash-off';
      case 'flash-auto':
        return 'flash-on';
      default:
        return 'flash-auto';
    }
  };

  const chooseFlashMode = oldFlashMode => {
    switch (oldFlashMode) {
      case 'on':
        return 'off';
      case 'auto':
        return 'on';
      default:
        return 'auto';
    }
  };

  const changeFlashMode = () => {
    setFlashMode(oldFlashMode => chooseFlashMode(oldFlashMode));
    setFlashIconName(oldFlashIconName => chooseFlashIconName(oldFlashIconName));
  };

  return (
    <StyledRNCamera ref={cameraRef} type={cameraType} flashMode={flashMode}>
      {isImageCaptured ? (
        <StyledContainer>
          <PictureModal
            picture={picture}
            closeCamera={closeCamera}
            onSendPicture={onSendPicture}
            closeModal={() => setImageCaptured(false)}
          />
        </StyledContainer>
      ) : (
        <StyledActionsContainer>
          <TouchableOpacity
            onPress={closeCamera}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              iconFamily={SLI}
              iconName='arrow-left-circle'
              size={30}
              color={COLORS.secondary}
            />
          </TouchableOpacity>
          <>
            <StyledActionsRow>
              <TouchableOpacity
                onPress={changeFlashMode}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon
                  iconFamily={MI}
                  iconName={flashIconName}
                  size={30}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePicture}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon
                  iconFamily={SLI}
                  iconName='camera'
                  size={50}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setCameraType(oldCameraType =>
                    oldCameraType === 'front' ? 'back' : 'front'
                  )
                }
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon
                  iconFamily={MCI}
                  iconName='camera-switch'
                  size={30}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
            </StyledActionsRow>
          </>
        </StyledActionsContainer>
      )}
    </StyledRNCamera>
  );
};

const StyledRNCamera = styled(RNCamera)`
  flex: 1;
`;

const StyledActionsContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 15px;
`;

const StyledActionsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(4, 0, 0, 0.4);
`;

Camera.defaultProps = {
  type: 'back'
};

Camera.propTypes = PropTypes.shape({
  type: PropTypes.string,
  closeCamera: PropTypes.func,
  onSendPicture: PropTypes.func
}).isRequired;

export default Camera;
