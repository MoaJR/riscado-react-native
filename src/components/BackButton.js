import { TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../styles/colors";

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity
    style={styles.closeButton}
    onPress={() => navigation.goBack()}>
    <AntDesign
      name="left"
      style={styles.backIcon}
    />
  </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
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
});