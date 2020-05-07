import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';

import Label from '#/components/Label';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';

//const now = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

const StyledDateTimePicker = ({
  testID,
  hasLabel,
  label,
  formikValue,
  formikHandleChange,
  labelAlign
}) => {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);

  const [date, setDate] = useState(
    formikValue ? moment(formikValue).toDate() : moment()
  );
  const [time, setTime] = useState(
    formikValue ? moment(formikValue).toDate() : moment()
  );

  const [dateTime, setDateTime] = useState(moment());

  const [color, setColor] = useState(COLORS.defaultGray);

  const navigation = useNavigation();

  const onChangeDate = (event, value) => {
    setDate(value);

    if (Platform.OS !== 'ios') setDatePickerOpen(false);

    setColor(COLORS.defaultGray);
  };

  const onChangeTime = (event, value) => {
    setTime(value);

    /*  const formatedDate = moment(date).format('YYYY-MM-DD');
    const formatedTime = moment(value).format('HH:mm'); */

    if (Platform.OS !== 'ios') setDatePickerOpen(false);

    setColor(COLORS.defaultGray);
  };

  const openTimePicker = () => {
    console.log('data ao abrir modal de hora: ', date);
    if (Platform.OS === 'ios') {
      navigation.navigate('OnlineModals', {
        screen: 'DatePickerModal',
        params: {
          IOSDateTimePicker: () => (
            <DateTimePicker
              value={time}
              onChange={onChangeTime}
              mode='time'
              locale='pt-br'
            />
          ),
          onCloseModal: () =>
            console.log('data ao fechar modal de hora: ', date)
        }
      });
    } else {
      setTimePickerOpen(true);
    }
  };

  const openDatePicker = () => {
    if (Platform.OS === 'ios') {
      navigation.navigate('OnlineModals', {
        screen: 'DatePickerModal',
        params: {
          IOSDateTimePicker: () => (
            <DateTimePicker
              value={date}
              onChange={onChangeDate}
              locale='pt-br'
            />
          ),
          onCloseModal: openTimePicker
        }
      });
    } else {
      setDatePickerOpen(true);
    }
  };

  return (
    <>
      {hasLabel && (
        <Label
          textAlign={labelAlign}
          content={label}
          color={color}
          marginTop={SPACING.smallPlus}
          marginBottom={SPACING.smallPlus}
        />
      )}
      <StyledInputView onPress={openDatePicker}>
        <Label
          textAlign='center'
          content={dateTime.locale('pt-br').format('lll')}
        />
      </StyledInputView>

      {isDatePickerOpen && Platform.OS !== 'ios' && (
        <DateTimePicker
          testID={testID}
          value={date}
          onChange={onChangeDate}
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

StyledDateTimePicker.defaultProps = {
  hasLabel: false,
  label: '',
  testID: '',
  labelAlign: 'left'
};

StyledDateTimePicker.propTypes = {
  hasLabel: PropTypes.bool,
  label: PropTypes.string,
  testID: PropTypes.string,
  labelAlign: PropTypes.string,
  formikValue: PropTypes.string.isRequired,
  formikHandleChange: PropTypes.func.isRequired
};

export default StyledDateTimePicker;
