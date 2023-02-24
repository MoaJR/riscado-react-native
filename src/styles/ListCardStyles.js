import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  card: {
    width: Dimensions.get('window').width - 60,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  listTitle: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  defaultText: {
    fontSize: 15,
    color: colors.darkGray,
    fontWeight: '400',
  },
  countContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkIconList: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  listCount: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '300',
  },
  listTasksText: {
    fontSize: 13,
    color: colors.white,
    fontWeight: '400',
  },
  tasksTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  deleteContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -50,
  },
  deleteIcon: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
  },
});
