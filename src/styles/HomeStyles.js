import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";

const buttonSize = 60;

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
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
  addContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
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
  menuIcon: {
    fontSize: 25,
    color: colors.white,
    fontWeight: 'bold',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 50,
    transform: [{ translateY: 100}, {rotate: '180deg' }],
  },
  profileButton: {
    borderRadius: 50,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 80,
    transform: [{ translateX: -100 }, { translateY: 50}],
  },
  newList: {
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 80,
    transform: [{ translateX: -32 }],
  },
  history: {
    borderRadius: 50,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 80,
    transform: [{ translateX: 35 }, { translateY: 50}],
  },
});