import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
// firebase
import { auth } from "../config/FirebaseProvider";
import { getAuth, signOut } from "firebase/auth";
// styles
import { styles } from "../styles/ProfileStyles";
// context
import { DataContext } from "../context/DataContext";
import BackButton from "../components/BackButton";

const Profile = ({ navigation }) => {
  const { user } = useContext(DataContext);
  const { email, displayName } = user;

  const handleLogout = () => {
    Alert.alert("Logout", "Deseja realmente sair?", [
      {
        text: "Cancelar",
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
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Excluir conta",
      "Deseja realmente excluir sua conta?\nVocê perderá todos os dados salvos!\nEsta ação é irreversível!",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Excluir",
          onPress: () => {
            getAuth()
              .currentUser.delete()
              .then(() => {
                alert("Conta excluída com sucesso!");
                navigation.navigate("Login");
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Text style={styles.profilePictureText}>{displayName[0].toUpperCase()}</Text>
      </View>
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
        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={handleDeleteAccount}>
          <AntDesign
            name="delete"
            style={styles.deleteAccouontIcon}
          />
          <Text style={styles.deleteAccountText}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>
      <BackButton navigation={navigation} />
    </View>
  );
};

export default Profile;
