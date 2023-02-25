import { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/FirebaseProvider";

import Logo from "../components/Logo";
import { styles } from "../styles/HomeStyles";
import AddList from "./AddList";
import ListCard from "../components/ListCard";
import { DataContext } from "../context/DataContext";
import PageCounter from "../components/PageCounter";
import { StatusBar } from "expo-status-bar";

export default function Home({navigation}) {
  const { data, setData } = useContext(DataContext);

  const [loading, setLoading] = useState(true);

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
      <Logo />
      <TouchableOpacity
        style={styles.addContainer}
        onPress={() => navigation.navigate('AddList')}>
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
            scrollEventThrottle={32}
            extraData={data}
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
            renderItem={({ item }) => <ListCard item={item} slideRef={slideRef} navigation={navigation} />}
          />
        ) : null}
      </View>
      <PageCounter scrollX={scrollX} slideRef={slideRef} />
      <StatusBar style="auto" />
    </View>
  );
}
