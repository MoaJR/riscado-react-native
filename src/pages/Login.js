import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
//firebase
import { onAuthStateChanged, signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../config/FirebaseProvider";
//styles
import { styles } from "../styles/LoginStyles";
//components
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import Loading from "../components/Loading";
//context
import { DataContext } from "../context/DataContext";


const Login = ({ navigation }) => {
  const { setUser } = useContext(DataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const passRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        navigation.navigate("Home");
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleLogin = () => {
    setFetching(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setFetching(false);
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
      {
        loading ? (
          <Loading />
        ) : null
      }
      <FormInput
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        iconName="mail"
        returnKeyType="next"
        onSubmitEditing={() => passRef.current.focus()}
        blurOnSubmit={false}
        autoFocus={true}
      />
      <FormInput
        refInner={passRef}
        placeholder="password"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        iconName="lock"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}>
        {
          fetching ? (
            <ActivityIndicator color="#fff" size='small'/>
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )
        }
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate("SignUp")}>
        <Text>
          Não tem uma conta? <Text style={styles.signUpButtonText}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
