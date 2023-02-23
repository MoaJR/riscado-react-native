import React from 'react'
import { View } from 'react-native'
import { styles } from '../styles/ProgressBarStyles'

export default function ProgressBar({item}) {
  return (
    <View style={styles.progressBarContainer}>
      {
        item.todos.length > 0 ? (
          <View style={[styles.progressBar, {width: `${(item.todos.filter((todo) => todo.completed).length / item.todos.length) * 100}%`}]} />
        ) : (
          <View style={[styles.progressBar, {width: "0%"}]} />
        )
      }
    </View>
  )
}