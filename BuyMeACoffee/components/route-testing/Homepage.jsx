import { Text, Button } from "react-native";

export default function Homepage({ navigation }) {
  return (
    <Button
      title="buy me a coffee"
      onPress={() => {
        navigation.navigate("Where", { example: "here" });
      }}
    />
  );
}
