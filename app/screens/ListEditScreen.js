import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import colors from "../config/colors";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(255).required().label("Shopping list title"),
  shoppingCentre: Yup.string().min(3).max(255).label("The Shopping Centre"),
  budgetLimit: Yup.number().min(1).max(1_000_000).label("Budget Limit Amount"),
});

export default ({ navigation }) => {
  const [error, setError] = useState("");

  const handleSubmit = (list) => {
    navigation.replace(routes.LIST, { title: list.title });
  };

  return (
    <Form
      initialValues={{ budgetLimit: "", shoppingCentre: "", title: "" }}
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
      <SubmitButton title="Create Shopping List" />
    </Form>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },
});
