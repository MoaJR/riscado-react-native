import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
// firebase
import { auth } from "../config/FirebaseProvider";
import { signOut } from "firebase/auth";
// styles
import { styles } from "../styles/ProfileStyles";
// context
import { DataContext } from "../context/DataContext";

const Profile = ({navigation}) => {
  const { user } = useContext(DataContext);
  const { email, displayName } = user;

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Deseja realmente sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => {
            signOut(auth)
              .then(() => {
                navigation.navigate("Login");
              })
              .catch((error) => {
                console.log(error);
              });              
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{displayName}</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.buttonLogout}
          onPress={handleLogout}>
          <AntDesign
            name="logout"
            style={styles.iconlogout}
          />
          <Text style={styles.textLogout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
