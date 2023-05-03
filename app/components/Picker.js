import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import defaultStyles from "../config/styles";
// import Modal from "./Modal";
import Text from "./Text";
import PickerItem from "./PickerItem";
import colors from "../config/colors";

export default ({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const switchModalVisibility = () => setModalVisible(!modalVisible);

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <Icon
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          <Text style={styles.text}>
            {selectedItem?.label ? selectedItem.label : placeholder}
          </Text>
          <Icon
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} hideVisibility={switchModalVisibility}>
        <TouchableWithoutFeedback onPress={switchModalVisibility}>
          <Text style={styles.closeIcon}>Close</Text>
        </TouchableWithoutFeedback>
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          numColumns={numberOfColumns}
          renderItem={({ item }) => (
            <PickerItemComponent
              item={item}
              onPress={() => {
                setModalVisible(false);
                onSelectItem(item);
              }}
            />
          )}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
  },
  closeIcon: {
    alignSelf: "center",
    color: defaultStyles.colors.primary,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
});
