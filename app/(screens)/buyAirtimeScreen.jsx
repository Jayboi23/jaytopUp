import { View, Text, TextInput, Pressable, Keyboard, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import Button from "../../components/CustomButton";
import CustomModal from "../../components/CustomModal";
import { fetchNetworkList } from "../../APIs/networkList";
import Entypo from '@expo/vector-icons/Entypo';
import { Marquee } from '@animatereactnative/marquee';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const GLO_PREFIX = ["0805", "0807", "0705", "0811", "0815", "0905", "0915"]
const MTN_PREFIX = ["0803", "0703", "0903", "0806", "0706", "0813", "0810", "0814", "0816", "0903", "0906", "0913"]
const AIRTEL_PREFIX = ["0802", "0808", "0708", "0701", "0812", "0901", "0902", "0904", "0907", "0912" ]
const ETISALAT_PREFIX = ["0809", "0817", "0818", "0908", "0909" ]

export default function buyAirtimeScreen() {
  const [selected, setSelected] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [networkLists, setNetworkLists] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [error1, setError1] = useState("")
  const [error2, setError2] = useState("")
  const [error3, setError3] = useState("")
   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNetworks = async () => {
      setIsLoading(true)
      const networks = await fetchNetworkList();
      const networksfiltered = networks.filter(
        (item) => item.value !== "SMILE"
      );
      setNetworkLists(networksfiltered);
      setIsLoading(false)
    };
      fetchNetworks();
  }, []);

  const getNetworkID = selected ? networkLists.filter((item) => item.value === selected) : null

  const network_id = getNetworkID ? getNetworkID[0].key : null

  const handleErrorTimeOut = () =>{
    setTimeout(()=>{
      setError1("")
      setError2("")
      setError3("")
    },3000)
  }

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  const prefixCheck = () => {
    const prefix = phone.slice(0,4)
    if (selected === "GLO") {
      if (GLO_PREFIX.includes(prefix)){
        setError3("")
      }else {
        setError3("Not a GLO number")
        handleErrorTimeOut()
        return;
      }
     
    } else if (selected === "MTN") {
    if (MTN_PREFIX.includes(prefix)){
      setError3("")
    }else {
      setError3("Not a MTN number")
      handleErrorTimeOut()
      return;
    }
  }else if (selected === "AIRTEL") {
    if (AIRTEL_PREFIX.includes(prefix)){
      setError3("")
    }else {
      setError3("Not a AIRTEL number")
      handleErrorTimeOut()
      return;
    }
  }else if (selected === "9MOBILE") {
    if (ETISALAT_PREFIX.includes(prefix)){
      setError3("")
    }else {
      setError3("Not a 9MOBILE number");
      handleErrorTimeOut();
      return;
    }
  }
  handleOpenModal()
}


  const handleFieldsCheck = () =>{
    if (!selected){
      setError1("Please choose a network")
      handleErrorTimeOut()
      return;
    } else if (!amount) {
      setError2("Amount field cannot be empty");
      handleErrorTimeOut()
      return;
    }else if (amount < 50) {
      setError2("Minimum airtime purchase is ₦50")
      handleErrorTimeOut()
      return;
    }else if (amount.startsWith(0)){
      setError2("Wrong input")
      handleErrorTimeOut()
      return;
    }else if (!phone) {
      setError3("Enter the reciepient number ")
      handleErrorTimeOut()
      return;
    }else if (phone.length !== 11){
      setError3("Please enter a valid phone number");
      handleErrorTimeOut();
      return;
    }
    prefixCheck();
  }


  const handleSubmit = async () =>{
    handleFieldsCheck()
  }

  if (isLoading){
      return <View className="flex-1 justify-center items-center bg-white"><ActivityIndicator size="small"/></View>
    }

  return (
    <GestureHandlerRootView>
<Pressable onPress={Keyboard.dismiss} className="px-3 bg-white flex-1">
      
      {/* Annoucement section */}
      <View className="mt-5 flex-row gap-x-2 border border-bgButton p-3 items-center rounded-xl">
        <Entypo name="info-with-circle" size={24} color="#dbdbfe" />
        <Marquee  style={{width: "90%", overflow: "hidden"}} spacing={50} speed={1} withGesture={false} ><Text className="font-rMedium text-base">MTN network is currently down!!!</Text></Marquee>
      
      </View>

      {/* Form body */}
      <View className="mt-5 mb-3">
        <SelectList
          setSelected={(val) => setSelected(val)}
          placeholder="Choose Network"
          fontFamily="Rubik"
          data={networkLists}
          save="value"
          boxStyles={{borderColor: error1 ? "red" : "black" }}
        />
        {error1 && (<Text className="mt-2 text-red-500 text-base font-rRegular">{error1}</Text>)}
      </View>

      <TextInput
        placeholder="Airtime amount"
        keyboardType="numeric"
        placeholderTextColor="lightgray"
        onChangeText={(text) => setAmount(text)}
        className={`bg-transparent border ${error2 ? "border-red-500" : " border-black/50"} w-full h-14 px-3 rounded-xl mb-3`}
      />
      {error2 && <Text className="text-red-500 text-base font-rRegular  mb-2">{error2}</Text>}

      <TextInput
        placeholder="Reciepient's Phone Number"
        keyboardType="numeric"
        placeholderTextColor="lightgray"
        onChangeText={(text) => setPhone(text)}
        className={`bg-transparent border ${error3 ? "border-red-500" : " border-black/50"} w-full h-14 px-3 rounded-xl mb-3`}
      />
        {error3 && <Text className="text-red-500 text-base font-rRegular mb-2">{error3}</Text>}

      <Button
        title="Buy"
        containerStyle="bg-primary self-center w-full h-14"
        textStyles="text-white"
        handlePress={handleSubmit}
      />

      <View className="absolute self-center items-center top-[90%]">
        <Text className="font-rBold text-xl text-primary">JayTopUp</Text>
        <Text className="font-rMedium text-base text-gray-500">1.0.0</Text>
      </View>

      {openModal && (
        <CustomModal modalType="buyAirtime" closeModal={handleCloseModal} network_id={network_id} network={selected} phone={phone} amount={amount}/>
      )}
    </Pressable>
    </GestureHandlerRootView>
    
  );
}
