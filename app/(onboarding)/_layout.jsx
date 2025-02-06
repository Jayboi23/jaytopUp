import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function 
() {
  return (
   <Stack>
    <Stack.Screen name='loginScreen' options={{headerShown: false}}/>
    <Stack.Screen name='registerScreen' options={{headerShown: false}}/>
    <Stack.Screen name='resetPasswordScreen' options={{headerShown: false}}/>
   </Stack>
  )
}