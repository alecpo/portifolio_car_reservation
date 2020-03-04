import React, { useState } from 'react';
import { Picker } from 'react-native';
import styled from 'styled-components/native/';

import Label from '~/components/Label';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

const StyledPicker = props => {
  const {
    hasLabel,
    label,
    labelColor,
    dataList,
    updateState = () => {},
    marginLeft = '0px',
    marginRight = '0px',
    marginTop = SPACING.regularPlus,
    marginBottom = '0px'
  } = props;
  const { Item } = Picker;

  const [originSelected, setOriginSelected] = useState();

  const handleChangeValue = value => {
    setOriginSelected(value);
    updateState('selectedOrigin', value);
  };

  return (
    <StyledView
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      {hasLabel && (
        <Label
          content={label}
          textAlign='center'
          marginBottom={SPACING.small}
          color={labelColor}
        />
      )}
      <StyledInputView>
        <Picker
          {...props}
          mode={'dropdown'}
          selectedValue={originSelected}
          onValueChange={(itemValue, itemIndex) => handleChangeValue(itemValue)}
        >
          {dataList.map(({ label, value, id }) => (
            <Item key={id} label={label} value={value} />
          ))}
        </Picker>
      </StyledInputView>
    </StyledView>
  );
};

const StyledView = styled.View`
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;

const StyledInputView = styled.View`
  background-color: ${COLORS.secondary};
  border-radius: 5px;
`;

export default StyledPicker;