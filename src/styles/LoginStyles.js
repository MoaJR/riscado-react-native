import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // loadingContainer: {
  //   width: Dimensions.get('window').width,
  //   height: Dimensions.get('window').height,
  //   backgroundColor: colors.white,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   position: 'absolute',
  //   zIndex: 20,
  // },
});