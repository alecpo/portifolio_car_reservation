import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-native-collapsible';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Label from '~/components/Label';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

const StyledCollapsible = ({ title, content }) => {
  const [isCollapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <StyledContainer collapsed={isCollapsed}>
      <StyledHeader onPress={toggleExpanded} activeOpacity={1}>
        <StyledLabelView>
          <Label
            content={title}
            color={isCollapsed ? COLORS.darkGray : COLORS.primary}
          />
        </StyledLabelView>
        <Icon
          name={isCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
          size={20}
          color={isCollapsed ? COLORS.darkGray : COLORS.primary}
        />
      </StyledHeader>
      <Collapsible collapsed={isCollapsed}>
        <StyledContent>
          <Label
            content={content}
            color={isCollapsed ? COLORS.darkGray : COLORS.primary}
          />
        </StyledContent>
      </Collapsible>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  border-width: 0.5px;
  border-color: ${({ collapsed }) =>
    collapsed ? COLORS.regularGray : COLORS.primary};
`;

const StyledHeader = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.secondary};
  padding: ${SPACING.regular}px;
`;

const StyledContent = styled.View`
  padding: ${SPACING.regular}px;
  background-color: ${COLORS.secondary};
`;

const StyledLabelView = styled.View`
  width: 80%;
`;

StyledCollapsible.propTypes = PropTypes.shape({
  title: PropTypes.string,
  content: PropTypes.string
}).isRequired;

export default StyledCollapsible;
