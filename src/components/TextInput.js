import React from "react";
import styled from "styled-components/native";

import COLORS from "../utils/colors";

const TextInput = props => <StyledTextInput {...props} />;

const StyledTextInput = styled.TextInput`
  border-radius: 8px;
  font-size: 16px;
  margin-top: 20px;
  padding-left: 15px;
  background-color: ${COLORS.secondary};
  border-width: 1px;
  border-color: ${COLORS.textInputBorderColorDefault};
`;

export default TextInput;
