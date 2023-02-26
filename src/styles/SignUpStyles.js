import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButton: {
    height: 50,
    width: 150,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  signupButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  signinButton: {
    marginVertical: 10,
  },
  signUpButtonText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  logo: {
    position: "absolute",
    top: 40,
  },
  registerContainer: {
    position: "absolute",
    bottom: 30,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "bold",
  },
});