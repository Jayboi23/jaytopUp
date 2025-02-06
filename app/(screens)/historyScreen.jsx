import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
  const [isClicked, setIsClicked] = useState(false);
  const [radioClicked, setRadioClicked] = useState(false)
  const [radioClicked2, setRadioClicked2] = useState(false)
  const [radioClicked3, setRadioClicked3] = useState(false)
  const [radioClicked4, setRadioClicked4] = useState(true)

  const handleClick  = () =>{
    setIsClicked(!isClicked)
  }

  const handleRadioClick = () =>{
    setRadioClicked(true)
    setRadioClicked2(false)
    setRadioClicked3(false)
    setRadioClicked4(false)
  }

  const handleRadioClick2 = () =>{
    setRadioClicked(false)
    setRadioClicked2(true)
    setRadioClicked3(false)
    setRadioClicked4(false)
  }
  const handleRadioClick3 = () =>{
    setRadioClicked(false)
    setRadioClicked2(false)
    setRadioClicked3(true)
    setRadioClicked4(false)
  }

  const handleRadioClick4 = () =>{
    setRadioClicked(false)
    setRadioClicked2(false)
    setRadioClicked3(false)
    setRadioClicked4(true)
  }

  return (
    <View className="px-3 flex-1 bg-white">
      
      <View className="flex-row justify-between items-center mt-5 mb-5">
      <Text className="font-rMedium text-lg">Filter Transactions by</Text>
      
      <TouchableOpacity onPress={handleClick}>
      <MaterialIcons name={isClicked ? "filter-list-off" : "filter-list"} size={24} color="black" />
      </TouchableOpacity>
      
      </View>

      {isClicked && (<View className="bg-bgButton/40 p-3 gap-y-2 h-36 mb-2 rounded-xl"> 
        <TouchableOpacity onPress={handleRadioClick4} className=" items-center flex-row gap-x-1"><MaterialIcons name={radioClicked4 ? "radio-button-checked" : "radio-button-unchecked"} size={14} color="black" /><Text className="font-rMedium text-base">All Transactions</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleRadioClick} className="items-center flex-row gap-x-1"><MaterialIcons name={radioClicked ? "radio-button-checked" : "radio-button-unchecked"} size={14} color="black" /><Text className="font-rMedium text-base">Deposits only</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleRadioClick2} className="items-center flex-row gap-x-1"><MaterialIcons name={radioClicked2 ? "radio-button-checked" : "radio-button-unchecked"} size={14} color="black" /><Text className="font-rMedium text-base">Airtime only</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleRadioClick3} className="items-center flex-row gap-x-1"><MaterialIcons name={radioClicked3 ? "radio-button-checked" : "radio-button-unchecked"} size={14} color="black" /><Text className="font-rMedium text-base">Data only</Text></TouchableOpacity>

    </View>)}
   
  <ScrollView className="">
      {data.map((item)=>(
        <View  key={item.id} className="bg-bgButton/40 mb-2 p-3 gap-y-2 rounded-lg">
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