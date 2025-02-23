import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated,{ BounceIn } from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';

export default function sucessScreen() {
  const { transactionHistory } = useLocalSearchParams()
  const historyData = typeof transactionHistory === "string" ? JSON.parse(transactionHistory) : transactionHistory;

  return (
    <View className="flex-1 bg-white items-center justify-center">
      
      <View className="bg-bgButton/40 bottom-[40] rounded-xl w-[95%] gap-y-3 p-5 items-center justify-center">
      <Text  className="font-rMedium  text-xl">Transaction Successful</Text>

      {historyData.plan ?  <Text className="font-rRegular text-lg text-center">Data purchased for <Text className="font-rBold">{historyData.mobile_number}</Text> has been sent.</Text> :       <Text className="font-rRegular text-lg text-center">Airtime purchased for <Text className="font-rBold">{historyData.mobile_number}</Text> has been sent.</Text>}
      </View>
      
      <Animated.View entering={BounceIn.delay(200).duration(2000)} className="bg-primary/30 w-40 h-40 z-10 top-[190] absolute items-center justify-center rounded-full">
        <View className="bg-primary w-20  h-20 items-center justify-center rounded-full">
        <AntDesign name="check" size={36} color="#fff" />
        </View>
      </Animated.View>

      <View className="bg-bgButton/40 w-[95%] h-[65%] rounded-xl p-5 mt-5">

      <Text className="text-xl font-rBold text-primary  mb-5 mt-36">
                    Transaction Details
                  </Text>

                  <View className="flex-row items-center justify-between mb-3">
                    <Text className="font-rMedium text-base">Transaction ID</Text>
                    <Text className="font-rRegular text-placeHolderText text-base">
                    {historyData.ident.slice(0,25)}
                    </Text>
                  </View>
      
                  <View className="flex-row items-center justify-between mb-3">
                    <Text className="font-rMedium text-base">Mobile Number</Text>
                    <Text className="font-rRegular text-placeHolderText text-base">
                    {historyData.mobile_number}
                    </Text>
                  </View>
      
                  <View className="w-full h-[1] bg-bgButton" />
      
                  <View className="flex-row items-center justify-between mt-3 mb-3">
                    <Text className="font-rMedium text-base">Network provider</Text>
                    <Text className="font-rRegular text-placeHolderText text-base">
                      {historyData.plan_network}
                    </Text>
                  </View>
      
                  <View className="w-full h-[1] bg-bgButton" />

                  {historyData.plan ?  <View className="flex-row items-center justify-between mt-3 mb-3">
                    <Text className="font-rMedium text-base">Plan size</Text>
                    <Text className="font-rRegular text-placeHolderText text-base">
                      {historyData.plan_name}
                    </Text>
                  </View>: null}

                  {historyData.plan ? <View className="w-full h-[1] bg-bgButton" /> : null}

                  <View className="flex-row items-center justify-between mt-3 mb-3">
                    {historyData.plan ? <Text className="font-rMedium text-base">Plan amount</Text> : <Text className="font-rMedium text-base">Airtime amount</Text>}
                    <Text className="font-rRegular text-placeHolderText text-base">
                    ₦{historyData.plan_amount}
                    </Text>
                  </View>
      
                  <View className="w-full h-[1] bg-bgButton" />
      
                  {/* <View className="flex-row items-center justify-between mt-3 mb-3">
                    <Text className="font-rMedium text-base">Amount</Text>
                    <Text className="font-rRegular text-placeHolderText text-base">
                      ₦500
                    </Text>
                  </View> */}
      
                  <View className="w-full h-[1] bg-bgButton" />
      
                  <View className="flex-row items-center justify-between mt-3 mb-3">
                    <Text className="font-rMedium text-base">Transaction fee</Text>
                   {historyData.plan ?  <Text className="font-rRegular text-placeHolderText text-base">
                      ₦20.00
                    </Text> :  <Text className="font-rRegular text-placeHolderText text-base">
                      ₦0.00
                    </Text>}
                  </View>
      
                  <View className="w-full h-[1] bg-bgButton" />
      
                  <View className="flex-row items-center justify-between mt-3 mb-3">
                    <Text className="font-rMedium text-base">Amount paid</Text>
                   {historyData.plan ?  <Text className="font-rRegular text-placeHolderText text-base">
                      ₦{parseInt(historyData.plan_amount) + parseInt(20)}.00
                    </Text> :  <Text className="font-rRegular text-placeHolderText text-base">
                      ₦{historyData.plan_amount}
                    </Text>}
                  </View>

                  <View className="w-full h-[1] bg-bgButton" />

                  <View className="flex-row items-center justify-between mt-3 mb-3">
                    <Text className="font-rMedium text-base">Date</Text>
                    <Text className="font-rRegular text-placeHolderText text-base">
                      {new Date(historyData.create_date).toLocaleString()}
                    </Text>
                  </View>


                  <View className="w-full h-[1] bg-bgButton mb-14" />

                  <TouchableOpacity onPress={() => router.push("/home")} className="self-center">
                      <Text className="text-xl text-primary font-rMedium">Done</Text>
                    </TouchableOpacity>

      </View>
    </View>
  )
}