import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "../styles/ItemListStyles";
import { colors } from "../styles/colors";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

export default function ItemList({ item, onPress, onLongPress }) {
  const checkCompleted = () => {
    if (item.completed) {
      return { textDecorationLine: "line-through", color: colors.lightGray };
    } else {
      return { textDecorationLine: "none", color: colors.darkGray };
    }
  };

  const rightActions = (dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        style={[styles.taskDelete, { transform: [{ scale }] }]}
        onPress={onLongPress}>
        <AntDesign
          name="delete"
          style={[styles.taskDeleteIcon]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={(_, dragX) => rightActions(dragX, item.id)}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.taskText}
            onPress={onPress}>
            <AntDesign
              name={item.completed ? "checkcircle" : "checkcircleo"}
              style={[
                styles.checkIcon,
                { color: item.completed ? colors.gray : colors.darkGray },
              ]}
            />
            <Text
              numberOfLines={1}
              style={[styles.textTask, checkCompleted()]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
