import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    color: colors.darkGray,
  },
  title: {
    fontSize: 24,
    color: colors.darkGray,
    fontWeight: "bold",
  },
  buttonLogout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.danger,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 10,
  },
  textLogout: {
    fontSize: 18,
    color: colors.white,
    marginLeft: 10,
  },
  iconlogout: {
    fontSize: 17,
    color: colors.white,
  },
  logoutContainer: {
    position: "absolute",
    bottom: 15,
  },
});
