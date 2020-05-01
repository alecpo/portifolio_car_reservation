/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Label from '#/components/Label';
import DivisorLine from '#/components/DivisorLine';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';
import maskPropType from '#/utils/customPropTypes/maskPropType';

const PaymentAddCreditCardBox = props => {
  const { editableFields, labelsObject, valuesObject, title, apiRoute } = props;

  const navigation = useNavigation();

  const onPressCard = () => {
    const labelsObjectFiltered = {};

    editableFields.forEach(
      label => (labelsObjectFiltered[label] = labelsObject[label])
    );

    const editableObject = {};
    const editedObjectToSubmit = {};

    Object.entries(labelsObjectFiltered).map(item => {
      editableObject[item[0]] = { ...item[1] };
      editedObjectToSubmit[item[0]] = valuesObject[item[0]];
    });

    navigation.navigate('OnlineModals', {
      screen: 'EditModal',
      params: { apiRoute, title, editableObject, editedObjectToSubmit }
    });
  };

  return (
    <StyledContainer {...props} onPress={onPressCard}>
      <StyledCardHeader>
        <Label
          typography={TYPOGRAPHY.mediumLabelBold}
          content={title}
          color={COLORS.primary}
        />
        <Icon name='edit' size={20} color={COLORS.primary} />
      </StyledCardHeader>
      {!labelsObject.currentPassword && (
        <>
          <DivisorLine marginVertical={SPACING.small} />
          <StyledCardBody>
            {Object.entries(labelsObject).map(item => {
              return (
                <StyledKeyValueRow key={item.title}>
                  <Label
                    content={`${item[1].title}: `}
                    color={COLORS.primary}
                    marginBottom={SPACING.small}
                  />

                  <Label
                    mask={item[1].mask}
                    content={valuesObject[item[0]]}
                    typography={TYPOGRAPHY.defaultLabel}
                    colors={COLORS.defaultGray}
                    marginBottom={SPACING.small}
                  />
                </StyledKeyValueRow>
              );
            })}
          </StyledCardBody>
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width * 0.95}px;
  margin-vertical: ${SPACING.verySmall}px;
  padding: ${SPACING.small}px;
  border-radius: 7px;
  background-color: ${COLORS.secondary};
  elevation: 5;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
`;

const StyledCardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledCardBody = styled.View`
  margin-top: ${SPACING.verySmall}px;
`;

const StyledKeyValueRow = styled.View`
  flex-direction: row;
`;

PaymentAddCreditCardBox.propTypes = {
  title: PropTypes.string.isRequired,
  apiRoute: PropTypes.string.isRequired,
  editableFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  labelsObject: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      mask: maskPropType
    })
  ).isRequired,
  valuesObject: PropTypes.object.isRequired
};

export default PaymentAddCreditCardBox;
