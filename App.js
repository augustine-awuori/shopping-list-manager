import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import ListItemEditScreen from "./app/screens/ListItemEditScreen";

export default function App() {
  return (
    <>
      <ListItemEditScreen />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({});
