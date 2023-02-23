import React, { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "../styles/ListModalStyles";
import ItemList from "./ItemList";

function ListModal({ handleModal, item, data, setData }) {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(item.todos);
  const [error, setError] = useState(false);

  const refInput = useRef();

  const addTask = () => {
    if(task === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
      return;
    }
    const newTask = {
      id: (Math.random(9999) * 10).toString().split(".")[1],
      name: `${task.charAt(0).toUpperCase()}${task.slice(1)}`,
      completed: false,
    };
    const newData = data.map((list) => {
      if (list.id === item.id) {
        return {
          ...list,
          todos: [...list.todos, newTask],
        };
      } else {
        return list;
      }
    });
    setTaskList([...taskList, newTask]);
    setData(newData);
    refInput.current.focus();
    setTask("");
    Keyboard.isVisible();
  };

  const checkCompleted = (id) => {
    const newList = taskList.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      } else {
        return task;
      }
    });
    setTaskList(newList);
    const newData = data.map((list) => {
      if (list.id === item.id) {
        return {
          ...list,
          todos: newList,
        };
      } else {
        return list;
      }
    });
    setData(newData);
  };

  const deleteTask = (id) => {
    const newList = taskList.filter((task) => task.id !== id);
    setTaskList(newList);
    const newData = data.map((list) => {
      if (list.id === item.id) {
        return {
          ...list,
          todos: newList,
        };
      } else {
        return list;
      }
    });
    setData(newData);
  };

  const totalTasks = taskList.length;
  const completedTasks = taskList.filter((task) => task.completed).length;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height">
      <Text style={[styles.title, { color: item.backgroundColor }]}>{item.name}</Text>
      <View style={styles.trace} />
      <Text style={styles.subtitle}>{`${completedTasks} de ${totalTasks} ${
        totalTasks !== 1 ? "tarefas" : "tarefa"
      }`}</Text>

      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <TextInput
          ref={refInput}
          style={styles.input}
          placeholder="Nome da Tarefa"
          value={task}
          onChangeText={(text) => setTask(text)}
          onSubmitEditing={addTask}
          blurOnSubmit={false}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: item.backgroundColor }]}
          onPress={addTask}>
          <AntDesign
            name="plus"
            style={styles.createButtonText}
            />
        </TouchableOpacity>
      </View>
      {
        error ? (
          <Text style={styles.errorText}>Digite uma tarefa</Text>
        ) : null
      }
      <ScrollView
        style={styles.tasksContainer}
        showsVerticalScrollIndicator={false}>
        {taskList.length > 0 ? (
          taskList.map((task) => (
            <ItemList
              onPress={() => checkCompleted(task.id)}
              onLongPress={() => deleteTask(task.id)}
              key={task.id}
              item={task}
            />
          ))
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.defaultText}>Você não tem nenhuma tarefa</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.closeModalButton}
        onPress={handleModal}>
        <AntDesign
          name="left"
          style={styles.backIcon}
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default ListModal;
