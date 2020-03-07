import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Label from '~/components/Label';
import DivisorLine from '~/components/DivisorLine';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import TYPOGRAPHY from '~/utils/typography';

const ProfileEditableCard = props => {
  const { labelList, contentList, title } = props;
  return (
    <StyledContainer {...props}>
      <StyledCardHeader>
        <Label
          typography={TYPOGRAPHY.mediumLabelBold}
          content={title}
          color={COLORS.primary}
        />
        <Icon name='edit' size={20} color={COLORS.primary} />
      </StyledCardHeader>
      {labelList && (
        <>
          <DivisorLine />
          <StyledCardBody>
            {labelList.map((label, index) => (
              <StyledKeyValueRow key={index}>
                <Label
                  content={`${label.title}: `}
                  color={COLORS.primary}
                  marginBottom={SPACING.small}
                />
                <Label
                  mask={label.mask}
                  content={contentList[index]}
                  typography={TYPOGRAPHY.defaultLabel}
                  colors={COLORS.defaultGray}
                  marginBottom={SPACING.small}
                />
              </StyledKeyValueRow>
            ))}
          </StyledCardBody>
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  margin-bottom: ${SPACING.smallPlus};
  padding: ${SPACING.small};
  border-radius: 7px;
  background-color: #fff;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
`;

const StyledCardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledCardBody = styled.View`
  margin-top: ${SPACING.verySmall};
`;

const StyledKeyValueRow = styled.View`
  flex-direction: row;
`;

export default ProfileEditableCard;
