import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Picker, Platform } from 'react-native';
import styled from 'styled-components/native';

import Label from '#/components/Label';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';
import TYPOGRAPHY from '#/utils/typography';

const PickerStyled = props => {
  const { hasLabel, label, labelColor, dataList, updateState } = props;
  const { Item } = Picker;

  const [selectedValue, setSelectedValue] = useState(dataList[0].value);

  const handleChangeValue = value => {
    setSelectedValue(value);
    updateState(value);
  };

  return (
    <>
      {hasLabel && (
        <Label
          content={label}
          typography={TYPOGRAPHY.defaultLabel}
          marginTop={SPACING.smallPlus}
          marginBottom={SPACING.smallPlus}
          color={labelColor}
        />
      )}
      <StyledInputView>
        <Picker
          mode='dropdown'
          selectedValue={selectedValue}
          onValueChange={itemValue => handleChangeValue(itemValue)}
          itemStyle={{ fontSize: 18 }}
        >
          {dataList.map(({ label: optionTitle, value, id }) => (
            <Item
              key={id}
              label={optionTitle}
              value={value}
              color={
                value === selectedValue ? COLORS.primary : COLORS.defaultGray
              }
            />
          ))}
        </Picker>
      </StyledInputView>
    </>
  );
};

const StyledInputView = styled.View`
  background-color: ${COLORS.secondary};
  border-radius: 7px;
  border-width: ${Platform.select({
    ios: 0.5,
    android: 1.5
  })}px;
  border-color: ${COLORS.defaultGray};
`;

PickerStyled.defaultProps = {
  hasLabel: false,
  label: '',
  labelColor: COLORS.defaultGray
};

PickerStyled.propTypes = {
  hasLabel: PropTypes.bool,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      id: PropTypes.number
    })
  ).isRequired,
  updateState: PropTypes.func.isRequired
};

export default PickerStyled;
