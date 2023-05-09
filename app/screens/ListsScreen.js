import React from "react";
import { FlatList, StyleSheet } from "react-native";

import FloatingButton from "../components/FloatingButton";
import ItemSeparator from "../components/lists/ItemSeparator";
import ListItem from "../components/lists/ListItem";
import routes from "../navigation/routes";
import Text from "../components/Text";

export default ({
  navigation,
  lists = [
    { title: "BAck to Sch", shoppingCentre: "Kisii Matt" },
    { title: "NAkumatt", shoppingCentre: "Shivling" },
  ],
}) => {
  const Empty = () => (
    <Text style={styles.text}>You haven't created any shopping list yet!</Text>
  );

  return (
    <>
      <FlatList
        data={lists}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={Empty}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.shoppingCentre}
            onPress={() => navigation.navigate(routes.LIST, item)}
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
  text: {
    marginTop: 20,
    textAlign: "center",
  },
});
