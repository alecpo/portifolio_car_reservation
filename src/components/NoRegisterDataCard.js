import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Label from '~/components/Label';
import SubmitButton from '~/components/SubmitButton';
import Icon from '~/components/Icon';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import TYPOGRAPHY from '~/utils/typography';

import { onGetReservations } from '~/store/actions/reservationsHistoryActions';

const NoRegisterDataCard = ({
  desc,
  onSubmit,
  iconFamily,
  iconName,
  labelButton
}) => {
  const { userToken } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (userToken) dispatch(onGetReservations());
  }, [dispatch, userToken]);

  return (
    <StyledAddCardView>
      <Label
        textAlign='center'
        typography={TYPOGRAPHY.mediumLabelBold}
        content={desc}
        color={COLORS.darkGray}
        marginBottom={SPACING.smallPlus}
      />
      <Icon
        iconFamily={iconFamily}
        iconName={iconName}
        size={60}
        color={COLORS.darkGray}
        marginTop={SPACING.smallPlus}
        marginBottom={SPACING.smallPlus}
      />
      <SubmitButton
        submit={onSubmit}
        title={labelButton}
        backgroundColor={COLORS.successButton}
        marginVertical={SPACING.smallPlus}
      />
    </StyledAddCardView>
  );
};

const StyledAddCardView = styled.View`
  justify-content: center;
  padding-horizontal: ${SPACING.big}px;
  padding-top: ${SPACING.smallPlus}px;
  padding-bottom: ${SPACING.verySmall}px;
  align-items: center;
  border-radius: 7px;
  background-color: ${COLORS.secondary};
  elevation: 5;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
`;

NoRegisterDataCard.propTypes = PropTypes.shape({
  onSubmit: PropTypes.func,
  desc: PropTypes.string,
  iconFamily: PropTypes.string,
  iconName: PropTypes.strings
}).isRequired;

export default NoRegisterDataCard;
