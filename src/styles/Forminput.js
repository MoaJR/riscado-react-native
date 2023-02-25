import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    height: 35,
    width: "70%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
