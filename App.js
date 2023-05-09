import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app/navigation/AppNavigator";
import theme from "./app/navigation/navigationTheme";

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <AppNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
