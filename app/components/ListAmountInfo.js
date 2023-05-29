import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/Feather";

import BlockButton from "../components/BlockButton";
import colors from "../config/colors";
import OutlineButton from "../components/BlockOutlineButton";
import Text from "./Text";

export default ({ amount, checkedAmount, isShopping, list, onPress }) => {
  const { budget, items } = list;

  const itemsCount = items.length;

  const budgetRemainder = budget - amount;

  const budgetTextStyle = {
    color: budgetRemainder > 0 ? colors.success : colors.danger,
  };

  const Btn = isShopping ? OutlineButton : BlockButton;

  return itemsCount ? (
    <>
      <View style={styles.textContainer}>
        <Text style={styles.amountText}>Total = {amount}</Text>
        {budget ? (
          <Text style={budgetTextStyle}>Budget = {budget - amount}</Text>
        ) : null}
        {isShopping && checkedAmount ? (
          <View style={styles.tickedContainer}>
            <Icon
              color={colors.primary}
              name="check-circle"
              size={20}
              style={styles.icon}
            />
            <Text style={styles.amountText}>Ticked = {checkedAmount}</Text>
          </View>
        ) : null}
      </View>
      <Btn
        onPress={onPress}
        style={styles.button}
        title={isShopping ? "Finish Shopping" : "Start Shopping"}
      />
    </>
  ) : null;
};

const styles = StyleSheet.create({
  amountText: {
    color: colors.primary,
    textAlign: "center",
  },
  button: {
    marginTop: 40,
  },
  container: {},
  icon: {
    marginRight: 7,
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
});
