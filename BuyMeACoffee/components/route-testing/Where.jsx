import { Text } from "react-native";

export default function Where({ navigation, route }) {
  return <Text>This is {route.params.example}</Text>;
}
