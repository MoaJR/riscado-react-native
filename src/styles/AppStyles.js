import { StyleSheet } from "react-native";
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
  listsCounter: {
    marginBottom: 20,
  },
  listsCounterText: {
    fontSize: 20,
    color: colors.darkGray,
    fontWeight: '300',
  },
  loadingContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
});