import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

export default function Button({ onPress, title }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[defaultStyles.button, styles.button]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultStyles.colors.white,
    borderColor: defaultStyles.colors.primary,
    borderWidth: 1.5,
  },
  title: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "bold",
  },
});
