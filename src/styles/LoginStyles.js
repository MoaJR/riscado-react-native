import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    height: 50,
    width: 150,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  loginButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  signupButton: {
    marginVertical: 10,
  },
  signUpButtonText: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  logo: {
    position: "absolute",
    top: 40,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "bold",
  },
  forgotPassButton: {
    marginVertical: 20,
  },
  registerContainer: {
    position: "absolute",
    bottom: 30,
  },
});
