import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
// import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import colors from "../../config/colors";
import AppText from "../Text";

export default function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  showChevron = true,
}) {
  return (
    // <Swipeable renderRightActions={renderRightActions}>
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          {subTitle && (
            <AppText style={styles.subtitle} numberOfLines={2}>
              {subTitle}
            </AppText>
          )}
        </View>
        {showChevron && (
          <Icon color={colors.medium} name="chevron-right" size={25} />
        )}
      </View>
    </TouchableHighlight>
    // </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    padding: 15,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});
