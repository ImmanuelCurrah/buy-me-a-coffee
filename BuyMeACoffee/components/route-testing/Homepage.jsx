import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function Homepage({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assests/pictures/cat.png")}
        />
        <Text style={styles.text}>
          Hi my name is Immanuel, a growing software developer.
        </Text>
        <Text style={styles.text}>
          This is a small project I created to learn Stripe implementation. It's
          super simple! If you want to support me then just click the button
          below to try out the payment option.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Where", { example: "here" });
          }}
        >
          <Text>Buy me a Coffee</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7b68ee",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    flex: 1,
    width: 250,
    margin: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  text: {
    textAlign: "center",
    margin: 20,
    fontSize: 15,
    color: "white",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
    borderRadius: 12,
  },
});
