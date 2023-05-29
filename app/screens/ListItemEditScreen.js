import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import { Form, FormField, FormPicker, SubmitButton } from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import CategoryPicker from "../components/CategoryPickerItem";
import useShoppingListItems from "../hooks/useShoppingListItems";

const validationSchema = Yup.object().shape({
  category: Yup.object().nullable().label("Category"),
  name: Yup.string().min(3).max(50).required().label("Item Name"),
  price: Yup.number().min(1).max(10_000).label("Item Price"),
  quantity: Yup.number().min(1).max(1_000).label("Item Quantity"),
});

const categories = [
  {
    icon: "lamps",
    backgroundColor: "red",
    label: "Furniture",
  },
  {
    icon: "home",
    backgroundColor: "green",
    label: "Gadget",
  },
  {
    icon: "arrow-down",
    backgroundColor: "red",
    label: "Utilities",
  },
];

export default ({ navigation, route }) => {
  const { add: addItem, update: updateItem } = useShoppingListItems();
  const [loading, setLoading] = useState();

  const { item: editedItem, id, listId } = route.params;

  const initialValues = {
    category: editedItem?.category || null,
    name: editedItem?.name || "",
    unitPrice: editedItem?.unitPrice?.toString() || "",
    quantity: editedItem?.quantity?.toString() || "",
  };

  const mapId = (item) => ({ id: editedItem?.id, ...item });

  const mapQuantity = (item) => ({ ...item, quantity: item.quantity || "1" });

  const handleSubmit = async (item, { resetForm }) => {
    setLoading(true);
    editedItem
      ? await updateItem(mapId(item), id || listId)
      : await addItem(mapQuantity(item), id);
    setLoading(false);

    resetForm();
    navigation.goBack();
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Form
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        style={styles.screen}
      >
        <FormField name="name" placeholder="Name" width="95%" autoFocus />
        <FormField
          name="quantity"
          keyboardType="numeric"
          placeholder="Quantity"
          maxLength={1_000}
          width="50%"
        />
        <FormField
          name="unitPrice"
          keyboardType="numeric"
          placeholder="Price"
          width="50%"
          maxLength={10_000}
        />
        <FormPicker
          icon="apps"
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPicker}
          placeholder="Category"
        />
        <SubmitButton title={editedItem ? "Edit Item" : "Add Item"} />
      </Form>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 25,
  },
});
