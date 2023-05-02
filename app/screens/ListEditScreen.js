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
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(255).required().label("Title"),
  shoppingCentre: Yup.string().min(3).max(255).label("The Shopping Centre"),
  budgetLimit: Yup.number().min(1).max(1_000_000).label("Budget Limit Amount"),
});

export default () => {
  const [error, setError] = useState("");

  const handleSubmit = (list) => {};

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ budgetLimit: "", shoppingCentre: "", title: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        <FormField name="title" placeholder="Shopping List  Title" />
        <FormField
          name="shoppingCentre"
          placeholder="Shopping Centre (optional)"
        />
        <FormField
          autoCapitalize="words"
          keyboardType="numeric"
          maxLength={7}
          name="budgetLimit"
          placeholder="Budget Limit Amount"
        />
        <SubmitButton title="Create List" />
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 25,
  },
});
