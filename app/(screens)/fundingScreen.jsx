import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import React, {useRef, useState, useEffect} from "react";
import Button from "../../components/CustomButton";
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { router, useLocalSearchParams } from "expo-router";
import { updateBalane } from "../../APIs/updateBalance";
import { getCurrentUser } from "../../APIs/getCurrrentUser";

export default function fundingScreen() {
  const { id, displayName } = useLocalSearchParams()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)
  const [error3, setError3] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [ref, setRef] = useState({})
  const [type, setType] = useState("credit")
  const [response, setResponse] = useState([])

  const paystackWebViewRef = useRef(paystackProps.PayStackRef); 

  let newRef = ""

  const handleUpdateBalance = async (newRef) =>{
    const ref =  newRef;
    try{
      const response = await updateBalane(id, amount, type, ref )
      setResponse(response.transactions)
    }catch(error){
      Alert.alert(error.message)
    }
}

  const errorTimeOut = () =>{
    setTimeout(()=>{
      setError1(false)
      setError2(false)
    },3000)
  }

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

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    const isValid = emailRegex.test(input);
    setIsValidEmail(isValid);
  };

  const handleInputChange = (text) => {
    // Remove non-numeric characters using regex
    const numericText = text.replace(/[^0-9]/g, '');
    setAmount(numericText);
  };

  const handlePayment = () => {
    if (!email){
      setError1("Email field empty")
      errorTimeOut();
      return;
    }else if (!amount) {
      setError2(("Amount field empty"))
      errorTimeOut();
      return;
    }
    paystackWebViewRef.current?.startTransaction();
  };

  const sortedResponse = response.sort((a,b)  => 
    new Date(b.date) - new Date(a.date)
  ).filter((item) => item.type !== "debit").slice(0,3)

  return (
    <View className="flex-1 bg-white px-3">
       <Paystack
        paystackKey="pk_test_35643d0289fe5761c9451a877eedda572764b379"
        billingName={displayName}
        billingEmail={email}
        amount={amount}
        channels={["bank", "bank_transfer", "ussd", "card", "mobile_money"]}
        onCancel={(e) => {
          // handle response here
          console.log(e)
        }}
        onSuccess={(res) => {
          // handle response here
          newRef = res.transactionRef.reference
          handleUpdateBalance(newRef)
        }}
        ref={paystackWebViewRef}
      />

      <View className="bg-primary w-full shadow shadow-black/30 h-[40%] mt-5 items-center rounded-xl mb-10">
        <Text className="font-rMedium text-white text-xl mt-5 mb-5">
          Secure payment with paystack{" "}
        </Text>

        <TextInput
          value={displayName}
          editable={false}
          className="w-[95%] bg-transparent border border-bgButton h-14 font-rRegular text-lg text-white px-3 rounded-xl mb-3"
        />

        <TextInput
          placeholder="example@gmail.com"
          className={`w-[95%] bg-transparent ${error1 ? 'border border-red-500' :  'border border-bgButton'}  h-14 font-rRegular text-lg text-white px-3 rounded-xl mb-3`}
          onChangeText={(text) => {setEmail(text); validateEmail(text)}}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {error1 && (<Text className="text-red-500 font-rRegular mb-1 -mt-2 self-start mx-3">{error1 }</Text>)}
        {email.length > 0 && !isValidEmail && (
        <Text className={`text-red-500 font-rRegular mb-1 -mt-2 self-start mx-3`}>
           Invalid email
        </Text>
      )}

        <TextInput
          placeholder="Amount"
          className={`w-[95%] bg-transparent border ${error2 ? 'border border-red-500 mb-2' :  'border border-bgButton mb-9'} h-14 font-rRegular text-lg text-white px-3 rounded-xl `}
          onChangeText={handleInputChange}
          keyboardType="numeric"
        />
        {error2 && (<Text className="text-red-500 mb-5 -mt-1 self-start mx-3">{error2}</Text>)}

        <Button 
        title="Pay Now" 
        containerStyle="bg-white w-[95%]"
        textStyles="text-primary"
        handlePress={handlePayment}
        />
      </View>

      <Text className="font-rRegular text-xl mb-3">Latest Transactions</Text>

      <View>
       
        <ScrollView alwaysBounceVertical={false} className="">
        
            {sortedResponse.length > 0 ? sortedResponse.map((item) => (
              <View key={item.reference} className="w-full p-3 bg-bgButton/40 mb-3 gap-y-2 rounded-lg">
                <View className="flex-row justify-between">
                  <Text className="font-rMedium text-base">{item.reference}</Text>
                  <Text className="font-rMedium text-base text-green-700">{item.amount}</Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="font-rRegular text-base">{item.description}</Text>
                  <Text className="font-rRegular text-base">{new Date(item.date).toLocaleString()}</Text>
                </View>
              </View>
            )): 
            <View className="bg-bgButton/40 items-center justify-center h-20  mb-2 p-3 gap-y-2 rounded-lg">
                    <Text className="font-rMedium text-base">Your transactions will appear here</Text>
                </View>}
      
        </ScrollView>
      </View>
    </View>
  );
}
