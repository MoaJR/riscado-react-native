import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";

const buttonSize = 40;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 25,
    color: colors.white,
    fontWeight: 'bold',
  },
  addContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    position: 'absolute',
    bottom: 15,
  },
  subtitleText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '400',
  },
  listsContainer: {
    zIndex: -1,
    maxHeight: '33%',
  },
  profileButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    position: 'absolute',
    bottom: 10,
    right: 30,
  },
  profileButton: {
    borderRadius: 30,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  profileIcon: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
  }
});