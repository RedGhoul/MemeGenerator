import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Fonts } from '@/Constants'
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/Ionicons'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'This is some something 👋',
            onPress: () => {
              Toast.hide()
            },
          })
        }}
      >
        <Text>Toast</Text>
      </TouchableOpacity>
      <Icon name='home' size={20} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.BeVietnamProMedium,
    fontSize: 20,
  },
  btn: {
    margin: 20,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'pink',
  },
})
