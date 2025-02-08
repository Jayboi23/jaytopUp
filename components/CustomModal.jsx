import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

export default function CustomModal({ modalType, closeModal }) {

    const handleGotoPinScreen = () =>{
        router.push("/pinScreen")
        closeModal()
    }
  return (
    <Modal
      transparent={true}
      animationType="fade"
      className="absolute left-0 top-0 right-0 bottom-0"
    >
      {modalType === "buyAirtime" ? (
        <View className=" bg-black/50 flex-1">
          <View className="bg-white w-20 h-2 absolute mt-[470] self-center rounded-full" />
          <View className="bg-white w-full h-[45%] bottom-0 rounded-r-3xl rounded-l-3xl p-5 absolute">
            <Text className="text-xl font-rBold text-primary  mb-5 mt-3">
              Transaction Details
            </Text>

            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-rMedium text-lg">Mobile Number</Text>
              <Text className="font-rRegular text-placeHolderText text-lg">
                08156136183
              </Text>
            </View>

            <View className="w-full h-[1] bg-bgButton" />

            <View className="flex-row items-center justify-between mt-3 mb-3">
              <Text className="font-rMedium text-lg">Network provider</Text>
              <Text className="font-rRegular text-placeHolderText text-lg">
                GLO
              </Text>
            </View>

            <View className="w-full h-[1] bg-bgButton" />

            <View className="flex-row items-center justify-between mt-3 mb-3">
              <Text className="font-rMedium text-lg">Amount</Text>
              <Text className="font-rRegular text-placeHolderText text-lg">
                ₦500
              </Text>
            </View>

            <View className="w-full h-[1] bg-bgButton" />

            <View className="flex-row items-center justify-between mt-3 mb-3">
              <Text className="font-rMedium text-lg">Transaction fee</Text>
              <Text className="font-rRegular text-placeHolderText text-lg">
                ₦0.00
              </Text>
            </View>

            <View className="w-full h-[1] bg-bgButton" />

            <View className="flex-row items-center justify-between mt-3 mb-10">
              <Text className="font-rMedium text-lg">Amount to pay</Text>
              <Text className="font-rRegular text-placeHolderText text-lg">
                ₦500.00
              </Text>
            </View>

            <View className="flex-row justify-around">
              <CustomButton
                title="Cancel"
                textStyles="text-white"
                containerStyle="bg-gray-500 w-[47%]"
                handlePress={closeModal}
              />

              <CustomButton
                title="Confirm"
                textStyles="text-white"
                containerStyle="bg-primary w-[47%]"
                handlePress={handleGotoPinScreen}
              />
            </View>
          </View>
        </View>
      ) : 
      
      modalType === "buyData" ? (
        
        <View className=" bg-black/50 flex-1">
        <View className="bg-white w-20 h-2 absolute mt-[420] self-center rounded-full" />
        <View className="bg-white w-full h-[50%] bottom-0 rounded-r-3xl rounded-l-3xl p-5 absolute">
          <Text className="text-xl font-rBold text-primary  mb-5 mt-3">
            Transaction Details
          </Text>

          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-rMedium text-lg">Mobile Number</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
              08156136183
            </Text>
          </View>

          <View className="w-full h-[1] bg-bgButton" />

          <View className="flex-row items-center justify-between mt-3 mb-3">
            <Text className="font-rMedium text-lg">Network provider</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
              GLO
            </Text>
          </View>

          <View className="w-full h-[1] bg-bgButton" />

          <View className="flex-row items-center justify-between mt-3 mb-3">
            <Text className="font-rMedium text-lg">Data plan</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
              5GB
            </Text>
          </View>

          <View className="w-full h-[1] bg-bgButton" />

          <View className="flex-row items-center justify-between mt-3 mb-3">
            <Text className="font-rMedium text-lg">Amount</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
              ₦500
            </Text>
          </View>

          <View className="w-full h-[1] bg-bgButton" />

          <View className="flex-row items-center justify-between mt-3 mb-3">
            <Text className="font-rMedium text-lg">Transaction fee</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
              ₦20.00
            </Text>
          </View>

          <View className="w-full h-[1] bg-bgButton" />

          <View className="flex-row items-center justify-between mt-3 mb-10">
            <Text className="font-rMedium text-lg">Amount to pay</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
              ₦520.00
            </Text>
          </View>

          <View className="flex-row justify-around">
            <CustomButton
              title="Cancel"
              textStyles="text-white"
              containerStyle="bg-gray-500 w-[47%]"
              handlePress={closeModal}
            />

            <CustomButton
              title="Confirm"
              textStyles="text-white"
              containerStyle="bg-primary w-[47%]"
            />
          </View>
        </View>
      </View>
      ) : null}
    </Modal>
  );
}
