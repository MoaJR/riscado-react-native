import { useState } from "react";
import {  FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";

import Logo from "./src/components/Logo";
import { styles } from "./src/styles/AppStyles";
import AddListModal from "./src/components/AddListModal";
import ListCard from "./src/components/ListCard";
import { listsData as Data }  from "./src/data";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [listsData, setListsData] = useState(Data);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"        
        visible={modalVisible}
        onRequestClose={handleModal}>
        <AddListModal onPress={handleModal} setData={setListsData} data={listsData}/>
      </Modal>
      <Logo />
      <TouchableOpacity
        style={styles.addContainer}
        onPress={handleModal}>
        <View style={styles.addButton}>
          <AntDesign
            name="plus"
            style={styles.addIcon}
            />
        </View>
        <Text style={styles.subtitleText}>Adicionar Lista</Text>
      </TouchableOpacity>
      <View style={styles.listsCounter}>
        <Text style={styles.listsCounterText}>
         { `${listsData.length} ${listsData.length !== 1 ? "Listas" : "Lista"}`}
        </Text>
      </View>
      <View style={styles.listsContainer}>
        {listsData.length > 0 ? (
          <FlatList
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{ alignItems: 'flex-start'}}
          showsHorizontalScrollIndicator={false}
          data={listsData}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <ListCard item={item} setData={setListsData} data={listsData}/>
            )}
            />
        ) : null
        }
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
