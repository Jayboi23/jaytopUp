import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
import Animated, { Easing, SlideInDown, SlideOutDown } from 'react-native-reanimated';

export default function CustomModal({ modalType, closeModal, network_id, network, phone, amount, planAmount, plan_id, planType, planSize, planValidity, id }) {

    const handleBuyAirtimeToPinScreen = () =>{
        router.push({pathname: "/pinScreen", params:{network_id: network_id, amount: amount, phone: phone, id: id} })
        closeModal()
    }

    const handleBuyDataToPinScreen = () =>{
      router.push({pathname: "/pinScreen", params:{network_id: network_id, plan_id: plan_id, phone: phone, id: id} })
      closeModal()
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      className="absolute left-0 top-0 bg-black right-0 bottom-0"
    >
      {modalType === "buyAirtime" ? (
        <View className=" bg-black/50 flex-1">
          
        

          <Animated.View entering={SlideInDown.duration(800)} exiting={SlideOutDown.duration(800)} className="bg-white w-full h-[50%] bottom-0 rounded-r-3xl rounded-l-3xl p-5 absolute">
          <View className="bg-white -mt-10 w-20 h-2 self-center rounded-full" />

            <Text className="text-xl font-rBold text-primary  mb-10 mt-14">
              Transaction Details
            </Text>

            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-rMedium text-lg">Mobile Number</Text>
              <Text className="font-rRegular text-placeHolderText text-lg">
                {phone}
              </Text>
            </View>

            <View className="w-full h-[1] bg-bgButton" />

            <View className="flex-row items-center justify-between mt-3 mb-3">
              <Text className="font-rMedium text-lg">Network provider</Text>
              <Text className="font-rRegular text-placeHolderText text-lg">
                {network}
              </Text>
            </View>

            <View className="w-full h-[1] bg-bgButton" />

            <View className="flex-row items-center justify-between mt-3 mb-3">
              <Text className="font-rMedium text-lg">Amount</Text>
              <Text className="font-rRegular text-placeHolderText text-lg">
                ₦{amount}
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
                ₦{amount}
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
                handlePress={handleBuyAirtimeToPinScreen}
              />
            </View>
          </Animated.View>

        </View>
      ) : 
      
      modalType === "buyData" ? (
        
        <View className=" bg-black/50 flex-1">

        <Animated.View entering={SlideInDown.duration(800)} exiting={SlideOutDown.duration(800)} className="bg-white w-full h-[60%] bottom-0 rounded-r-3xl rounded-l-3xl p-5 absolute">
        
        <View className="bg-white w-20 h-2 absolute -mt-5 self-center rounded-full" />

          <Text className="text-xl font-rBold text-primary  mb-5 mt-5">
            Transaction Details
          </Text>

          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-rMedium text-lg">Mobile Number</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
              {phone}
            </Text>
          </View>

          <View className="w-full h-[1] bg-bgButton" />

          <View className="flex-row items-center justify-between mt-3 mb-3">
            <Text className="font-rMedium text-lg">Network provider</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
              {network}
            </Text>
          </View>

          <View className="w-full h-[1] bg-bgButton" />

          <View className="flex-row items-center justify-between mt-3 mb-3">
            <Text className="font-rMedium text-lg">Plan type</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
              {planType}
            </Text>
          </View>

          <View className="w-full h-[1] bg-bgButton" />

          <View className="flex-row items-center justify-between mt-3 mb-3">
            <Text className="font-rMedium text-lg">Plan Size</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
              {planSize}
            </Text>
          </View>

          <View className="w-full h-[1] bg-bgButton" />


          <View className="flex-row items-center justify-between mt-3 mb-3">
            <Text className="font-rMedium text-lg">Plan validity</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
              {planValidity}
            </Text>
          </View>

          <View className="w-full h-[1] bg-bgButton" />

          <View className="flex-row items-center justify-between mt-3 mb-3">
            <Text className="font-rMedium text-lg">Amount</Text>
            <Text className="font-rRegular text-placeHolderText text-lg">
            ₦{planAmount}
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
            ₦{parseInt(planAmount) + parseInt(20)}.00
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
              handlePress={handleBuyDataToPinScreen}
            />
          </View>
        </Animated.View>

        
      </View>
      ) : null}
    </Modal>
  );
}
