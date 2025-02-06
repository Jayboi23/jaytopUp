import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import Button from "../../components/CustomButton"

const data = [
  { key: "1", value: "MTN" },
  { key: "2", value: "GLO" },
  { key: "3", value: "AIRTEL" },
  { key: "4", value: "9MOBILE" },
];

export default function buyAirtimeScreen() {
  const [selected, setSelected] = useState("");
  return (
    <View className="px-3 bg-white flex-1">
      <View className="mt-5 mb-5">
        <SelectList
          setSelected={(val) => setSelected(val)}
          placeholder="Choose Network"
          fontFamily="Rubik"
          data={data}
          save="value"
        />
      </View>

      <TextInput placeholder="Airtime amount" placeholderTextColor="lightgray" className="bg-transparent border border-black/50 w-full h-14 px-3 rounded-xl mb-5"/>

      <TextInput placeholder="Reciepient's Phone Number" placeholderTextColor="lightgray" className="bg-transparent border border-black/50 w-full h-14 px-3 rounded-xl mb-5"/>

      <Button
      title="Buy"
      containerStyle="bg-primary self-center h-14"
      textStyles="text-white"
      />

      <View className="items-center justify-center top-[58%]">
        <Text className="font-rBold text-xl text-primary">JayTopUp</Text>
        <Text className="font-rMedium text-base text-gray-500">1.0.0</Text>
      </View>

    </View>
  );
}
