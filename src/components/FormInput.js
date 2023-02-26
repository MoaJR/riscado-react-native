import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import { styles } from "../styles/ForminputStyles";
import { colors } from "../styles/colors";

const FormInput = ({ refInner, onChangeText, iconName, isPassword, ...props }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        {...props}
        secureTextEntry={!isPasswordVisible}
        ref={refInner}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          { borderColor: isFocused ? colors.primary : colors.lightGray },
        ]}
        onChangeText={onChangeText}
      />
      <AntDesign
        name={iconName}
        style={[styles.icon, { color: isFocused ? colors.primary : colors.lightGray }]}
      />
      {isPassword ? (
        <View style={styles.passwordContainer}>
          <TouchableOpacity
            style={styles.iconPasswordTouch}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <MaterialCommunityIcons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              style={[
                styles.iconPassword,
                { color: isFocused ? colors.primary : colors.lightGray },
              ]}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default FormInput;
