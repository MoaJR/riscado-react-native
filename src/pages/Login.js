import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "../styles/LoginStyles";
import Logo from "../components/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      
    </View>
  );
};

export default Login;
