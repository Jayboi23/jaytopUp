import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import React,{useState, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import Entypo from '@expo/vector-icons/Entypo';
import CardItem from "../../components/CardItem";
import Swiper from 'react-native-swiper'
import { router, useLocalSearchParams } from "expo-router";
import { getCurrentUser } from "../../APIs/getCurrrentUser";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function home() {
  const [eyeClicked, setEyeClicked] = useState(false)
  const { id } = useLocalSearchParams()
  const [displayName, setDisplayName] = useState("")
  const [walletBalance, setWalletBalance] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  const handleEyeClicked = () =>{
    setEyeClicked(!eyeClicked)
  }

 useEffect(() => {
  const getUserDetails = async () =>{
    try{
      const userDetails = await getCurrentUser(id)
      setDisplayName(userDetails.username)
      setWalletBalance(userDetails.walletBalance)
      setRefreshing(false)
    }catch(error){
      Alert.alert(error.message)
    }
  }

  getUserDetails()
 },[refreshing])

 const handleRefreshing = () =>{
  setRefreshing(true)
 }

  return (
    <View className={`flex-1 bg-primary `}>
      <View className="bg-white flex-1">
      <ScrollView 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefreshing}
      colors={["#4169e1"]}
      tintColor="#4169e1"
      title="Refreshing..."
      titleColor="#4169e1"
      />} 
      showsVerticalScrollIndicator={false}
      
      >
      <View className="bg-primary h-48">
        <View>
          <Text className="font-rMedium text-white mt-20 text-2xl mx-3 mb-5">
            Welcome Back, {displayName}
          </Text>
        </View>
        
        <View className="bg-white shadow h-32 self-center w-[95%] rounded-xl p-5 justify-center">
          <View className="flex-row w-[100%] justify-between mb-2">
            <Text className="font-rRegular text-base">Available Balance</Text>
            <TouchableOpacity onPress={handleEyeClicked}>
            <Entypo name={eyeClicked ? "eye" : "eye-with-line"} size={22} color="black" />
            </TouchableOpacity>
          </View>
          { eyeClicked ? <Text className="font-rMedium text-3xl">₦****</Text> : <Text className="font-rMedium text-3xl">₦{walletBalance}</Text>}
        </View>

      </View>

      <View className="mt-24 flex-row justify-around mb-5">
        <CardItem textIcon="₦" title="Fund Wallet" handlePress={() => router.push({ pathname: "/fundingScreen", params: {id: id, displayName: displayName}})}/>

        <CardItem icon="call" title="Buy Airtime" handlePress={() => router.push("/buyAirtimeScreen")}/>

        <CardItem icon="cell-wifi" title="Buy Data" handlePress={() => router.push("/buyDataScreen")}/>

        <CardItem icon="history" title="View History" handlePress={() => router.push("/historyScreen")}/>
      </View>

      <View className="w-[95%] self-center h-[15%]">
      <Swiper 
      height={200}
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
      
</ScrollView>
        
</View>
      <StatusBar style="light" />
    </View>
  );
}
