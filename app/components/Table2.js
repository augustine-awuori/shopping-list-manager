import React from "react";
import { DataTable } from "react-native-paper";
import Icon from "@expo/vector-icons/Feather";

import colors from "../config/colors";

export default ({
  data = [],
  isShopping,
  onItemPress,
  onItemLongPress,
  style,
  titles = [],
}) => (
  <DataTable style={style}>
    <DataTable.Header>
      {titles.map((title, index) => (
        <DataTable.Title key={index}>{title}</DataTable.Title>
      ))}
    </DataTable.Header>
    {data.map((item, index) => (
      <DataTable.Row
        onPress={() => onItemPress(item, index)}
        onLongPress={() => onItemLongPress(item, index)}
      >
        <DataTable.Cell>{item.name}</DataTable.Cell>
        <DataTable.Cell>{item.unitPrice}</DataTable.Cell>
        <DataTable.Cell>{item.quantity}</DataTable.Cell>
        <DataTable.Cell>{item.unitPrice * item.quantity}</DataTable.Cell>
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
    ))}
  </DataTable>
);
