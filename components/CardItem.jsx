import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function CardItem({textIcon, title, icon, handlePress}) {
  let IconComponent = MaterialIcons;
  return (
    <View className="items-center justify-center">
       <TouchableOpacity on onPress={handlePress} className="bg-bgButton w-20 h-20 mb-2 justify-center items-center rounded-lg">
          {textIcon && <Text className="font-rMedium text-primary text-3xl">{textIcon}</Text>}
          {icon && <IconComponent name={icon} size={28} color="#4169e1"/>}
        </TouchableOpacity>
        <Text className="text-base font-rRegular">{title}</Text>
    </View>
  )
}