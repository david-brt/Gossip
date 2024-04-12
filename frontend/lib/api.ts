import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function save(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    throw e;
  }
}
async function store(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    throw e;
  }
}

export async function createUser(phoneNumber: string) {
  const route = `${process.env.EXPO_PUBLIC_DATA_ROUTE}/signup`;
  try {
    const res = await axios.post(route, { number: phoneNumber });
    save("token", res.data.session);
    store("phone-number", phoneNumber);
  } catch (e) {
    throw e;
  }
}
