import React from "react";
import { DataTable } from "react-native-paper";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/Feather";

import colors from "../config/colors";

export default ({
  data = [],
  isShopping,
  onItemLongPress,
  onItemPress,
  renderLeftActions,
  renderRightActions,
  style,
  titles = [],
}) => {
  const tableTitles = isShopping ? [...titles, ""] : titles;

  const getSum = ({ quantity, unitPrice }) =>
    unitPrice ? unitPrice * quantity : "";

  return (
    <DataTable style={style}>
      <DataTable.Header>
        {tableTitles.map((title, index) => (
          <DataTable.Title key={index}>{title}</DataTable.Title>
        ))}
      </DataTable.Header>
      {data.map((item, index) => (
        <GestureHandlerRootView key={index}>
          <Swipeable
            renderLeftActions={() => renderLeftActions(item)}
            renderRightActions={() => renderRightActions(item)}
          >
            <DataTable.Row
              key={index}
              onPress={() => onItemPress(item, index)}
              onLongPress={() => onItemLongPress(item, index)}
            >
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.unitPrice}</DataTable.Cell>
              <DataTable.Cell>{item.quantity}</DataTable.Cell>
              <DataTable.Cell>{getSum(item)}</DataTable.Cell>
              {isShopping && (
                <DataTable.Cell>
                  <Icon
                    color={item.checked ? colors.primary : colors.light}
                    name="check-circle"
                    size={20}
                  />
                </DataTable.Cell>
              )}
            </DataTable.Row>
          </Swipeable>
        </GestureHandlerRootView>
      ))}
    </DataTable>
  );
};
