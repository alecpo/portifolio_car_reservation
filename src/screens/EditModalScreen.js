import React from 'react';
import { useDispatch } from 'react-redux';
import { StatusBar, Dimensions } from 'react-native';
import { useFormik } from 'formik';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Label from '~/components/Label';
import DivisorLine from '~/components/DivisorLine';
import SubmitButton from '~/components/SubmitButton';
import TextInputLine from '~/components/TextInputLine';

import STRINGS from '~/utils/strings';
import TYPOGRAPHY from '~/utils/typography';
import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';

import { onUpdateUser } from '~/store/actions/userActions';

const EditModalScreen = ({ route, navigation }) => {
  const {
    title,
    editableObject,
    editedObjectToSubmit,
    apiRoute
  } = route.params;

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: editedObjectToSubmit,
    onSubmit: values => {
      dispatch(onUpdateUser(apiRoute, values));
    }
  });

  return (
    <StyledContainer>
      <StatusBar hidden />
      <StyledModalContent>
        <StyledHeader>
          <Label
            content={`${STRINGS.editModal.edit} ${title.toLowerCase()}:`}
            typography={TYPOGRAPHY.mediumLabelBold}
            color={COLORS.black}
          />
          <StyledCloseButton
            onPress={() => {
              navigation.pop();
            }}
          >
            <Icon name='close' size={25} />
          </StyledCloseButton>
        </StyledHeader>
        <DivisorLine marginVertical={SPACING.small} />
        <StyledBody>
          {Object.entries(editableObject).map(item => (
            <TextInputLine
              key={item[0]}
              onChangeText={formik.handleChange(item[0])}
              value={formik.values[item[0]]}
              marginBottom={10}
              hasLabel
              textColor={COLORS.black}
              label={item[1].title}
              labelColor={COLORS.regularGray}
              mask={item[1].mask}
              typography={TYPOGRAPHY.defaultLabel}
              autoCapitalize='none'
              selectionColor={COLORS.primary}
            />
          ))}
        </StyledBody>
        <SubmitButton
          submit={() => formik.handleSubmit()}
          title={STRINGS.editModal.save}
          backgroundColor={COLORS.successButton}
        />
      </StyledModalContent>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundModal};
`;

const StyledBody = styled.View`
  margin-vertical: ${SPACING.regular}px;
`;

const StyledModalContent = styled.View`
  width: ${Dimensions.get('window').width * 0.8}px;
  background-color: white;
  padding: ${SPACING.smallPlus}px;
`;

const StyledHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledCloseButton = styled.TouchableOpacity`
  padding-vertical: ${SPACING.verySmall}px;
`;

export default EditModalScreen;
