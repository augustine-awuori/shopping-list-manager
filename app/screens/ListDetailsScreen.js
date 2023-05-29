import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ListItemAction } from "../components/lists";
import AmountInfo from "../components/ListAmountInfo";
import colors from "../config/colors";
import FloatingButton from "../components/FloatingButton";
import ProgressBar from "../components/ProgressBar";
import routes from "../navigation/routes";
import Table from "../components/Table";
import useAlert from "../hooks/useAlert";
import useShoppingListItems from "../hooks/useShoppingListItems";
import useShoppingLists from "../hooks/useShoppingLists";

const tableHeaders = ["Title", "Unit Price", "Quantity", "Sum"];

export default ({ navigation }) => {
  const [amount, setAmount] = useState(0);
  const [checkedAmount, setCheckedAmount] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);
  const [isShopping, setIsShopping] = useState();
  const { alert } = useAlert();
  const listItems = useShoppingListItems();
  const { shoppingList } = useShoppingLists();

  const { items, id: listId, title, lastUpdate } = shoppingList;
  const itemsCount = items.length;
  const params = { title, listId };

  useEffect(() => {
    initAmount();
  }, [lastUpdate]);

  const initAmount = () => {
    let amount = 0;

    items.forEach(({ quantity, unitPrice }) => {
      if (unitPrice) amount += quantity * unitPrice;
    });

    setAmount(amount);
  };

  const handleItemPress = (item, index) => {
    if (!isShopping)
      return navigation.navigate(routes.LIST_ITEM_EDIT, { item, ...params });

    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;

    listItems.save(newItems);
    updateCheckedAmount(item);
  };

  const deleteItem = (item) => {
    listItems.save([...items].filter(({ name }) => name !== item.name));
    listItems.remove(item, listId);

    if (item.checked) {
      setCheckedAmount(amount - item.quantity * item.unitPrice);
      setCheckedCount(checkedCount - 1);
    }
  };

  const handleItemDelete = (item) =>
    alert(
      "List Item Deletion",
      `Are you sure you want to permanently remove "${item.name.toLowerCase()} " from your list?`,
      "I'm sure",
      () => deleteItem(item),
      "Cancel"
    );

  const handleItemEdit = (item) =>
    navigation.navigate(routes.LIST_ITEM_EDIT, { item, ...params });

  const updateCheckedAmount = ({ checked, unitPrice, quantity }) => {
    let amount = checkedAmount;
    const total = quantity * unitPrice;

    setCheckedAmount(checked ? amount + total : amount - total);
    setCheckedCount(checked ? checkedCount + 1 : checkedCount - 1);
  };

  const handlePress = () => {
    setIsShopping(!isShopping);

    if (isShopping) navigation.navigate(routes.LISTS);
  };

  const getProgress = () => {
    const progress = checkedCount / itemsCount;

    return checkedCount && itemsCount ? progress : 0;
  };

  const ItemAction = ({ ...props }) => (
    <ListItemAction iconSize={30} style={styles.itemAction} {...props} />
  );

  const renderLeftActions = (item) => (
    <ItemAction
      name="pencil"
      onPress={() => handleItemEdit(item)}
      style={styles.itemEditIcon}
    />
  );

  const renderRightActions = (item) => (
    <ItemAction onPress={() => handleItemDelete(item)} />
  );

  const handleNewItemEdit = () =>
    navigation.navigate(routes.LIST_ITEM_EDIT, shoppingList);

  return (
    <>
      <ProgressBar
        progress={getProgress()}
        style={styles.progressBar}
        visible={checkedAmount && isShopping}
      />
      <View style={styles.container}>
        <Table
          data={items}
          isShopping={isShopping}
          onItemLongPress={handleItemDelete}
          onItemPress={handleItemPress}
          renderLeftActions={renderLeftActions}
          renderRightActions={renderRightActions}
          style={styles.table}
          titles={tableHeaders}
        />
        <AmountInfo
          amount={amount}
          checkedAmount={checkedAmount}
          isShopping={isShopping}
          onPress={handlePress}
          list={shoppingList}
        />
        <FloatingButton onPress={handleNewItemEdit} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemAction: {
    width: 60,
  },
  itemEditIcon: {
    backgroundColor: colors.primary,
  },
  progressBar: {
    marginBottom: 5,
  },
  table: {
    marginBottom: 20,
  },
  title: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: "center",
  },
});
