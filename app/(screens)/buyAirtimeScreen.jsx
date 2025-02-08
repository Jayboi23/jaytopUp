import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import Button from "../../components/CustomButton";
import CustomModal from "../../components/CustomModal";
import { fetchNetworkList } from "../../APIs/networkList";
import { postBuyAirtime } from "../../APIs/buyAirtime";

export default function buyAirtimeScreen() {
  const [selected, setSelected] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [networkLists, setNetworkLists] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("")

  useEffect(() => {
    const fetchNetworks = async () => {
      const networks = await fetchNetworkList();
      const networksfiltered = networks.filter(
        (item) => item.value !== "SMILE"
      );
      setNetworkLists(networksfiltered);
    };
      fetchNetworks();
  }, []);

  const getNetworkID = selected ? networkLists.filter((item) => item.value === selected) : null

  const network_id = getNetworkID ? getNetworkID[0].key : null


  const handleSubmit = async () =>{
    postBuyAirtime(network_id, amount, phone)
  }

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <View className="px-3 bg-white flex-1">
      <View className="mt-5 mb-5">
        <SelectList
          setSelected={(val) => setSelected(val)}
          placeholder="Choose Network"
          fontFamily="Rubik"
          data={networkLists}
          save="value"
        />
      </View>

      <TextInput
        placeholder="Airtime amount"
        keyboardType="numeric"
        placeholderTextColor="lightgray"
        onChangeText={(text) => setAmount(text)}
        className="bg-transparent border border-black/50 w-full h-14 px-3 rounded-xl mb-5"
      />

      <TextInput
        placeholder="Reciepient's Phone Number"
        keyboardType="numeric"
        placeholderTextColor="lightgray"
        onChangeText={(text) => setPhone(text)}
        className="bg-transparent border border-black/50 w-full h-14 px-3 rounded-xl mb-5"
      />

      <Button
        title="Buy"
        containerStyle="bg-primary self-center w-full h-14"
        textStyles="text-white"
        handlePress={handleSubmit}
      />

      <View className="items-center justify-center top-[58%]">
        <Text className="font-rBold text-xl text-primary">JayTopUp</Text>
        <Text className="font-rMedium text-base text-gray-500">1.0.0</Text>
      </View>

      {openModal && (
        <CustomModal modalType="buyAirtime" closeModal={handleCloseModal} />
      )}
    </View>
  );
}
