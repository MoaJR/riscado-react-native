import { useContext, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Animated as AnimatedRN,
  BackHandler,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../styles/colors";

export default function Home({ navigation }) {
  const { data, user, setData } = useContext(DataContext);

  const scrollX = useRef(new AnimatedRN.Value(0)).current;

  const offset = useSharedValue(0);

  const slideRef = useRef(null);

  const animatedToggleMenu = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(`${offset.value}deg`, {
            velocity: 0.1,
          }),
        },
        {
          scale: withSpring(offset.value === 0 ? 1 : 0.6),
        },
      ],
      backgroundColor: offset.value === 0 ? colors.primary : colors.danger,
    };
  });

  const animatedMenu = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(`${offset.value === 0 ? 180:  0}deg`, {
            damping: 25,
          }),
        },
        {
          scale: withTiming(offset.value === 0 ? 0 : 1),
        },
      ],
      opacity: withTiming(offset.value === 0 ? 0 : 1),
    };
  });

  useEffect(() => {
    onSnapshot(collection(db, user.uid), (snapshot) => {
      const lists = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setData(lists);
    });
  }, []);

  useEffect(() => {
    const callback = () => {
      Alert.alert(
        "Sair do App",
        "Você tem certeza que deseja sair do app?",
        [
          {
            text: "Cancelar",
            onPress: () => {},
            style: "cancel",
          },
          { text: "Sair", style: "destructive", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", callback);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.listsContainer}>
        {data.length > 0 ? (
          <FlatList
            scrollEventThrottle={32}
            extraData={data}
            snapToAlignment="center"
            bounces={false}
            pagingEnabled
            ref={slideRef}
            onScroll={AnimatedRN.event(
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

      <TouchableOpacity
        style={[styles.addContainer]}
        onPress={() => {
          offset.value = offset.value === 0 ? -45 : 0;
        }}>
        <Animated.View style={[styles.addButton, animatedToggleMenu]}>
          <AntDesign
            name="plus"
            style={styles.addIcon}
          />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.menuContainer, animatedMenu]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}>
          <View style={styles.profileButton}>
            <AntDesign
              name="user"
              style={styles.menuIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddList")}>
          <View style={styles.newList}>
            <AntDesign
              name="plus"
              style={styles.menuIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddList")}>
          <View style={styles.history}>
            <AntDesign
              name="setting"
              style={styles.menuIcon}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
      <StatusBar style="auto" />
    </View>
  );
}
