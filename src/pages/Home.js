import { useContext, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
// firebase
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/FirebaseProvider";
// components
import Logo from "../components/Logo";
import PageCounter from "../components/PageCounter";
import ListCard from "../components/ListCard";
import Loading from "../components/Loading";
// styles
import { styles } from "../styles/HomeStyles";
//context
import { DataContext } from "../context/DataContext";

export default function Home({navigation}) {
  const { data, setData, user } = useContext(DataContext);

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
        <Loading />
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
            onContentSizeChange={() => slideRef.current.scrollToEnd()}
            renderItem={({ item }) => <ListCard item={item} navigation={navigation}/>}
          />
        ) : null}
      </View>
      <PageCounter scrollX={scrollX} slideRef={slideRef} />
      <View style={styles.profileButtonContainer}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
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
