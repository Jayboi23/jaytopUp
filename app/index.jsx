import { Text, TouchableOpacity, View, Image } from "react-native";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import images from '../constants/images'
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeIn, FadeInUp, FadeOut, Easing, FadeInDown } from 'react-native-reanimated';


export default function Index() {

  return (
    <View className="flex-1 bg-white items-center"> 

    <StatusBar style="dark"/>
    
    <Animated.Text entering={FadeInUp.delay(200).duration(1000).easing(Easing.ease).springify().damping(3)} className="font-rBold text-6xl text-primary mb-1 mt-56">JayTopUp</Animated.Text>
    <Animated.Text entering={FadeInUp.delay(300).duration(1000).easing(Easing.ease)} className="text-primary font-rRegular text-lg">Your reliable Airtime and Data Vendor</Animated.Text>
   
      
      <Animated.View entering={FadeInDown.delay(400).duration(1000).easing(Easing.ease)} className="mt-[730] z-10 items-center justify-center absolute">

      <TouchableOpacity onPress={() => router.push("/loginScreen")} className="bg-primary mb-1 border border-white w-28 h-28 rounded-full items-center justify-center">
        
        <View className="bg-white w-14 h-14 rounded-full items-center justify-center">
        <MaterialIcons name="navigate-next" size={40} color="#4169e1" />
        </View>
      
      </TouchableOpacity>
      </Animated.View>
  

      <View className="bg-red-500 w-full">
     
        <Image className="absolute -right-6 top-44"  source={images.Footer}/>
      </View>
    </View>
  );
}
