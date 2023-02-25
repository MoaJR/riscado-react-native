import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";

import { styles } from "../styles/ListCardStyles";
import ProgressBar from "./ProgressBar";
import { db } from "../config/FirebaseProvider";

function ListCard({ item, navigation }) {
  const [deleteVisible, setDeleteVisible] = useState(false);

  const handleNavigate = () => {
    deleteVisible
      ? setDeleteVisible(false)
      : navigation.navigate("ListDetails", { item: item });
  };

  const deleteById = async (id) => {
    const tasksRef = await doc(db, "tasks", id);
    await deleteDoc(tasksRef);
  };

  const handleDelete = () => {
    Alert.alert(
      "Deletar Lista",
      `Você tem certeza que deseja deletar a lista: ${item.name}?`,
      [
        {
          text: "Cancelar",
          onPress: () => setDeleteVisible(false),
        },
        {
          text: "Deletar",
          onPress: () => {
            deleteById(item.id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const transformAnim = useRef(new Animated.Value(-55)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleShowDelete = () => {
    setDeleteVisible(!deleteVisible);
  };

  useEffect(() => {
    Animated.timing(transformAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      delay: 50,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(transformAnim, {}).reset();
      Animated.timing(opacityAnim, {}).reset();
    };
  }, [deleteVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          onLongPress={handleShowDelete}
          onPress={handleNavigate}
          style={[styles.card, { backgroundColor: item.backgroundColor }]}>
          <Text
            numberOfLines={1}
            style={[
              styles.listTitle,
              item.todos.every((todo) => todo.completed) && item.todos.length > 0
                ? { textDecorationLine: "line-through" }
                : { textDecorationLine: "none" },
            ]}>
            {item.todos.every((todo) => todo.completed) ? ` ${item.name} ` : item.name}
          </Text>
          <View style={styles.countContainer}>
            <View style={styles.tasksTextContainer}>
              <Text style={styles.listCount}>{item.todos.length}</Text>
              <Text style={styles.listTasksText}>
                {item.todos.length !== 1 ? " tarefas" : " tarefa"}
              </Text>
            </View>
            <View style={styles.tasksTextContainer}>
              <Text style={styles.listCount}>
                {item.todos.filter((todo) => todo.completed).length}
              </Text>
              <Text style={styles.listTasksText}>
                {item.todos.filter((todo) => todo.completed).length !== 1
                  ? " completas"
                  : " completa"}
              </Text>
            </View>
          </View>
          {item.todos.every((todo) => todo.completed) && item.todos.length > 0 ? (
            <AntDesign
              name="checkcircle"
              style={styles.checkIconList}
            />
          ) : (
            <AntDesign
              name="checkcircleo"
              style={styles.checkIconList}
            />
          )}
          <ProgressBar item={item} />
        </TouchableOpacity>
        {deleteVisible ? (
          <Animated.View
            style={{ transform: [{ translateY: transformAnim }], opacity: opacityAnim }}>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.deleteContainer}>
              <AntDesign
                name="delete"
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}

export default ListCard;
