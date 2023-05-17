import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/Feather";

import BlockButton from "../components/BlockButton";
import colors from "../config/colors";
import FloatingButton from "../components/FloatingButton";
import OutlineButton from "../components/BlockOutlineButton";
import ProgressBar from "../components/ProgressBar";
import routes from "../navigation/routes";
import Table from "../components/Table";
import Text from "../components/Text";
import useAlert from "../hooks/useAlert";
import useShoppingListItems from "../hooks/useShoppingListItems";
import useShoppingLists from "../hooks/useShoppingLists";

export default ({ navigation }) => {
  const [amount, setAmount] = useState(0);
  const [checkedAmount, setCheckedAmount] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);
  const [isShopping, setIsShopping] = useState();
  const { alert } = useAlert();
  const listItems = useShoppingListItems();
  const { shoppingList: list, shoppingListItemsCount: itemsCount } =
    useShoppingLists();

  const budgetRemainder = list.budget - amount;

  const tableHeaders = ["Title", "Unit Price", "Quantity", "Sum", ""];

  const items = list?.items;

  useEffect(() => {
    initAmount();
  }, []);

  const initAmount = () => {
    let amount = 0;

    items.forEach(
      ({ quantity, unitPrice }) => (amount += quantity * unitPrice)
    );

    setAmount(amount);
  };

  const handleItemPress = (item, index) => {
    if (!isShopping)
      return navigation.navigate(routes.LIST_ITEM_EDIT, {
        item,
        listId: list.id,
      });

    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;

    listItems.save(newItems);
    updateCheckedAmount(item);
  };

  const deleteItem = (item) => {
    listItems.save([...items].filter(({ id }) => id !== item.id));
    listItems.remove(item, list.id);

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

  const updateCheckedAmount = ({ checked, unitPrice, quantity }) => {
    let amount = checkedAmount;
    const total = quantity * unitPrice;

    setCheckedAmount(checked ? amount + total : amount - total);
    setCheckedCount(checked ? checkedCount + 1 : checkedCount - 1);
  };

  const handlePress = () => {
    setIsShopping(!isShopping);

    if (isShopping) {
      navigation.navigate(routes.LISTS);
    }
  };

  const getProgress = () => {
    const progress = checkedCount / itemsCount;

    return checkedCount && itemsCount ? progress : 0;
  };

  const Btn = isShopping ? OutlineButton : BlockButton;

  const budgetTextStyle = {
    color: budgetRemainder > 0 ? colors.success : colors.danger,
  };

  return (
    <>
      <ProgressBar
        progress={getProgress()}
        style={styles.progressBar}
        visible={checkedAmount && isShopping}
      />
      <View style={styles.container}>
        <Table
          data={list.items}
          isShopping={isShopping}
          onItemLongPress={handleItemDelete}
          onItemPress={handleItemPress}
          style={styles.table}
          titles={tableHeaders}
        />
        {list?.items?.length ? (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.amountText}>Total = {amount}</Text>
              {list.budget ? (
                <Text style={budgetTextStyle}>
                  Budget = {list.budget - amount}
                </Text>
              ) : null}
              {isShopping && checkedAmount ? (
                <View style={styles.tickedContainer}>
                  <Icon
                    color={colors.primary}
                    name="check-circle"
                    size={20}
                    style={styles.icon}
                  />
                  <Text style={styles.amountText}>
                    Ticked = {checkedAmount}
                  </Text>
                </View>
              ) : null}
            </View>
            <Btn
              onPress={handlePress}
              style={styles.button}
              title={isShopping ? "Finish Shopping" : "Start Shopping"}
            />
          </>
        ) : null}
        <FloatingButton
          onPress={() => navigation.navigate(routes.LIST_ITEM_EDIT, list.id)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  amountText: {
    color: colors.primary,
    textAlign: "center",
  },
  button: {
    marginTop: 40,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 7,
  },
  progressBar: {
    marginBottom: 5,
  },
  table: {
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tickedContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
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
