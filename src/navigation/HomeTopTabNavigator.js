import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useFormik } from 'formik';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import 'moment/locale/pt-br';
import moment from 'moment';

import MapScreen from '#/screens/MapScreen';
import PromotionsScreen from '#/screens/PromotionsScreen';

import StyledDatePicker from '#/components/StyledDatePicker';
import StyledTimePicker from '#/components/StyledTimePicker';
import NextStepButton from '#/components/NextStepButton';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';

const HomeTopTabNavigator = ({ navigation }) => {
  const { Navigator, Screen } = createMaterialTopTabNavigator();
  const [beginDate, setBeginDate] = useState(
    moment()
      .locale('pt-br')
      .format('YYYY-MM-DD')
  );
  const [beginTime, setBeginTime] = useState(
    moment()
      .locale('pt-br')
      .format('YYYY-MM-DD HH:mm')
  );

  const initialValues = {
    begin_date: '',
    end_date: '',
    promotion_id: '',
    promotion_type: ''
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {}
  });

  useEffect(() => {
    const formatedTime = moment(beginTime)
      .locale('pt-br')
      .format('HH:mm');
    formik.setFieldValue(
      'begin_date',
      moment(`${beginDate} ${formatedTime}`).format()
    );
  }, [beginDate, beginTime]);

  useEffect(() => console.log(formik.values), [formik.values]);

  return (
    <StyledContainer>
      <Navigator
        tabBarOptions={{
          activeTintColor: COLORS.primary,
          inactiveTintColor: COLORS.defaultGray,
          labelStyle: { fontWeight: 'bold' },
          indicatorStyle: { backgroundColor: COLORS.primary }
        }}
        lazy
      >
        <Screen
          name='Promotions'
          component={PromotionsScreen}
          options={{ tabBarLabel: 'PROMOÇÕES' }}
        />
        <Screen
          name='Map'
          component={MapScreen}
          options={{ tabBarLabel: 'MAPA' }}
        />
      </Navigator>
      <StyledInputView>
        <StyledPickersRow>
          <StyledDatePicker
            formikValue={beginDate}
            formikHandleChange={setBeginDate}
          />
          <StyledTimePicker
            formikValue={beginTime}
            formikHandleChange={setBeginTime}
          />
        </StyledPickersRow>
      </StyledInputView>
      <NextStepButton
        label='FAZER CHECKIN'
        onSubmit={() => navigation.navigate('SelectCar')}
        isDisabled={false}
        activeColor={COLORS.successButton}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.secondary};
`;

const StyledInputView = styled.View`
  padding-horizontal: ${SPACING.smallPlus}px;
  padding-top: ${SPACING.smallPlus}px;
`;

const StyledPickersRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${SPACING.smallPlus}px;
`;

export default HomeTopTabNavigator;
