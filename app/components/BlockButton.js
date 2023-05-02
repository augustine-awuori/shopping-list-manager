import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import defaultStyles from "../config/styles";
import Text from "./Text";

export default ({ onPress, style, title, titleStyle }) => (
  <TouchableOpacity onPress={onPress} style={[defaultStyles.button, style]}>
    <Text style={[styles.title, titleStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  title: {
    color: defaultStyles.colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});
