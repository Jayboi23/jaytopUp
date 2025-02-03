import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='home' options={{headerShown: false}}/>
      <Stack.Screen name='buyAirtimeScreen' options={{headerShown: false}}/>
      <Stack.Screen name='buyDataScreen' options={{headerShown: false}}/>
      <Stack.Screen name='fundingScreen' 
      options={{
        headerBackTitle: "Back",
        headerTitle: 'Fund Wallet',
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#4169e1"
        }
        }}/>
      <Stack.Screen name='historyScreen' options={{headerShown: false}}/>
    </Stack>
  )
}