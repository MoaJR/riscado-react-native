import { View, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
//firebase
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const passRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigation.navigate("Home");
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleBlankFields = () => {
    if ([email, password].includes("")) {
      setError(true);
      setErrorMessage("Preencha todos os campos");
      return true;
    }
  };

  const handleLogin = () => {
    if (handleBlankFields()) return;
    setFetching(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setFetching(false);
        setError(false);
        navigation.navigate("Home");
      })
      .catch(() => {
        setFetching(false);
        setError(true);
        setErrorMessage("Email ou senha inválidos");
      });
  };

  const handleForgotPass = () => {
    const userEmail = email;
    if (userEmail === "") {
      alert("Preencha o campo email");
      return;
    }
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert(`Email enviado com sucesso para ${userEmail}!`);
      })
      .catch((error) => {
        alert(`Email digitado não encontrado!\n${userEmail}`)
      });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Logo />
      {loading ? <Loading /> : null}
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
        onSubmitEditing={handleLogin}
        iconName="lock"
        isPassword={true}
      />
      {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}>
        {fetching ? (
          <ActivityIndicator
            color="#fff"
            size="small"
          />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPassButton}
        onPress={handleForgotPass}>
        <Text style={{ fontSize: 12 }}>Redefinir Senha</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate("SignUp")}>
          <Text>
            Não tem uma conta? <Text style={styles.signUpButtonText}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
