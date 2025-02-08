import { View, Text, TouchableOpacity } from "react-native";
import React,{useState} from "react";
import { StatusBar } from "expo-status-bar";
import Entypo from '@expo/vector-icons/Entypo';
import CardItem from "../../components/CardItem";
import Swiper from 'react-native-swiper'
import { router } from "expo-router";

export default function home() {
  const [eyeClicked, setEyeClicked] = useState(false)

  const handleEyeClicked = () =>{
    setEyeClicked(!eyeClicked)
  }

  return (
    <View className="flex-1 bg-white">
      
      <View className="bg-primary h-48">
        <View>
          <Text className="font-rMedium text-white mt-20 text-2xl mx-3 mb-5">
            Welcome Back, Jayboi
          </Text>
        </View>
        
        <View className="bg-white shadow h-32 self-center w-[95%] rounded-xl p-5 justify-center">
          <View className="flex-row w-[100%] justify-between mb-2">
            <Text className="font-rRegular text-base">Available Balance</Text>
            <TouchableOpacity onPress={handleEyeClicked}>
            <Entypo name={eyeClicked ? "eye" : "eye-with-line"} size={22} color="black" />
            </TouchableOpacity>
          </View>
          { eyeClicked ? <Text className="font-rMedium text-3xl">₦****</Text> : <Text className="font-rMedium text-3xl">₦1200</Text>}
        </View>

      </View>

      <View className="mt-24 flex-row justify-around mb-5">
        <CardItem textIcon="₦" title="Fund Wallet" handlePress={() => router.push("/fundingScreen")}/>

        <CardItem icon="call" title="Buy Airtime" handlePress={() => router.push("/buyAirtimeScreen")}/>

        <CardItem icon="cell-wifi" title="Buy Data" handlePress={() => router.push("/buyDataScreen")}/>

        <CardItem icon="history" title="View History" handlePress={() => router.push("/historyScreen")}/>
      </View>

      <View className="w-[95%] self-center h-[15%]">
      <Swiper 
      autoplay 
      className="rounded-xl">
        <View className="bg-primary w-full h-full items-center justify-center">
        <Text className="text-2xl font-rMedium text-white">Advertise </Text>
        </View>
        <View className="bg-primary w-full h-full items-center justify-center">
        <Text className="text-2xl font-rMedium text-white">your</Text>
        </View>
        <View className="bg-primary w-full h-full items-center justify-center">
        <Text className="text-2xl font-rMedium text-white"> business </Text>
        </View>
        <View className="bg-primary w-full h-full items-center justify-center">
        <Text className="text-2xl font-rMedium text-white"> here! </Text>
        </View>
        <View className="bg-primary w-full h-full items-center justify-center">
        <Text className="text-xl font-rMedium text-white">Chat us on Whatsapp 08156136183 </Text>
        </View>
      </Swiper>
      </View>
    

      {/* <View className="bg-primary h-56 w-[95%] self-center rounded-xl items-center justify-center">
        <Text className="text-2xl font-rMedium text-white">Advertise your business here! </Text>
        <Text className="text-xl font-rMedium text-white">Chat on Whatsapp 08156136183 </Text>
      </View> */}

      <StatusBar style="light" />
    </View>
  );
}
