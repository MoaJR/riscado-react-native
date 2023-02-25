import { View, Text, TextInput } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "../styles/ForminputStyles";
import { colors } from "../styles/colors";

const FormInput = ({refInner, onChangeText, iconName, ...props}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.inputContainer}>
        <TextInput
          {...props}
          ref={refInner}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, {borderColor: isFocused ? colors.primary : colors.lightGray}]}
          onChangeText={onChangeText}
        />
        <AntDesign
          name={iconName}
          style={[styles.icon, {color: isFocused ? colors.primary : colors.lightGray}]}
        />
      </View>
  );
};

export default FormInput;
