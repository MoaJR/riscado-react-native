import { View, StyleSheet, useWindowDimensions, Animated, Dimensions, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { colors } from "../styles/colors";
import { DataContext } from "../context/DataContext";

const PageCounter = ({ scrollX, slideRef }) => {
  const { data } = useContext(DataContext);
  const width = Dimensions.get("window").width;
  const AnimationTouch = Animated.createAnimatedComponent(TouchableOpacity);
  return (
    <View style={styles.listsCounter}>
      {data.length > 0
        ? data.map(({ backgroundColor }, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 0.5) * width];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 1, 0.6],
              extrapolate: "clamp",
            });
            const widthR = scrollX.interpolate({
              inputRange,
              outputRange: [12, 22, 12],
              extrapolate: "clamp",
            });
            const marginBottom = scrollX.interpolate({
              inputRange,
              outputRange: [0, -8, 0],
              extrapolate: "clamp",
            });

            return (
              <AnimationTouch
                onPress={() => { slideRef.current.scrollToIndex({ index, animated: true }) }}
                key={index.toString()}
                style={[styles.dot, { opacity, backgroundColor, width: widthR, }]}
              />
            );
          })
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  listsCounter: {
    marginVertical: 20,
    flexDirection: "row",
  },
  dot: {
    borderRadius: 10,
    marginHorizontal: 6,
    height: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "flex-end",
  },
});

export default PageCounter;
