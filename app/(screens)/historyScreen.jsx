import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getCurrentUser } from "../../APIs/getCurrrentUser";
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function history() {
  const { id } = useLocalSearchParams()
    const [response, setResponse] = useState([])

   useEffect(() => {
     const getUserDetails = async () =>{
       try{
         const userDetails = await getCurrentUser(id)
         setResponse(userDetails.transactions)
       }catch(error){
         Alert.alert(error.message)
       }
     }
   
     getUserDetails()
    },[])

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

  
  const sortedTranscations = response.sort((a,b) =>
    new Date(b.date) - new Date(a.date)
  )

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
      {sortedTranscations.length > 0 ? sortedTranscations.map((item)=>(
        <View  key={item.reference} className="bg-bgButton/40 mb-2 p-3 gap-y-2 rounded-lg">
          <View className="flex-row justify-between">

            <View className="flex-row items-center space-x-2">
            <Text className="font-rMedium text-base">{item.reference.slice(0, 20)}</Text>
            </View>

            <Text className={`font-rMedium ${item.type === "credit" ? 'text-green-700' : 'text-red-700'}  text-base`}>{item.type === "credit" ? item.amount : -item.amount}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-rRegular text-base">{item.description}</Text>
            <Text className="font-rRegular text-base">{new Date(item.date).toLocaleString()}</Text>
          </View>
        </View>
      )) : 
      <View className="bg-bgButton/40 items-center justify-center h-20  mb-2 p-3 gap-y-2 rounded-lg">
        <Text className="font-rMedium text-base">Your transactions will appear here</Text>
    </View>}
    </ScrollView>
    </View>
  
  )
}