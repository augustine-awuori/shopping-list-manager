import { Platform } from "react-native";

import colors from "./colors";

export default {
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 40,
    justifyContent: "center",
    padding: 20,
    marginVertical: 7,
    width: "100%",
  },
  colors,
  text: {
    color: colors.secondary,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 18,
  },
};
