import React from "react";
import { useFormikContext } from "formik";
import { StyleSheet } from "react-native";

import Button from "../BlockButton";

export default ({ title }) => {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} style={styles.button} />;
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    marginBottom: 20,
  },
});
