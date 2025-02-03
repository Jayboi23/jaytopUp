import { Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button"
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 bg-primary items-center"> 
      <Text className="font-rBold text-5xl mt-[80%] text-white mb-1">JayTopUp</Text>
      <Text className="text-white font-rRegular text-base">Your reliable Airtime and Data Vendor</Text>
      <Button
      containerStyle="mt-[100%]"
      title="Continue"
      handlePress={() => router.push("/home")}
      />
    </View>
  );
}
