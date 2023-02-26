import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useRef, useState } from "react";
//firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/FirebaseProvider";
//styles
import { styles } from "../styles/SignUpStyles";
//components
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const passRef = useRef(null);
  const emailRef = useRef(null);

  const handleErrors = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setErrorMessage("Este email já está em uso");
        break;
      case "auth/invalid-email":
        setErrorMessage("Email inválido");
        break;
      case "auth/weak-password":
        setErrorMessage("Senha deve ter no mínimo 6 caracteres e conter letras e números");
        break;
      default:
        setErrorMessage("Erro ao criar conta");
        break;
    }
  };

  const handleFieldErrors = () => {
    setError(true);
    if ([name, email, password].includes("")) {
      setErrorMessage("Preencha todos os campos");
      return true;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage("Senha deve ter no mínimo 6 caracteres e conter letras e números");
      return true;
    }
  };

  const handleSignupButton = () => {
    if (handleFieldErrors()) return;
    setFetching(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        }).then(() => {
          setError(false);
          setFetching(false);
        });
      })
      .catch((error) => {
        handleErrors(error.code);
        setFetching(false);
      });
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
      <FormInput
        autoCapitalize="words"
        autoCorrect={false}
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
        iconName="user"
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current.focus()}
        blurOnSubmit={false}
        autoFocus={true}
      />
      <FormInput
        refInner={emailRef}
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
      />
      <FormInput
        refInner={passRef}
        placeholder="password"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={handleSignupButton}
        iconName="lock"
        isPassword={true}
      />
      {
        error ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null
      }
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignupButton}>
        {fetching ? (
          <ActivityIndicator
            color="#fff"
            size="small"
          />
        ) : (
          <Text style={styles.signupButtonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <TouchableOpacity
          style={styles.signinButton}
          onPress={() => navigation.navigate("Login")}>
          <Text>
            Já possui uma conta? <Text style={styles.signUpButtonText}>Faça Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
