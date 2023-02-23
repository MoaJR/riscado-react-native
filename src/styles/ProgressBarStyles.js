import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  progressBar: {
    height: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  progressBarContainer: {
    width: '80%',
    height: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 10,
  },
});
