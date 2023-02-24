import { View, StyleSheet, useWindowDimensions, Animated, Dimensions } from "react-native";
import React, { useContext } from "react";
import { colors } from "../styles/colors";
import { DataContext } from "../context/DataContext";

const PageCounter = ({ scrollX }) => {
  const { data } = useContext(DataContext);
  const width = Dimensions.get("window").width;
  return (
    <View style={styles.listsCounter}>
      {data.length > 0
        ? data.map(({ backgroundColor }, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 1, 0.6],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index.toString()}
                style={[styles.dot, { width: dotWidth, opacity, backgroundColor: backgroundColor}]}
              />
            );
          })
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  listsCounter: {
    marginBottom: 20,
    flexDirection: "row",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default PageCounter;
