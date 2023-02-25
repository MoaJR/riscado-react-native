import { StyleSheet } from "react-native";
import {colors} from "./colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 80,
  },
  title: {
    fontSize: 40,
    color: colors.primary,
    fontWeight: 'bold',
  },
  trace: {
    width: '70%',
    height: 3,
    backgroundColor: colors.secondary,
    position: 'absolute',
    top: '60%',
    left: '40%',
  },
  check: {
    fontSize: 40,
    color: colors.secondary,
    marginRight: 2,
    alignSelf: 'center',
  },
});