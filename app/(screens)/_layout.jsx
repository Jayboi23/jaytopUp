import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false}} />
      <Stack.Screen
        name="buyAirtimeScreen"
        options={{
          headerBackTitle: "Back",
          headerTitle: "Buy Airtime",
          headerStyle: {
            backgroundColor: "#4169e1",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="buyDataScreen"
        options={{
          headerBackTitle: "Back",
          headerTitle: "Buy Data",
          headerStyle: {
            backgroundColor: "#4169e1",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="fundingScreen"
        options={{
          headerBackTitle: "Back",
          headerTitle: "Fund Wallet",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#4169e1",
          },
        }}
      />
      <Stack.Screen
        name="historyScreen"
        options={{
          headerTitle: "Transaction History",
          headerStyle: {
            backgroundColor: "#4169e1",
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="pinScreen"
        options={{
          headerTitle: "Verify Pin",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: "#4169e1",
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen name="successScreen" options={{headerShown: false}}/>
    </Stack>
  );
}
