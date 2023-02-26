import React, { useContext, useRef, useState } from "react";
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

import { styles } from "../styles/ListDetailsStyles";
import ItemList from "../components/ItemList";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/FirebaseProvider";
import { DataContext } from "../context/DataContext";
import BackButton from "../components/BackButton";

function ListDetails({ route, navigation }) {
  const { item } = route.params;
  const { data, user } = useContext(DataContext);

  const [task, setTask] = useState("");
  const [error, setError] = useState(false);

  const taskList = data.find((list) => list.id === item.id).todos;
  const refInput = useRef();

  const docRef = doc(db, user.uid, item.id);

  const addTask = async () => {
    if (task === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
      return;
    }
    const date = new Date();
    const newTask = {
      id: date.toUTCString(),
      name: task,
      completed: false,
    };
    await updateDoc(docRef, {
      todos: arrayUnion(newTask),
    });
    refInput.current.focus();
    setTask("");
    Keyboard.isVisible();
  };

  const checkCompleted = (id) => {
    updateDoc(docRef, {
      todos: taskList.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        } else {
          return task;
        }
      }),
    });
  };

  const deleteTask = (id) => {
    updateDoc(docRef, {
      todos: taskList.filter((task) => task.id !== id),
    });
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
          autoFocus
          autoCapitalize="sentences"
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
      {error ? <Text style={styles.errorText}>Digite uma tarefa</Text> : null}
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
      <BackButton navigation={navigation} />
    </KeyboardAvoidingView>
  );
}

export default ListDetails;
