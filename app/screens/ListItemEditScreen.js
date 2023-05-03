import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import { Form, FormField, FormPicker, SubmitButton } from "../components/forms";
import CategoryPicker from "../components/CategoryPickerItem";
import Screen from "../components/Screen";

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
    label: "Furniture1",
  },
  {
    icon: "arrow-down",
    backgroundColor: "red",
    label: "Furniture2",
  },
  {
    icon: "facebook",
    backgroundColor: "dodgerblue",
    label: "Furniture3",
  },
  {
    icon: "instagram",
    backgroundColor: "green",
    label: "Furniture4",
  },
  {
    icon: "twitter",
    backgroundColor: "dodgerblue",
    label: "Furniture5",
  },
];

export default () => {
  const handleSubmit = () => {};

  return (
    <Screen style={styles.screen}>
      <Form
        validationSchema={validationSchema}
        initialValues={{ category: null, name: "", price: "", quantity: "" }}
        onSubmit={handleSubmit}
      >
        <FormField name="name" placeholder="Name" width="95%" />
        <FormField
          name="quantity"
          keyboardType="numeric"
          placeholder="Quantity"
          maxLength={1_000}
          width="50%"
        />
        <FormField
          name="price"
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
        <SubmitButton title="Add Item" />
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 25,
  },
});
