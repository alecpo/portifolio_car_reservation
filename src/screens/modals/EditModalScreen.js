import React from 'react';
import { StatusBar, Dimensions, Platform, View } from 'react-native';
import { useFormik } from 'formik';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Label from '#/components/Label';
import DivisorLine from '#/components/DivisorLine';
import SubmitButton from '#/components/SubmitButton';
import TextInputLine from '#/components/TextInputLine';
import PickerStyled from '#/components/PickerStyled';
import StyledDatePicker from '#/components/StyledDatePicker';

import STRINGS from '#/utils/strings';
import TYPOGRAPHY from '#/utils/typography';
import SPACING from '#/utils/spacing';
import COLORS from '#/utils/colors';

const EditModalScreen = ({ route, navigation }) => {
  const {
    title,
    editableObject,
    editedObjectToSubmit,
    onSubmit,
    validationSchema
  } = route.params ?? {};

  const formik = useFormik({
    initialValues: editedObjectToSubmit,
    onSubmit: async values => {
      await navigation.pop();
      onSubmit(values);
    },
    validationSchema
  });

  const checkCPF = (zipCode, setError = () => {}, removeError = () => {}) => {
    axios
      .get(`https://viacep.com.br/ws/${zipCode}/json`)
      .then(resAddressUser => {
        if (resAddressUser.data.erro) setError();
        else {
          const {
            data: { logradouro, bairro, localidade, uf }
          } = resAddressUser;
          formik.setValues({
            ...formik.values,
            zip: zipCode,
            street: logradouro,
            neighborhood: bairro,
            city: localidade,
            state: uf
          });
          removeError();
        }
      })
      .catch(e => {
        setError();
        console.log('Um erro ocorreu ao consumir a API do VIACEP!: ', e);
      });
  };

  const renderAppropriateInput = item => {
    switch (item[1].inputType) {
      case 'text':
        return (
          <View key={item[0]}>
            <TextInputLine
              hasLabel
              hasError={
                formik.errors[item[0]] &&
                formik.touched[item[0]] &&
                formik.values[item[0]]
              }
              textColor={COLORS.black}
              label={item[1].title}
              mask={item[1].mask}
              typography={TYPOGRAPHY.defaultLabel}
              hasShowPassword={item[1].isPassword}
              marginTop={SPACING.regular}
              marginBottom={SPACING.small}
              setInputFieldValue={value => {
                formik.setFieldValue(item[0], value);
                if (item[0] === 'zip') {
                  checkCPF(value, () =>
                    formik.setFieldError(item[0], 'CPF inválido', () =>
                      formik.setFieldError(item[0], undefined)
                    )
                  );
                }
              }}
              value={formik.values[item[0]]}
              onChangeText={formik.handleChange(item[0])}
              defaultTextInputProps={{
                onBlur: () => {
                  if (formik.values[item[0]])
                    formik.setFieldTouched(item[0], true, false);
                  else {
                    formik.setFieldTouched(item[0], false);
                  }
                },
                ...item[1].defaultTextInputProps,
                selectionColor: COLORS.primary,
                secureTextEntry: item[1].isPassword
              }}
            />
            {formik.errors[item[0]] &&
            formik.touched[item[0]] &&
            formik.values[item[0]] ? (
              <Label
                content={formik.errors[item[0]]}
                typography={TYPOGRAPHY.smallLabel}
                marginBottom={SPACING.small}
                color={COLORS.red}
              />
            ) : null}
          </View>
        );
      case 'picker':
        return (
          <PickerStyled
            key={item[0]}
            hasLabel
            label={item[1].title}
            labelColor={COLORS.defaultGray}
            dataList={item[1].options}
            updateState={formik.handleChange(item[0])}
          />
        );
      case 'date-picker':
        return (
          <StyledDatePicker
            key={item[0]}
            testID='dateTimePicker'
            label={item[1].title}
            hasLabel
            formikValue={formik.values[item[0]]}
            formikHandleChange={formik.handleChange(item[0])}
          />
        );
      default:
        return null;
    }
  };

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.select({
        ios: 'padding',
        android: null
      })}
      keyboardVerticalOffset={Platform.select({
        ios: -50,
        android: -100
      })}
    >
      <StatusBar hidden />
      <StyledModalContent>
        <StyledHeader>
          <Label
            content={`${title}:`}
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
        <DivisorLine thickness={0.5} marginVertical={SPACING.verySmall} />
        <StyledScrollViewBody showsVerticalScrollIndicator={false}>
          {Object.entries(editableObject).map(renderAppropriateInput)}
        </StyledScrollViewBody>

        <SubmitButton
          submit={formik.handleSubmit}
          disabled={!formik.isValid || !formik.dirty}
          title={STRINGS.editModal.save}
          backgroundColor={COLORS.successButton}
        />
      </StyledModalContent>
    </StyledKeyboardAvoidingView>
  );
};

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.backgroundModal};
`;

const StyledScrollViewBody = styled.ScrollView`
  margin-vertical: ${SPACING.regular}px;
`;

const StyledModalContent = styled.View`
  width: ${Dimensions.get('window').width * 0.8}px;
  height: ${Dimensions.get('window').width * 1.3}px;
  background-color: ${COLORS.secondary};
  padding-vertical: ${SPACING.smallPlus}px;
  padding-horizontal: ${SPACING.regular}px;
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
