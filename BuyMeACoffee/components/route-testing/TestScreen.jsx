import { Text, Button } from "react-native";

export default function TestScreen({ navigation }) {
  return (
    <Button
      title="test out this navigation yo"
      onPress={() => {
        navigation.navigate("Where", { example: "here" });
      }}
    />
  );
}
