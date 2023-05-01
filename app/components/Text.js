import React from "react";
import { StyleSheet, Text } from "react-native";

export default ({ children, style, fontSize = 18, ...otherProps }) =>
  children ? (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  ) : null;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});
