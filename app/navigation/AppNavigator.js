import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HeaderLeftIcon from "../components/HeaderLeftIcon";
import ListEditScreen from "../screens/ListEditScreen";
import ListItemEditScreen from "../screens/ListItemEditScreen";
import ListScreen from "../screens/ListScreen";
import ListsScreen from "../screens/ListsScreen";
import routes from "./routes";

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_right",
      headerTitleAlign: "center",
      headerLeft: () => <HeaderLeftIcon />,
    }}
  >
    <Stack.Screen
      component={ListsScreen}
      name={routes.LISTS}
      options={{ title: "Shopping Lists", headerLeft: () => null }}
    />
    <Stack.Screen
      component={ListScreen}
      name={routes.LIST}
      options={({ route }) => ({ title: route.params.title })}
    />
    <Stack.Screen
      component={ListEditScreen}
      name={routes.LIST_EDIT}
      options={{
        animation: "slide_from_bottom",
        title: "New Shopping List",
      }}
    />
    <Stack.Screen
      component={ListItemEditScreen}
      name={routes.LIST_ITEM_EDIT}
      options={{ animation: "slide_from_bottom", title: "List Item Edit" }}
    />
  </Stack.Navigator>
);
