import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { useState, useEffect } from "react";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { fetchPublishableKey } from "./helper";
import { API_URL } from "./Config";

export default function App() {
  const [publishableKey, setPublishableKey] = useState("");
  const [amount, setAmount] = useState(0);
  const [purchasableItemsCost, setPurchasableItemsCost] = useState({
    item: "giving a coffee",
    amount: `${amount}`,
  });
  const [name, setName] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePayPress = async () => {
    const response = await fetch(`${API_URL}create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentMethodType: "card",
        currency: "usd",
        items: purchasableItemsCost,
      }),
    });
    const { clientSecret } = await response.json();
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: "Card",
      billingDetails: { name },
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else if (paymentIntent) {
      Alert.alert("Success", `Payment Successful: ${paymentIntent.id}`);
    }
  };

  useEffect(() => {
    const init = async () => {
      const publishableKey = await fetchPublishableKey();
      if (publishableKey) {
        setPublishableKey(publishableKey);
      }
    };
    init();
  }, []);

  return (
    <StripeProvider publishableKey={publishableKey}>
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          placeholder="Name"
          keyboardType="name-phone-pad"
          onChange={(value) => setName(value.nativeEvent.text)}
          style={styles.input}
        />
        <TextInput
          keyboardType="numeric"
          autoCapitalize="none"
          placeholder="Amount"
          onChange={(value) => {
            if (!isNaN(value.nativeEvent.text)) {
            } else {
              Alert.alert("Must be a number");
            }
          }}
          style={styles.input}
        />
        <CardField
          postalCodeEnabled={false}
          // onCardChange={(cardDetails) => {
          //   console.log(cardDetails);
          // }}
          cardStyle={{
            borderColor: "#000000",
            borderWidth: 1,
            borderRadius: 8,
          }}
          style={styles.cardField}
        />
        <Button title="Pay" onPress={handlePayPress} disabled={loading} />
        <StatusBar style="auto" />
      </View>
    </StripeProvider>
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
