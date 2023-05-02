import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/Feather";

import defaultStyles from "../../config/styles";

export default ({
  icon,
  icon2,
  onIcon2Press,
  showIcon2,
  style,
  width = "100%",
  ...otherProps
}) => (
  <View style={[styles.container, { width }]}>
    {icon && (
      <Icon
        name={icon}
        size={20}
        color={defaultStyles.colors.medium}
        style={styles.icon}
      />
    )}
    <TextInput
      numberOfLines={1}
      placeholderTextColor={defaultStyles.colors.medium}
      style={[styles.textInput, defaultStyles.text, style]}
      {...otherProps}
    />
    {icon2 && showIcon2 ? (
      <Pressable onPress={onIcon2Press}>
        <Icon name={icon2} size={26} color={defaultStyles.colors.medium} />
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 30,
    flexDirection: "row",
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: "body",
  },
});
