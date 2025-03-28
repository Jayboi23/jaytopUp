import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, {useState, useRef} from 'react'
import CustomButton from "../../components/CustomButton"
import { router, useLocalSearchParams } from 'expo-router';
import { postBuyAirtime } from '../../APIs/buyAirtime';
import { postBuyData } from '../../APIs/buyData';
import { updateBalane } from '../../APIs/updateBalance';

const CELL_COUNT = 4; // Number of PIN digits

export default function pinScreen() {
  const { network_id, amount, phone, plan_id, id } = useLocalSearchParams();

    const [pin, setPin] = useState(Array(CELL_COUNT).fill('')); // Array to store PIN digits
    const [error1, setError1] = useState("")
    const inputs = useRef([]); // Refs for each TextInput
  
    // Handle text change in a specific input
    const handleChangeText = (text, index) => {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);
  
      // Auto-focus the next input
      if (text && index < CELL_COUNT - 1) {
        inputs.current[index + 1].focus();
      }
    };
  
    // Handle backspace to move focus to the previous input
    const handleKeyPress = (event, index) => {
      if (event.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
        inputs.current[index - 1].focus();
      }
    };


  const handleErrorTimeOut = () =>{
    setTimeout(()=>{
      setError1("")
    },3000)
  }

  let newRef = ""
  let tAmonut = ""
  let tType = ""
  let tRecpientNumber = ""
  let tPlanNetwork = ""
  let tPlanName = ""


  const handleWalletUpdate = async (newRef, tAmonut, tType, tRecpientNumber, tPlanNetwork ) =>{
    const type = "debit"
    const ref = newRef
    try{
        await updateBalane(id, amount, type, ref, tAmonut, tType, tRecpientNumber, tPlanNetwork)
    }catch (error){
      Alert.alert(error.message)
    }
  }
  
    // Handle PIN submission
    const handleSubmit = async (enteredPin) => {

      if (network_id && amount && phone) {
        
        if (enteredPin === "" || enteredPin !== "1234") {
          setError1("Incorrect pin")
          handleErrorTimeOut();
          return;
        }else {
          try{
            const airtimePurchase = await postBuyAirtime(network_id, amount, phone)
            const history = airtimePurchase;
            console.log("History", history)
            newRef = history.ident
            tRecpientNumber = history.mobile_number
            tAmonut = history.plan_amount
            tType = history.airtime_type
            tPlanNetwork = history.plan_network
            handleWalletUpdate(newRef, tRecpientNumber, tAmonut, tType, tPlanNetwork)
              router.push({pathname: "/successScreen", params:{transactionHistory: JSON.stringify(history, null, 2), id: id}})
          }catch(error){
            console.error(error)
          }
        }
    
      }else if (network_id && phone && plan_id) {
        try{
          const dataPurchase = await postBuyData(network_id, phone, plan_id);
          const history = dataPurchase;
          console.log("History Response", history)
            router.push({pathname: "/successScreen", params:{transactionHistory: JSON.stringify(history, null, 2), id: id}})
        }catch(error){
          console.error(error)
        }
      }
      

      // Add your logic to verify the PIN here
    };

  return (
    <View className="bg-white flex-1 items-center gap-y-5">
    <Text className="text-2xl font-rMedium mt-60">Enter Your PIN</Text>
    <View className="flex-row gap-x-5">
      {Array(CELL_COUNT)
        .fill()
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            className="w-14 h-14 border font-rRegular text-center rounded-lg"
            value={pin[index]}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            keyboardType="number-pad"
            maxLength={1}
            secureTextEntry // Hide the entered text
            autoFocus={index === 0} // Auto-focus the first input
          />
        ))}
    </View>
    {error1 && (<Text className=" text-red-500 text-lg font-rRegular">{error1}</Text>)}
    {/* <TouchableOpacity className="bg-primary w-[50%] h-14" onPress={() => handleSubmit(pin.join(''))}>
      <Text >Submit</Text>
    </TouchableOpacity> */}
    <CustomButton
    title="Submit"
    textStyles="text-white"
    containerStyle="bg-primary w-[50%] mt-10"
    handlePress={() => handleSubmit(pin.join(''))}
    />
  </View>
  )
}


