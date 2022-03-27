import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./components/route-testing/Homepage";
import PaymentPage from "./components/route-testing/PaymentPage";

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
        <Stack.Screen
          name="Where"
          component={PaymentPage}
          options={{ title: "Payment Page" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
