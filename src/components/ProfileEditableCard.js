/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Label from '~/components/Label';
import DivisorLine from '~/components/DivisorLine';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import TYPOGRAPHY from '~/utils/typography';
import maskPropType from '~/utils/customPropTypes/maskPropType';

const ProfileEditableCard = props => {
  const {
    editableFields,
    labelsObject,
    valuesObject,
    title,
    validationSchema,
    onSavePartialData
  } = props;

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
    });

    Object.entries(labelsObject).map(item => {
      if (item[0] === 'birthday') {
        const formikBirthday = moment(valuesObject[item[0]])
          .parseZone()
          .format('YYYY-MM-DD');
        editedObjectToSubmit[item[0]] = formikBirthday;
      } else editedObjectToSubmit[item[0]] = valuesObject[item[0]];
    });

    navigation.navigate('EditModal', {
      onSubmit: onSavePartialData,
      title,
      editableObject,
      editedObjectToSubmit,
      validationSchema
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
      {!labelsObject.isPassword && (
        <>
          <DivisorLine marginVertical={SPACING.small} />
          <StyledCardBody>
            {Object.entries(labelsObject).map(
              item =>
                item[1].title && (
                  <StyledKeyValueRow key={item[1].title}>
                    <Label
                      content={`${item[1].title}: `}
                      color={COLORS.primary}
                      marginBottom={SPACING.small}
                    />

                    <Label
                      mask={item[1].mask}
                      content={
                        item[0] === 'birthday'
                          ? moment(valuesObject[item[0]])
                              .parseZone()
                              .format('DD/MM/YYYY')
                          : valuesObject[item[0]]
                      }
                      typography={TYPOGRAPHY.defaultLabel}
                      colors={COLORS.defaultGray}
                      marginBottom={SPACING.small}
                    />
                  </StyledKeyValueRow>
                )
            )}
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

ProfileEditableCard.propTypes = {
  title: PropTypes.string.isRequired,
  editableFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  labelsObject: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string,
      mask: maskPropType
    })
  ).isRequired,
  valuesObject: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  onSavePartialData: PropTypes.func.isRequired
};

export default ProfileEditableCard;
