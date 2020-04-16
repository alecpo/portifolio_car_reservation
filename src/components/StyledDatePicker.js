import React, { useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native/';

import Label from '#/components/Label';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';

const StyledDatePicker = ({
  testID,
  hasLabel,
  label,
  formikValue,
  formikHandleChange
}) => {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [value, setValue] = useState(
    formikValue ? moment(formikValue).toDate() : new Date()
  );
  const [color, setColor] = useState(COLORS.defaultGray);

  const navigation = useNavigation();

  const onChange = (event, date) => {
    setValue(date);

    const formatedDate = moment(date)
      .parseZone()
      .format('YYYY-MM-DD');

    formikHandleChange(formatedDate);

    if (Platform.OS !== 'ios') setDatePickerOpen(false);

    setColor(COLORS.defaultGray);
  };

  const openDatePicker = () => {
    setColor(COLORS.primary);

    if (Platform.OS === 'ios') {
      navigation.navigate('DatePickerModal', {
        IOSDateTimePicker: () => (
          <DateTimePicker
            testID={testID}
            value={value}
            onChange={onChange}
            locale='pt-br'
            timeZoneOffsetInMinutes={0}
            is24Hour
            display='default'
          />
        )
      });
    } else {
      setDatePickerOpen(true);
    }
  };

  return (
    <>
      {hasLabel && (
        <Label
          content={label}
          color={color}
          marginTop={SPACING.smallPlus}
          marginBottom={SPACING.smallPlus}
        />
      )}
      <StyledInputView onPress={openDatePicker}>
        <Label
          textAlign='center'
          content={moment(value)
            .locale('pt-br')
            .format('ll')}
        />
      </StyledInputView>

      {isDatePickerOpen && Platform.OS !== 'ios' && (
        <DateTimePicker
          testID={testID}
          value={value}
          onChange={onChange}
          is24Hour
          display='default'
        />
      )}
    </>
  );
};

const StyledInputView = styled.TouchableOpacity`
  background-color: ${COLORS.secondary};
  border-radius: 7px;
  border-width: ${Platform.select({
    ios: 0.5,
    android: 1.5
  })}px;
  border-color: ${COLORS.defaultGray};
  padding: ${SPACING.small}px;
`;

StyledDatePicker.defaultProps = {
  hasLabel: false,
  label: '',
  testID: ''
};

StyledDatePicker.propTypes = {
  hasLabel: PropTypes.bool,
  label: PropTypes.string,
  testID: PropTypes.string,
  formikValue: PropTypes.string.isRequired,
  formikHandleChange: PropTypes.func.isRequired
};

export default StyledDatePicker;
