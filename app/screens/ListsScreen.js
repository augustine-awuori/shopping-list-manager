import React from "react";
import { FlatList, StyleSheet } from "react-native";

import FloatingButton from "../components/FloatingButton";
import ItemSeparator from "../components/lists/ItemSeparator";
import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import Text from "../components/Text";

export default ({
  lists = [
    { title: "BAck to Sch", shoppingCentre: "Kisii Matt" },
    { title: "NAkumatt", shoppingCentre: "Shivling" },
  ],
}) => {
  const Empty = () => (
    <Text style={styles.text}>You haven't created any shopping list yet!</Text>
  );

  return (
    <Screen>
      <FlatList
        data={lists}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={Empty}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.shoppingCentre}
            onPress={() => console.log("Navigate to list screen", item)}
          />
        )}
      />
      <FloatingButton
        onPress={() => console.log("Navigate to Create New List Screen")}
        width={65}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    marginTop: 20,
    textAlign: "center",
  },
});
