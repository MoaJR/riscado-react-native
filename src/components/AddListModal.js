import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "../styles/AddListModalStyles";
import { db } from "../config/FirebaseProvider";

function AddListModal({ onPress: handleModal }) {
  const colorsArray = [
    "#5CD859",
    "#2bbef7",
    "#0561ff",
    "#8022D9",
    "#e966f0",
    "#e94e5b",
    "#f5874d",
  ];

  const [name, setName] = useState("");
  const [color, setColor] = useState(
    colorsArray[Math.floor(Math.random() * colorsArray.length)]
  );
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const addList = async () => {
    setLoading(true);
    const listObject = {
      id: JSON.stringify(Date.now()),
      name: `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
      backgroundColor: color,
      todos: [],
    };
    await setDoc(doc(db, "tasks", listObject.id), listObject);
    setLoading(false);
  };

  const addListSubmit = () => {
    if (name === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
      return;
    }
    addList();
    handleModal();
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height">
      <Text style={styles.title}>Criar Lista</Text>
      <TouchableOpacity
        style={styles.closeModalButton}
        onPress={handleModal}>
        <AntDesign
          name="left"
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <TextInput
        autoFocus
        style={styles.input}
        placeholder="Nome da Lista"
        value={name}
        onChangeText={(text) => setName(text)}
        onSubmitEditing={addListSubmit}
      />
      {error ? <Text style={styles.errorText}>Digite um Nome</Text> : null}
      <View style={styles.colorsContainer}>
        {colorsArray.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorSelect, { backgroundColor: color }]}
            onPress={() => setColor(color)}
          />
        ))}
      </View>
      <TouchableOpacity style={[styles.createButton, { backgroundColor: color }]}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#fff"
          />
        ) : (
          <Text
            style={styles.createButtonText}
            onPress={addListSubmit}>
            Adicionar
          </Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default AddListModal;
