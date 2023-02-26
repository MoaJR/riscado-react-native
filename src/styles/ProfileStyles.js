import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePictureContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.colorsProfile[Math.floor(Math.random() * colors.colorsProfile.length)],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  profilePictureText: {
    fontSize: 40,
    color: colors.white,
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
  logoutContainer: {
    position: "absolute",
    bottom: 20,
  },
  buttonLogout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 25,
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
    transform: [{ rotate: "180deg" }],
  },
  deleteAccountButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  deleteAccouontIcon: {
    fontSize: 15,
    color: colors.danger,
  },
  deleteAccountText: {
    fontSize: 13,
    color: colors.danger,
    marginLeft: 10,
  },
});
