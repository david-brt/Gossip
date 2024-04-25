import axios from "axios";
import { store, storeSecure } from "./store";

export async function createUser(phoneNumber: string) {
  const route = `${process.env.EXPO_PUBLIC_DATA_ROUTE}/signup`;
  try {
    const res = await axios.post(route, { number: phoneNumber });
    storeSecure("token", res.data.session);
    store("phone-number", phoneNumber);
  } catch (e) {
    throw e;
  }
}
