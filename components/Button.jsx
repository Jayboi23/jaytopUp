import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button({title, containerStyle, handlePress}) {
  return (
    <TouchableOpacity onPress={handlePress} className= {`bg-white items-center ${containerStyle} justify-center p-2 w-[90%] rounded-full`}>
    <Text className="text-primary font-rRegular text-xl">{title}</Text>
  </TouchableOpacity>
  )
}