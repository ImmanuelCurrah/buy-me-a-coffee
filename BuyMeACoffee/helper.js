import { API_URL } from "./Config";
import { Alert } from "react-native-web";
import axios from "axios";

export const fetchPublishableKey = async () => {
  try {
    const response = await axios.get(`${API_URL}/public-keys`);
    const publishableKey = await response.data.key;
    return publishableKey;
  } catch (e) {
    console.log(e);
    console.warn("Unable to fetch publishable key. Is your server running?");
    Alert.alert(
      "Error",
      "Unable to fetch publishable key. Is your server running?"
    );
  }
};
