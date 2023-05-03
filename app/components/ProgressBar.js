import React from "react";
import { ProgressBar } from "react-native-paper";

import colors from "../config/colors";

export default ({ progress, style, visible }) => (
  <ProgressBar
    color={colors.primary}
    progress={progress}
    style={style}
    visible={visible}
  />
);
