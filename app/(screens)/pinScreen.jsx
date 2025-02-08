import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, {useState, useRef} from 'react'
import CustomButton from "../../components/CustomButton"
import { router } from 'expo-router';

const CELL_COUNT = 4; // Number of PIN digits

export default function pinScreen() {
    const [pin, setPin] = useState(Array(CELL_COUNT).fill('')); // Array to store PIN digits
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
  
      // If the last input is filled, submit the PIN
      if (index === CELL_COUNT - 1 && text) {
        handleSubmit(newPin.join(''));
      }
    };
  
    // Handle backspace to move focus to the previous input
    const handleKeyPress = (event, index) => {
      if (event.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
        inputs.current[index - 1].focus();
      }
    };
  
    // Handle PIN submission
    const handleSubmit = (enteredPin) => {
      // Alert.alert('PIN Entered', `You entered: ${enteredPin}`);
      router.push("/successScreen")

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


