import React from "react";
import { Text } from "react-native";

import defaultStyles from "../config/styles";

export default ({ children, style, ...otherProps }) =>
  children ? (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  ) : null;
