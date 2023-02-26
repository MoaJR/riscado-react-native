import { useContext, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
// components
import Logo from "../components/Logo";
import PageCounter from "../components/PageCounter";
import ListCard from "../components/ListCard";
// styles
import { styles } from "../styles/HomeStyles";
//context
import { DataContext } from "../context/DataContext";
// firebase
import { db } from "../config/FirebaseProvider";
import { collection, onSnapshot } from "firebase/firestore";

export default function Home({ navigation }) {
  const { data, user, setData } = useContext(DataContext);

  const scrollX = useRef(new Animated.Value(0)).current;

  const slideRef = useRef(null);

  useEffect(() => {
    onSnapshot(collection(db, user.uid), (snapshot) => {
      const lists = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setData(lists);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      <TouchableOpacity
        style={styles.addContainer}
        onPress={() => navigation.navigate("AddList")}>
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
            renderItem={({ item, index }) => (
              <ListCard
                item={item}
                navigation={navigation}
                listRef={slideRef}
                index={index}
                data={data}
              />
            )}
          />
        ) : null}
      </View>
      <PageCounter
        scrollX={scrollX}
        slideRef={slideRef}
      />
      <View style={styles.profileButtonContainer}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}>
          <AntDesign
            name="user"
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
