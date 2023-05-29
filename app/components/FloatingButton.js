import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import colors from "../config/colors";

export default ({
  icon = "plus",
  onPress,
  style,
  visible = true,
  width = 60,
}) => {
  if (!visible) return null;

  const buttonStyle = [
    styles.button,
    style,
    { width, height: width, borderRadius: width * 0.5 },
  ];

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={buttonStyle}>
        <Icon name={icon} color={colors.white} size={width * 0.5} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    bottom: 40,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    zIndex: 1,
  },
});
