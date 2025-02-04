import { View, Text, TextInput, ScrollView } from "react-native";
import React from "react";
import Button from "../../components/Button";

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

export default function fundingScreen() {
  return (
    <View className="flex-1 bg-white px-3">
      <View className="bg-primary w-full shadow shadow-black/30 h-[40%] mt-5 items-center rounded-xl mb-10">
        <Text className="font-rMedium text-white text-xl mt-5 mb-5">
          Secure payment with paystack{" "}
        </Text>

        <TextInput
          placeholder="Jayboi"
          className="w-[95%] bg-transparent border border-bgButton h-14 font-rRegular text-lg text-white px-3 rounded-xl mb-3"
        />

        <TextInput
          placeholder="example@gmail.com"
          className="w-[95%] bg-transparent border border-bgButton h-14 font-rRegular text-lg text-white px-3 rounded-xl mb-3"
        />

        <TextInput
          placeholder="Amount"
          className="w-[95%] bg-transparent border border-bgButton h-14 font-rRegular text-lg text-white px-3 rounded-xl mb-10"
        />

        <Button 
        title="Pay Now" 
        containerStyle="bg-white"
        textStyles="text-primary"
        />
      </View>

      <Text className="font-rRegular text-xl mb-3">Latest Transactions</Text>

      <View>
       
        <ScrollView>
        
            {data.map((item) => (
              <View id={item.id} className="w-full p-5 bg-bgButton mb-3 gap-y-3 rounded-lg">
                <View className="flex-row justify-between">
                  <Text className="font-rMedium text-base">{item.transactionId}</Text>
                  <Text className="font-rMedium text-base text-green-700">{item.amount}</Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="font-rRegular text-base">{item.title}</Text>
                  <Text className="font-rRegular text-base">{item.timeStamp}</Text>
                </View>
              </View>
            ))}
      
        </ScrollView>
      </View>
    </View>
  );
}
