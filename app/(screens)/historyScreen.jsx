import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const data = [
  {
    id: "1",
    title: "Deposited to wallet",
    amount: "+500",
    timeStamp: "09:08 pm",
    transactionId: "PAYSTACK1753211532",
  },
  {
    id: "2",
    title: "Deposited to wallet",
    amount: "+500",
    timeStamp: "09:08 pm",
    transactionId: "PAYSTACK1753211532",
  },
  {
    id: "3",
    title: "Deposited to wallet",
    amount: "+500",
    timeStamp: "09:08 pm",
    transactionId: "PAYSTACK1753211532",
  },
];

export default function history() {
  return (
    <View className="px-3 flex-1 bg-white">
      <Text className="mt-3 font-rMedium text-lg">Showing the list of all Transacctions</Text>
  <ScrollView className="mt-3">
      {data.map((item)=>(
        <View  key={item.id} className="bg-gray-100 mb-2 p-3 gap-y-2 rounded-lg">
          <View className="flex-row justify-between">
            <Text className="font-rMedium text-base">{item.transactionId}</Text>
            <Text className="font-rMedium text-green-700 text-base">{item.amount}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-rRegular text-base">{item.title}</Text>
            <Text className="font-rRegular text-base">{item.timeStamp}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
    </View>
  
  )
}