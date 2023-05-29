import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { ListItem, ListItemAction } from "../components/lists";
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/FloatingButton";
import colors from "../config/colors";
import ItemSeparator from "../components/lists/ItemSeparator";
import routes from "../navigation/routes";
import Text from "../components/Text";
import useShoppingLists from "../hooks/useShoppingLists";

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const shoppingLists = useShoppingLists();

  const handleRefresh = () => {
    setRefreshing(true);
    shoppingLists.init();
    setRefreshing(false);
  };

  const Empty = () => (
    <Text style={styles.text}>You haven't created any shopping list yet!</Text>
  );

  const rightAction = (list) => (
    <ListItemAction onPress={() => shoppingLists.remove(list)} />
  );

  const leftAction = (item) => (
    <ListItemAction
      name="pencil"
      onPress={() => navigation.navigate(routes.LIST_EDIT, item)}
      style={styles.leftActionItem}
    />
  );

  const viewDetails = (list) => {
    shoppingLists.setShoppingList(list);
    navigation.navigate(routes.LIST_DETAILS, list);
  };

  return (
    <>
      <ActivityIndicator visible={refreshing} />
      <FlatList
        data={shoppingLists.data}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={Empty}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => viewDetails(item)}
            renderLeftActions={() => leftAction(item)}
            renderRightActions={() => rightAction(item)}
            subTitle={item.shoppingCentre}
            title={item.title}
          />
        )}
      />
      <Button
        onPress={() => navigation.navigate(routes.LIST_EDIT)}
        width={65}
      />
    </>
  );
};

const styles = StyleSheet.create({
  leftActionItem: {
    backgroundColor: colors.primary,
  },
  text: {
    marginTop: 20,
    textAlign: "center",
  },
});
