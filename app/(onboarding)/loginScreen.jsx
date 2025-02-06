import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import images from '../../constants/images'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
import Animated, { FadeIn, FadeInUp, FadeOut, Easing, FadeInDown } from 'react-native-reanimated';


export default function loginScreen() {
  return (
    <View className="bg-primary flex-1">
      
      <View className="bottom-64 left-14">
      <Image source={images.Circle}/>
      </View>

      <Animated.Text entering={FadeInUp.delay(200).duration(1000).easing(Easing.ease)} className="-mt-60 font-rBold text-4xl mx-3 text-white mb-2">Login</Animated.Text>
      <Animated.Text entering={FadeInUp.delay(300).duration(1000).easing(Easing.ease)} className="font-rRegular text-lg mx-3 mb-10 text-bgButton">Please fill your details to continue</Animated.Text>

        {/* form */}
        <Animated.View entering={FadeInUp.delay(400).duration(1000).easing(Easing.ease)} className="items-start justify-center w-full px-3 mb-64" >
         
          <TextInput placeholder='Email' placeholderTextColor="#dbdbfe" className="bg-transparent border border-bgButton w-full h-14 text-lg font-rRegular px-3 self-center rounded-xl mb-3"/>
        
          <TextInput placeholder='Password' secureTextEntry placeholderTextColor="#dbdbfe" className="bg-transparent border border-bgButton w-full h-14 text-lg font-rRegular px-3 self-center rounded-xl mb-3"/>
          
          <TouchableOpacity  className="mb-2">
            <Text className="text-base text-white font-rRegular">Forgotten Password?</Text>
            </TouchableOpacity>
         
           
            <CustomButton
            title="LOGIN"
            containerStyle="w-[50%] bg-white self-end"
            textStyles="text-primary"
            icon="arrowright"
            color="#4169e1"
            handlePress={() => router.push("/home")}
            />
        
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(1000).easing(Easing.ease)} className="flex-row items-center justify-center gap-x-1">
          <Text className="text-lg font-rMedium text-white">Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/registerScreen")}><Text className="text-lg font-rMedium text-bgButton underline">Sign up</Text></TouchableOpacity>
        </Animated.View>
     
    </View>
  )
}