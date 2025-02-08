import { View, Text,TextInput } from 'react-native'
import React,{useState} from 'react'
import { SelectList } from "react-native-dropdown-select-list";
import Button from "../../components/CustomButton"
import CustomModal from "../../components/CustomModal";

const data = [
  { key: "1", value: "MTN" },
  { key: "2", value: "GLO" },
  { key: "3", value: "AIRTEL" },
  { key: "4", value: "9MOBILE" },
];

export default function buyDataScreen() {
  const [selected, setSelected] = useState("");
    const [openModal, setOpenModal] = useState(false);
  
    const handleOpenModal =  () =>{
      setOpenModal(!openModal)
    } 
  
    const handleCloseModal =  () =>{
      setOpenModal(!openModal)
    } 


  return (
    <View className="px-3 bg-white flex-1">
    
    <View className="mt-5 mb-2">
      <SelectList
        setSelected={(val) => setSelected(val)}
        placeholder="Choose Network"
        fontFamily="Rubik"
        data={data}
        save="value"
      />
    </View>

    <View className="mb-5">
      <SelectList
        setSelected={(val) => setSelected(val)}
        placeholder="Data Plan"
        fontFamily="Rubik"
        data={data}
        save="value"
      />
    </View>

    <TextInput placeholder="Reciepient's Phone Number" placeholderTextColor="lightgray" className="bg-transparent border border-black/50 w-full h-14 px-3 rounded-xl mb-5"/>

    <TextInput placeholder="Amount to pay" placeholderTextColor="lightgray" className="bg-transparent border border-black/50 w-full h-14 px-3 rounded-xl mb-5"/>

    <Button
    title="Buy"
    containerStyle="bg-primary w-full self-center h-14"
    textStyles="text-white"
    handlePress={handleOpenModal}
    />

    <View className="self-center items-center justify-center bottom-12 absolute">
      <Text className="font-rBold text-xl text-primary">JayTopUp</Text>
      <Text className="font-rMedium text-base text-gray-500">1.0.0</Text>
    </View>

    {openModal && (<CustomModal
          modalType="buyData"
          closeModal={handleCloseModal}
          />)}

  </View>
  )
}