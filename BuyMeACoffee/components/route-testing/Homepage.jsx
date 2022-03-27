import { Text, Button } from "react-native";

export default function TestScreen({ navigation }) {
  return (
    <Button
      title="buy me a coffee"
      onPress={() => {
        navigation.navigate("Where", { example: "here" });
      }}
    />
  );
}
