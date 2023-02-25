import { ActivityIndicator, View } from "react-native";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size="large"
        color="#2bbef7"
      />
    </View>
  );
};

export default Loading;




export const styles = StyleSheet.create({
  loadingContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 20,
  },
});