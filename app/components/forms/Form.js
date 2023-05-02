import React from "react";
import { ScrollView } from "react-native";
import { Formik } from "formik";

export default ({
  children,
  initialValues,
  onSubmit,
  style,
  validationSchema,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {() => <ScrollView style={style}>{children}</ScrollView>}
  </Formik>
);
