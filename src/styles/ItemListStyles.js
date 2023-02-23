import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 15,
    color: colors.darkGray,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 3,
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTask: {
    fontSize: 15,
    color: colors.darkGray,
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: 8,
  },
  checkIcon: {
    fontSize: 15,
    color: colors.darkGray,
    fontWeight: 'bold',
    marginLeft:4,
    textDecorationLine: "none",
  },
  taskDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 5,
  },
  taskDeleteIcon: {
    fontSize: 20,
    color: colors.danger,
    fontWeight: 'bold',
  },
});