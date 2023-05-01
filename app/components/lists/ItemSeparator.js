import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";

export default () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    borderColor: colors.light,
    borderWidth: 0.7,
    width: "100%",
  },
});
