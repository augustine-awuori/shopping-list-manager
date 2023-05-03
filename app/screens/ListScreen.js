import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/Feather";

import BlockButton from "../components/BlockButton";
import colors from "../config/colors";
import FloatingButton from "../components/FloatingButton";
import OutlineButton from "../components/BlockOutlineButton";
import Screen from "../components/Screen";
import Table from "../components/Table2";
import Text from "../components/Text";
import useAlert from "../hooks/useAlert";

const titles = ["Name", "Unit Price", "Quantity", "Sum", ""];

const x = [
  { name: "Shoe Polish", unitPrice: 120, quantity: 3, checked: false },
  { name: "Text Books", unitPrice: 2000, quantity: 2 },
  { name: "Ruler", unitPrice: 20, quantity: 20 },
];

export default () => {
  const [amount, setAmount] = useState(0);
  const [checkedAmount, setCheckedAmount] = useState(0);
  const [isShopping, setIsShopping] = useState();
  const [data, setData] = useState(x);
  const { alert } = useAlert();

  const itemsCount = data.length;

  useEffect(() => {
    initAmount();
  }, [itemsCount]);

  const initAmount = () => {
    let amount = 0;

    data.forEach(({ quantity, unitPrice }) => (amount += quantity * unitPrice));

    setAmount(amount);
  };

  const handleItemPress = (item, index) => {
    if (!isShopping) {
      console.log("Navigate to the list item edit screen");
      return;
    }

    const items = [...data];
    items[index].checked = !items[index].checked;

    setData(items);
    updateCheckedAmount(item);
  };

  const addItem = () => {
    console.log("Add item to this list. Navigate to list item edit screen");
  };

  const deleteItem = (listItem, itemIndex) => {
    setData([...data].filter((item, index) => index !== itemIndex));
    updateCheckedAmount({ listItem });
  };

  const handleItemDelete = (item, index) =>
    alert(
      "List Item Deletion",
      `Are you sure you want to permanently remove "${item.name.toLowerCase()} " from your list?`,
      "I'm sure",
      () => deleteItem(item, index),
      "Cancel"
    );

  const updateCheckedAmount = ({ checked, unitPrice, quantity }) => {
    let amount = checkedAmount;
    const total = quantity * unitPrice;

    setCheckedAmount(checked ? amount + total : amount - total);
  };

  const handlePress = () => {
    setIsShopping(!isShopping);

    if (!isShopping) {
      console.log("Navigate to the lists screen.");
    }
  };

  const Btn = isShopping ? OutlineButton : BlockButton;

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Back To Sch List</Text>
        <Table
          data={data}
          isShopping={isShopping}
          onItemLongPress={handleItemDelete}
          onItemPress={handleItemPress}
          style={styles.table}
          titles={titles}
        />
        {data.length ? (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.amountText}>Total = {amount}</Text>
              {isShopping && (
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
              )}
            </View>
            <Btn
              onPress={handlePress}
              style={styles.button}
              title={isShopping ? "Finish Shopping" : "Start Shopping"}
            />
          </>
        ) : null}
        <FloatingButton visible onPress={addItem} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  amountText: {
    color: colors.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 40,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 7,
    bottom: 5,
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
