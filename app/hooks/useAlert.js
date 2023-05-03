import { useState } from "react";
import { Alert } from "react-native";

export default () => {
  const [isExecuting, setIsExecuting] = useState();

  const getButton = (text, onPress) => {
    if (text)
      return {
        text,
        onPress: async () => {
          setIsExecuting(true);
          await onPress();
          setIsExecuting(false);
        },
      };
  };

  const alert = (
    title = "",
    message = "",
    positiveButtonText = "",
    positiveFn = () => {},
    negativeButtonText = "",
    negativeFn = () => {}
  ) => {
    Alert.alert(title, message, [
      getButton(positiveButtonText, positiveFn),
      getButton(negativeButtonText, negativeFn),
    ]);
  };

  return { alert, isExecuting };
};
