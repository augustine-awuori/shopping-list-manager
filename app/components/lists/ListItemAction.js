import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import colors from "../../config/colors";

function ListItemAction({ name = "trash-can", iconSize = 35, onPress, style }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <Icon name={name} size={iconSize} color={colors.white} />
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
