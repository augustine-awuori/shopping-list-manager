import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import Text from "./Text";

export default ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Icon
      backgroundColor={item.backgroundColor}
      icon={item.icon}
      onPress={onPress}
      size={80}
    />
    <Text style={styles.label}>{item.label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: "33%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});
