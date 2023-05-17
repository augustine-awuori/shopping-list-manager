import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import Screen from "../components/Screen";
import useShoppingLists from "../hooks/useShoppingLists";

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(255).required().label("Shopping list title"),
  shoppingCentre: Yup.string().min(3).max(255).label("The Shopping Centre"),
  budgetLimit: Yup.number().min(1).max(1_000_000).label("Budget Limit Amount"),
});

export default ({ navigation, route }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState();
  const shoppingList = useShoppingLists();

  const editedList = route?.params;

  const initialValues = {
    budgetLimit: editedList?.budgetLimit || "",
    shoppingCentre: editedList?.shoppingCentre || "",
    title: editedList?.title || "",
  };

  const handleSubmit = async (list, { resetForm }) => {
    setError("");
    setLoading(true);
    const { data, ok } = editedList
      ? await shoppingList.update(list)
      : await shoppingList.add(list);
    setLoading(false);

    if (!ok) return setError(data);

    resetForm();
    navigation.goBack();
  };

  return (
    <Screen>
      <ActivityIndicator visible={loading} />
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        style={styles.container}
      >
        <ErrorMessage error={error} visible={error} />
        <FormField name="title" placeholder="Shopping List  Title" />
        <FormField
          name="shoppingCentre"
          placeholder="Shopping Centre (Optional)"
        />
        <FormField
          autoCapitalize="words"
          keyboardType="numeric"
          maxLength={7}
          name="budgetLimit"
          placeholder="Budget Limit Amount (Optional)"
        />
        <SubmitButton title={route?.params ? "Save List" : "Create List"} />
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },
});
