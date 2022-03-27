import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { useState, useEffect } from "react";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { fetchPublishableKey } from "./helper";
import { API_URL } from "./Config";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./components/route-testing/Homepage";
import Where from "./components/route-testing/Where";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Test"
          component={Homepage}
          options={{ title: "Homepage" }}
        />
        <Stack.Screen name="Where" component={Where} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 50,
  },
  cardField: {
    width: "80%",
    height: 50,
    marginVertical: 30,
  },
});
