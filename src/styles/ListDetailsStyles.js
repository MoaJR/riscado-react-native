import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.darkGray,
    textAlign: 'center',
    width: '80%',
  },
  trace: {
    height: 5,
    width: 50,
    backgroundColor: colors.darkGray,
    borderRadius: 5,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '300',
    color: colors.darkGray,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    height: 35,
    width: '70%',
    paddingHorizontal: 10,
  },
  createButton: {
    height: 30,
    width: 30,
    borderRadius: 50,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  tasksContainer: {
    marginTop: 20,
    width: '80%',
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: 'bold',
  },
});