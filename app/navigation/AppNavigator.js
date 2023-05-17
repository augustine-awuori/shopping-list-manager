import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HeaderLeftIcon from "../components/HeaderLeftIcon";
import ListsContext from "../context/ShoppingListsContext";
import ListDetailsScreen from "../screens/ListDetailsScreen";
import ListEditScreen from "../screens/ListEditScreen";
import ListItemEditScreen from "../screens/ListItemEditScreen";
import ListsScreen from "../screens/ListsScreen";
import routes from "./routes";

const Stack = createNativeStackNavigator();

export default () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [shoppingList, setShoppingList] = useState();

  const value = {
    setShoppingList,
    setShoppingLists,
    shoppingList,
    shoppingLists,
  };

  return (
    <ListsContext.Provider value={value}>
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
          options={{ title: "My Shopping Lists", headerLeft: () => null }}
        />
        <Stack.Screen
          component={ListDetailsScreen}
          name={routes.LIST_DETAILS}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          component={ListEditScreen}
          name={routes.LIST_EDIT}
          options={{
            animation: "slide_from_bottom",
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ListItemEditScreen}
          name={routes.LIST_ITEM_EDIT}
          options={{
            animation: "slide_from_bottom",
            title: "List Item Edit",
          }}
        />
      </Stack.Navigator>
    </ListsContext.Provider>
  );
};
