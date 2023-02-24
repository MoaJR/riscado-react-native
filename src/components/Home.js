import { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/FirebaseProvider";

import Logo from "./Logo";
import { styles } from "../styles/HomeStyles";
import AddListModal from "./AddListModal";
import ListCard from "./ListCard";
import { DataContext } from "../context/DataContext";
import PageCounter from "./PageCounter";

export default function Home() {
  const { data, setData } = useContext(DataContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    setLoading(true);
    onSnapshot(collection(db, "tasks"), (snapshot) => {
      const lists = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setData(lists);
    });
    setLoading(false);
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;

  const slideRef = useRef(null);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#2bbef7"
          />
        </View>
      ) : null}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleModal}>
        <AddListModal onPress={handleModal} />
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
      <View style={styles.listsContainer}>
        {data.length > 0 ? (
          <FlatList
            snapToAlignment="center"
            bounces={false}
            pagingEnabled
            ref={slideRef}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            keyboardShouldPersistTaps={"handled"}
            contentContainerStyle={{ alignItems: "flex-start" }}
            showsHorizontalScrollIndicator={false}
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ListCard item={item} />}
          />
        ) : null}
      </View>
      <PageCounter scrollX={scrollX} />
    </View>
  );
}