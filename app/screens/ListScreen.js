import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/Feather";

import BlockButton from "../components/BlockButton";
import colors from "../config/colors";
import FloatingButton from "../components/FloatingButton";
import OutlineButton from "../components/BlockOutlineButton";
import Table from "../components/Table2";
import Text from "../components/Text";
import useAlert from "../hooks/useAlert";
import ProgressBar from "../components/ProgressBar";
import routes from "../navigation/routes";

const titles = ["Name", "Unit Price", "Quantity", "Sum", ""];

const x = [
  { name: "Shoe Polish", unitPrice: 120, quantity: 3, checked: false },
  { name: "Text Books", unitPrice: 2000, quantity: 2 },
  { name: "Ruler", unitPrice: 20, quantity: 20 },
];

export default ({ navigation }) => {
  const [amount, setAmount] = useState(0);
  const [checkedAmount, setCheckedAmount] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);
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
    if (!isShopping) return navigation.navigate(routes.LIST_EDIT);

    const items = [...data];
    items[index].checked = !items[index].checked;

    setData(items);
    updateCheckedAmount(item);
  };

  const addItem = () => {
    navigation.navigate(routes.LIST_ITEM_EDIT);
  };

  const deleteItem = (listItem, itemIndex) => {
    setData([...data].filter((item, index) => index !== itemIndex));

    if (listItem.checked) {
      setCheckedAmount(amount - listItem.quantity * listItem.unitPrice);
      setCheckedCount(checkedCount - 1);
    }
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
    setCheckedCount(checked ? checkedCount + 1 : checkedCount - 1);
  };

  const handlePress = () => {
    setIsShopping(!isShopping);

    if (isShopping) {
      navigation.navigate(routes.LISTS);
    }
  };

  const Btn = isShopping ? OutlineButton : BlockButton;

  return (
    <>
      <ProgressBar
        progress={checkedCount / itemsCount}
        style={styles.progressBar}
        visible={checkedAmount && isShopping}
      />
      <View style={styles.container}>
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
        <FloatingButton onPress={addItem} />
      </View>
    </>
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
    paddingHorizontal: 10,
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
