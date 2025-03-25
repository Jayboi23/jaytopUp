import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import images from '../../constants/images'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
import Animated, { FadeIn, FadeInUp, FadeOut, Easing, FadeInDown } from 'react-native-reanimated';
import { signIn } from '../../APIs/signIn'


export default function loginScreen() {
   const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
      const [isValidEmail, setIsValidEmail] = useState(false);
      const [error1, setError1] = useState(false);
      const [error2, setError2] = useState(false);
       const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (input) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
      const isValid = emailRegex.test(input);
      setIsValidEmail(isValid);
    };

    const handleErrorTimeout = () => {
          setTimeout(()=>{
            setError1(false)
            setError2(false)
          }, 3000)
    }

    const handleFieldCheck = () =>{
      if (!email){
        setError1("Enter your Email")
        handleErrorTimeout()
        return
      }else if (!password){
        setError2("Password field cannot be empty")
        handleErrorTimeout()
        return
      }
      handleSignIn()
    }

    const handleSignIn  = async ()=>  {
      try{
        setIsLoading(true)
        const response= await signIn(email, password)
        Alert.alert(response.message)
        setIsLoading(false)
        router.push({pathname: '/home',  params: { id: response.user._id }})
      }catch(error){
        Alert.alert(error.message)
        setIsLoading(false)
      }
    }

      if (isLoading){
          return <View className="flex-1 justify-center items-center bg-white"><ActivityIndicator size="small"/></View>
        }

  return (
    <View className="bg-primary flex-1">
      
      <View className="bottom-64 left-14">
      <Image source={images.Circle}/>
      </View>

      <Animated.Text entering={FadeInUp.delay(200).duration(1000).easing(Easing.ease)} className="-mt-60 font-rBold text-4xl mx-3 text-white mb-2">Login</Animated.Text>
      <Animated.Text entering={FadeInUp.delay(300).duration(1000).easing(Easing.ease)} className="font-rRegular text-lg mx-3 mb-10 text-bgButton">Please fill your details to continue</Animated.Text>

        {/* form */}
        <Animated.View entering={FadeInUp.delay(400).duration(1000).easing(Easing.ease)} className="items-start justify-center w-full px-3 mb-64" >
             <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets className="w-full">
          <TextInput placeholder='Email' keyboardType='email-address' autoCapitalize='none' onChangeText={(text) => {setEmail(text), validateEmail(text)}} placeholderTextColor="#dbdbfe" className="bg-transparent border border-bgButton w-full h-14 text-lg font-rRegular text-white px-3 self-center rounded-xl mb-3"/>
             {error1 && (<Text className="text-red-600 font-rRegular mb-1 -mt-2 self-start">{error1 }</Text>)}
                                    {email.length > 0 && !isValidEmail && (
                                    <Text className={`text-red-600 font-rRegular mb-1 -mt-2 self-start`}>
                                       Invalid email
                                    </Text>
                                  )}

          <TextInput placeholder='Password' onChangeText={(text) => setPassword(text)} secureTextEntry placeholderTextColor="#dbdbfe" className="bg-transparent border border-bgButton w-full h-14 text-lg font-rRegular px-3 text-white self-center rounded-xl mb-3"/>
          {error2 && (<Text className="text-red-600 font-rRegular mb-1 -mt-2 self-start">{error2 }</Text>)}
          <TouchableOpacity  className="mb-2">
            <Text className="text-base text-white font-rRegular">Forgotten Password?</Text>
            </TouchableOpacity>
         
           
            <CustomButton
            title="LOGIN"
            containerStyle="w-[50%] bg-white self-end"
            textStyles="text-primary"
            icon="arrowright"
            color="#4169e1"
            handlePress={handleFieldCheck}
            />

            
</ScrollView>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(1000).easing(Easing.ease)} className="flex-row items-center justify-center gap-x-1">
          <Text className="text-lg font-rMedium text-white">Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/registerScreen")}><Text className="text-lg font-rMedium text-bgButton underline">Sign up</Text></TouchableOpacity>
        </Animated.View>
     
    </View>
  )
}