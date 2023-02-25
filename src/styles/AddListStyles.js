import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    padding: 5,
  },
  backIcon: {
    fontSize: 25,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    height: 50,
    width: '80%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 20,
  },
  colorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  createButton: {
    height: 50,
    width: '50%',
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  createButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: 'bold',
  },
});