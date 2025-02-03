import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import CardItem from "../../components/CardItem";

export default function home() {
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
            <TouchableOpacity>
              <AntDesign name="eye" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text className="font-rMedium text-4xl">₦1200</Text>
        </View>

      </View>

      <View className="mt-24 flex-row justify-around">
        <CardItem textIcon="₦" title="Fund Wallet" />

        <CardItem icon="call" title="Buy Airtime" />

        <CardItem icon="cell-wifi" title="Buy Data" />
      </View>

      <StatusBar style="light" />
    </View>
  );
}
