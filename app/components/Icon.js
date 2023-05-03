import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";

import colors from "../config/colors";

export default ({ backgroundColor, icon, onPress, size = 45, style }) => (
  <View>
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            borderRadius: size * 0.5,
            height: size,
            width: size,
          },
          style,
        ]}
      >
        <Icons name={icon} color={colors.white} size={size * 0.5} />
      </View>
    </TouchableWithoutFeedback>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 21,
    marginHorizontal: 4,
    justifyContent: "center",
  },
});
