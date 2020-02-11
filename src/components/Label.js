import React from "react";
import styled from "styled-components/native";

const Label = props => {
  const { content, typography, textAlign = "left" } = props;
  return (
    <StyledText {...props} typography={typography} textAlign={textAlign}>
      {content}
    </StyledText>
  );
};

const StyledText = styled.Text`
  font-size: ${({ typography: { size } }) => size};
  font-weight: ${({ typography: { weight } }) => weight};
  text-align: ${({ textAlign }) => textAlign};
  margin-top: 20px;
`;

export default Label;
