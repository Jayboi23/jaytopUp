import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Index() {

  return (
    <View className="flex-1 bg-primary items-center"> 
      <Text className="font-rBold text-5xl mt-[80%] text-white mb-1">JayTopUp</Text>
      <Text className="text-white font-rRegular text-base mb-72">Your reliable Airtime and Data Vendor</Text>
      
      <TouchableOpacity onPress={() => router.push("/home")} className="bg-primary mb-1 border border-white w-20 h-20 rounded-full items-center justify-center">
      <MaterialIcons name="navigate-next" size={40} color="white" />
      </TouchableOpacity>

      <Text className="text-white font-rMedium text-xl">Tap to continue</Text>
    </View>
  );
}
