import { View, Text, Image, TextInput, TouchableOpacity , ScrollView, Alert, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import images from '../../constants/images'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
import Animated, { FadeIn, FadeInUp, FadeOut, Easing, FadeInDown } from 'react-native-reanimated';
import { signUp } from '../../APIs/signUp'

export default function registerScreen() {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confimPasswod, setConfirmPassword] = useState("")
  const [pin, setPin] = useState("")
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);
  const [error5, setError5] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    const isValid = emailRegex.test(input);
    setIsValidEmail(isValid);
  };

  const handleInputChange = (text) => {
    // Remove non-numeric characters using regex
    const numericText = text.replace(/[^0-9]/g, '');
    setPin(numericText);
  };

  const handleErrortimeOut = () =>{
    setTimeout(()  =>{
      setError1(false)
      setError2(false)
      setError3(false)
      setError4(false)
      setError5(false)
    },3000)
  }

  const fieldValidation = async () =>{
    if (!displayName){
      setError1("Please enter a username")
      handleErrortimeOut()
      return;
    }else if (!email) {
      setError2("Enter your email")
      handleErrortimeOut()
      return;
    }else if(!pin) {
      setError3("Enter your transaction pin")
      handleErrortimeOut()
      return;
    }else if (!password) {
      setError4("Choose a password")
      handleErrortimeOut()
      return;
    }else if (!confimPasswod) {
      setError5("Password does not match!")
      handleErrortimeOut()
      return;
    }else if (password !== confimPasswod) {
      setError5('Pasword does not match')
      handleErrortimeOut()
      return;
    }

    handleSubmit()
  }

  const handleSubmit = async () => {
    try{
      setIsLoading(true)
      const response = await signUp(displayName, email, password, pin)
      setIsLoading(false)
       Alert.alert(response.message)
    }catch (error)  {
      Alert.alert(error.message)
      setIsLoading(false)
    }
  }

  const handleSignUp  = async () => {
    fieldValidation()
  };

   if (isLoading){
            return <View className="flex-1 justify-center items-center bg-white"><ActivityIndicator size="small"/></View>
          }

  return (
        <View className="bg-primary flex-1">
          
          <View className="bottom-64 left-14">
          <Image source={images.Circle}/>
          </View>
    
          <Animated.Text entering={FadeInUp.delay(200).duration(1000).easing(Easing.ease)} className="-mt-60 font-rBold text-4xl mx-3 text-white mb-5">Create account</Animated.Text>
    
            {/* form */}
            <Animated.View entering={FadeInUp.delay(200).duration(1000).easing(Easing.ease)} className="items-start justify-center w-full px-3 mb-40" >
              <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets className="w-full">
            <TextInput placeholder='Username' onChangeText={(text) => setDisplayName(text)} placeholderTextColor="#dbdbfe" className="bg-transparent border border-bgButton w-full h-14 text-lg font-rRegular text-white px-3 self-center rounded-xl mb-3"/>
            {error1 && (<Text className="text-red-600 font-rRegular mb-1 -mt-2 self-start">{error1 }</Text>)}
              <TextInput keyboardType="email-address" autoCapitalize="none" placeholder='Email' onChangeText={(text) => {setEmail(text), validateEmail(text)}} placeholderTextColor="#dbdbfe" className="bg-transparent border border-bgButton w-full h-14 text-lg font-rRegular px-3 text-white self-center rounded-xl mb-3"/>
                 {error2 && (<Text className="text-red-600 font-rRegular mb-1 -mt-2 self-start">{error2 }</Text>)}
                        {email.length > 0 && !isValidEmail && (
                        <Text className={`text-red-600 font-rRegular mb-1 -mt-2 self-start`}>
                           Invalid email
                        </Text>
                      )}
              <TextInput placeholder='Set your 6 digits transaction pin' keyboardType='numeric' onChangeText={handleInputChange} secureTextEntry placeholderTextColor="#dbdbfe" className="bg-transparent border border-bgButton text-white w-full h-14 text-lg font-rRegular px-3 self-center rounded-xl mb-3"/>
              {error3 && (<Text className="text-red-600 font-rRegular mb-1 -mt-2 self-start">{error3 }</Text>)}
              <TextInput placeholder='Password' onChangeText={(text) => setPassword(text)} secureTextEntry placeholderTextColor="#dbdbfe" className="bg-transparent border border-bgButton w-full h-14 text-white text-lg font-rRegular px-3 self-center rounded-xl mb-3"/>
              {error4 && (<Text className="text-red-600 font-rRegular mb-1 -mt-2 self-start">{error4 }</Text>)}
              <TextInput placeholder='Confirm Password' onChangeText={(text) => setConfirmPassword(text)} secureTextEntry placeholderTextColor="#dbdbfe" className={`bg-transparent border ${error1 ?  "mb-1" : "mb-5"} border-bgButton text-white w-full h-14 text-lg font-rRegular px-3 self-center rounded-xl`}/>
              {error5 && (<Text className="text-red-600 font-rRegular mb-1 -mt-2 self-start">{error5 }</Text>)}
                <CustomButton
                title="SIGN UP"
                containerStyle="w-[50%] bg-white self-end"
                textStyles="text-primary"
                icon="arrowright"
                color="#4169e1"
                handlePress={handleSignUp}
                />
            </ScrollView>

            </Animated.View>
    
            <Animated.View entering={FadeInDown.delay(200).duration(1000).easing(Easing.ease)} className="flex-row items-center justify-center gap-x-1">
              <Text className="text-lg font-rMedium text-white">Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/loginScreen")}><Text className="text-lg font-rMedium text-bgButton underline">Login</Text></TouchableOpacity>
            </Animated.View>
         
        </View>
  )
}