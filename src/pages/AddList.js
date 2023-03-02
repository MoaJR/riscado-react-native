import React, { useContext, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "../styles/AddListStyles";
import { db } from "../config/FirebaseProvider";
import { DataContext } from "../context/DataContext";
import BackButton from "../components/BackButton";

function AddList({ navigation }) {
  const colorsArray = [
    "#5CD859",
    "#2bbef7",
    "#0561ff",
    "#8022D9",
    "#e966f0",
    "#e94e5b",
    "#f5874d",
  ];

  const { user } = useContext(DataContext);
  const [name, setName] = useState("");
  const [color, setColor] = useState(
    colorsArray[Math.floor(Math.random() * colorsArray.length)]
  );
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const addList = async () => {
    const listObject = {
      id: Date.now().toString(),
      name: `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
      backgroundColor: color,
      todos: [],
    };
    await setDoc(doc(db, user.uid, listObject.id), listObject)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addListSubmit = async () => {
    if (name === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
      return;
    }
    setLoading(true);
    await addList();
    navigation.goBack();
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.title}>Criar Lista</Text>
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
      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: color }]}
        onPress={addListSubmit}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#fff"
          />
        ) : (
          <Text style={styles.createButtonText}>Adicionar</Text>
        )}
      </TouchableOpacity>
      <BackButton navigation={navigation} />
    </KeyboardAvoidingView>
  );
}

export default AddList;
