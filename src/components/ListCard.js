import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Modal, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "../styles/ListCardStyles";
import ProgressBar from "./ProgressBar";
import ListModal from "./ListModal";

function ListCard({ item, setData, data }) {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [ListModalVisible, setListModalVisible] = useState(false);

  const handleShowListModal = () => {
    setListModalVisible(!ListModalVisible);
  };

  const handleDelete = () => {
    const newData = data.filter((list) => list.id !== item.id);
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
          onPress: () => setData(newData),
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
      Animated.timing(transformAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).reset();
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).reset();
    };
  }, [deleteVisible]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={ListModalVisible}
        onRequestClose={handleShowListModal}>
        <ListModal
          handleModal={handleShowListModal}
          item={item}
          data={data}
          setData={setData}
        />
      </Modal>
      <TouchableOpacity
        onLongPress={handleShowDelete}
        onPress={handleShowListModal}
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
        <Animated.View style={{ transform: [{translateY: transformAnim}], opacity: opacityAnim }} >
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
  );
}

export default ListCard;
