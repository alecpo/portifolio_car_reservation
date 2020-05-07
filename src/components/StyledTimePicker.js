import React, { useState } from 'react';
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

const StyledTimePicker = ({
  testID,
  hasLabel,
  label,
  labelAlign,
  formikValue,
  formikHandleChange
}) => {
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);
  const [time, setTime] = useState(
    formikValue ? moment(formikValue).toDate() : moment()
  );
  const [color, setColor] = useState(COLORS.defaultGray);

  const navigation = useNavigation();

  const onChange = (event, newHour) => {
    setTime(newHour);

    const formatedTime = moment(newHour)
      .parseZone()
      .format('YYYY-MM-DD HH:mm');

    formikHandleChange(formatedTime);

    if (Platform.OS !== 'ios') setTimePickerOpen(false);

    setColor(COLORS.defaultGray);
  };

  const openTimePicker = () => {
    setColor(COLORS.primary);

    if (Platform.OS === 'ios') {
      navigation.navigate('OnlineModals', {
        screen: 'DatePickerModal',
        params: {
          IOSDateTimePicker: () => (
            <DateTimePicker
              testID={testID}
              value={time}
              locale='pt-br'
              onChange={onChange}
              mode='time'
            />
          )
        }
      });
    } else {
      setTimePickerOpen(true);
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
      <StyledInputView onPress={openTimePicker}>
        <Label
          textAlign='center'
          content={moment(time)
            .locale('pt-br')
            .format('HH:mm')}
        />
      </StyledInputView>

      {isTimePickerOpen && Platform.OS !== 'ios' && (
        <DateTimePicker
          value={time}
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

StyledTimePicker.defaultProps = {
  hasLabel: false,
  label: '',
  testID: '',
  labelAlign: 'left'
};

StyledTimePicker.propTypes = {
  hasLabel: PropTypes.bool,
  label: PropTypes.string,
  testID: PropTypes.string,
  labelAlign: PropTypes.string,
  formikValue: PropTypes.string.isRequired,
  formikHandleChange: PropTypes.func.isRequired
};

export default StyledTimePicker;
