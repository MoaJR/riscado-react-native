import React from 'react';
import {AntDesign} from '@expo/vector-icons'

import { Text, View } from 'react-native';
import { styles } from '../styles/LogoStyles';

function Logo({style}) {
  return (
    <View style={[styles.container, style]}>
      <AntDesign name="check" style={styles.check} />
      <Text style={styles.title}>Riscado</Text>
      <View style={styles.trace} />
    </View>
  );
}

export default Logo;
