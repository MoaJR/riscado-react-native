import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/FirebaseProvider";

import { styles } from "../styles/SignUpStyles";
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [fetching, setFetching] = useState(false);

  const passRef = useRef(null);
  const emailRef = useRef(null);

  const handleSignupButton = () => {
    setFetching(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            setFetching(false);
          }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setFetching(false);
        console.log(errorCode, errorMessage);
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
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignupButton}>
        {
          fetching ? (
            <ActivityIndicator color="#fff" size='small'/>
          ) : (
            <Text style={styles.signupButtonText}>Cadastrar</Text>
          )
        }
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => navigation.navigate("Login")}>
        <Text>
          Já possui uma conta? <Text style={styles.signUpButtonText}>Faça Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
