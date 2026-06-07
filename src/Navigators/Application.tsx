import { Colors, Texts } from '@/Constants'
import { HomeScreen, SplashScreen } from '@/Navigators/Stack'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StatusBar } from 'react-native'
import { navigationRef } from './utils'
import MemeDetailScreen from '@/Containers/MemeDetail/MemeDetailScreen'
import type { RootStackParamList } from '@/Type/navigation'

const Stack = createNativeStackNavigator<RootStackParamList>()

const ApplicationNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'fade' }}
        initialRouteName={Texts.HomeScreen}
      >
        <Stack.Screen name={Texts.Splash} component={SplashScreen} />
        <Stack.Screen name={Texts.HomeScreen} component={HomeScreen} />
        <Stack.Screen name={Texts.MemeDetailScreen} component={MemeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ApplicationNavigator
