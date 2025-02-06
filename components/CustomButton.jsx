import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Button({title, containerStyle, icon, handlePress, textStyles, color}) {
  let IconComponent = AntDesign
  return (
    <TouchableOpacity onPress={handlePress} className={`h-14 ${containerStyle} rounded-xl items-center justify-center`}>
    <View className="flex-row gap-x-2">
    <Text className={`text-xl font-rMedium ${textStyles}`}>{title}</Text>
    {icon &&  <IconComponent name={icon} size={24} color={color} />}
    </View>
  </TouchableOpacity>
  )
}