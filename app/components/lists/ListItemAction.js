import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";

import colors from "../../config/colors";

function ListItemAction({ name = "trash-can", onPress, style }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <Icons name={name} size={35} color={colors.white} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.danger,
    justifyContent: "center",
    width: 70,
  },
});

export default ListItemAction;
