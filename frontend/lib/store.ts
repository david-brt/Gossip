import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * store item in SecureStore
 */
export async function storeSecure(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    throw e;
  }
}

/**
 * store item AsyncStorage
 */
export async function store(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    throw e;
  }
}
