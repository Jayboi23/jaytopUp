import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button({title, containerStyle, handlePress, textStyles}) {
  return (
    <TouchableOpacity onPress={handlePress} className= {`items-center ${containerStyle} justify-center p-2 w-[90%] rounded-full`}>
    <Text className={`font-rRegular ${textStyles} text-xl`} >{title}</Text>
  </TouchableOpacity>
  )
}