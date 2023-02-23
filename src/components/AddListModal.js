import React, { useEffect, useState } from 'react';
import {AntDesign} from '@expo/vector-icons'

import { Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/AddListModalStyles';

function AddListModal({onPress: handleModal, setData, data}) {
  const colorsArray = ['#5CD859', '#2bbef7', '#0561ff', '#8022D9', '#e966f0', '#e94e5b', '#f5874d'];

  const [name, setName] = useState('');
  const [color, setColor] = useState(colorsArray[Math.floor(Math.random() * colorsArray.length)]);
  const [listObject, setListObject] = useState({});
  const [error, setError] = useState(false);

  const addList = () => {
    if(name === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
      return;
    }
    const newData = [...data, listObject];
    setData(newData);
    handleModal();
    Keyboard.dismiss();
  }

  useEffect(() => {
    setListObject({id: (Math.random(9999) * 10).toString().split('.')[1], name, backgroundColor: color, todos: []});
  }, [name, color]);

  return (
    <KeyboardAvoidingView  style={styles.container} behavior='height'>
      <Text style={styles.title}>Criar Lista</Text>
      <TouchableOpacity
        style={styles.closeModalButton}
        onPress={handleModal}
      >
        <AntDesign name="left" style={styles.backIcon} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nome da Lista"
        value={name}
        onChangeText={text => setName(text)}
        onSubmitEditing={addList}
        />
        {
          error ? (
            <Text style={styles.errorText}>Digite um Nome</Text>
          ) : null
        }
      <View style={styles.colorsContainer}>
        {
          colorsArray.map(color => (
            <TouchableOpacity
              key={color}
              style={[styles.colorSelect, {backgroundColor: color}]}
              onPress={() => setColor(color)}
            />
          ))
        }
      </View>
      <TouchableOpacity
        style={[styles.createButton, {backgroundColor: color}]}
      >
        <Text style={styles.createButtonText} onPress={addList}>Adicionar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default AddListModal;
