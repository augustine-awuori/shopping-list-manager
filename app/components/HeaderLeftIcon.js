import React from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";

import colors from "../config/colors";

export default ({ name = "chevron-left", style }) => {
  const navigation = useNavigation();

  return (
    <Feather
      color={colors.accent}
      name={name}
      onPress={() => navigation.goBack()}
      size={35}
      style={style}
    />
  );
};
