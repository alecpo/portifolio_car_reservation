import React from 'react';
import styled from 'styled-components/native/';

const HomeScreen = () => (
  <StyledContainer>{/* <StyledHeader /> */}</StyledContainer>
);

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledHeader = styled.View`
  background-color: black;
  width: 100px;
  height: 100px;
`;

export default HomeScreen;
