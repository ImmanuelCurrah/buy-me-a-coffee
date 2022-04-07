import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import CurrencyInput from "react-native-currency-input";
import { useState, useEffect } from "react";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { fetchPublishableKey } from "../../helper";
import { API_URL } from "../../Config";
import isEmail from "validator/lib/isEmail";

export default function PaymentPage({ navigation, route }) {
  const [publishableKey, setPublishableKey] = useState("");
  const [value, setValue] = useState(0.0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState(false);
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePayPress = async () => {
    const response = await fetch(`${API_URL}create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentMethodType: "card",
        currency: "usd",
        items: value,
        receipt_email: email,
        name: name,
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
      Alert.alert("Thank you!", `Your support is very much appreciated`);
      resetInput();
    }
  };

  const resetInput = () => {
    setName("");
    setValue(0.0);
    setEmail("");
    setToggle(false);
  };

  useEffect(() => {
    const init = async () => {
      const publishableKey = await fetchPublishableKey();
      if (publishableKey) {
        setPublishableKey(publishableKey);
      } else {
        console.log("did not get publishable key");
        Alert.alert("did not get the key, access to the API will be denied");
      }
    };
    init();
  }, []);

  return (
    <StripeProvider publishableKey={publishableKey}>
      <View style={styles.container}>
        <Text style={styles.text}>Powered by Stripe!</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Name"
          keyboardType="name-phone-pad"
          value={name}
          onChange={(value) => setName(value.nativeEvent.text)}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="email"
          keyboardType="email-address"
          value={email}
          onChange={(value) => {
            setEmail(value.nativeEvent.text);
            if (isEmail(email)) {
              setToggle(true);
            } else {
              setToggle(false);
            }
          }}
          style={styles.input}
        />
        <CurrencyInput
          value={value}
          onChangeValue={setValue}
          prefix="$"
          delimiter=","
          separator="."
          precision={2}
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
        {toggle && (
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={() => {
              handlePayPress();
              // resetInput();
            }}
          >
            <Text style={styles.text}>Pay</Text>
          </TouchableOpacity>
        )}
        <StatusBar style="auto" />
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7b68ee",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
  cardField: {
    width: "80%",
    height: 50,
    marginVertical: 30,
    backgroundColor: "white",
    borderRadius: 7,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
    borderRadius: 12,
    width: 80,
  },
  text: {
    fontSize: 20,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    aspectRatio: 0.3,
    width: 100,
  },
});
