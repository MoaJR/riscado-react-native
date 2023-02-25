import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: "100%",
    paddingHorizontal: 10,
    paddingLeft: 40,
  },
  icon: {
    fontSize: 20,
    position: "absolute",
    left: 10,
    top: 10,
  },
});
