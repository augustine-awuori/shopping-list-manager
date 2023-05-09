import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { ListItem, ListItemAction } from "../components/lists";
import FloatingButton from "../components/FloatingButton";
import ItemSeparator from "../components/lists/ItemSeparator";
import routes from "../navigation/routes";
import Text from "../components/Text";
import colors from "../config/colors";

const data = [
  { title: "BAck to Sch List", shoppingCentre: "Kisii Matt" },
  { title: "NAkumatt", shoppingCentre: "Shivling" },
];

export default ({ navigation }) => {
  const [lists, setLists] = useState(data);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (listIndex) =>
    setLists([...lists].filter((list, index) => index !== listIndex));

  const handleRefresh = () => {
    setRefreshing(true);
    setLists([...lists, { title: "New Mom", shoppingCentre: "Naivas" }]);
    setRefreshing(false);
  };

  const Empty = () => (
    <Text style={styles.text}>You haven't created any shopping list yet!</Text>
  );

  return (
    <>
      <FlatList
        data={lists}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={Empty}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item, index }) => (
          <ListItem
            title={item.title}
            subTitle={item.shoppingCentre}
            onPress={() => navigation.navigate(routes.LIST, item)}
            renderRightActions={() => (
              <ListItemAction onPress={() => handleDelete(index)} />
            )}
            renderLeftActions={() => (
              <ListItemAction
                onPress={() => navigation.navigate(routes.LIST_EDIT, item)}
                name="pencil"
                style={styles.leftActionItem}
              />
            )}
          />
        )}
      />
      <FloatingButton
        onPress={() => navigation.navigate(routes.LIST_EDIT)}
        width={65}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  leftActionItem: {
    backgroundColor: colors.primary,
  },
  text: {
    marginTop: 20,
    textAlign: "center",
  },
});
